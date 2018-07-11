import React from 'react'
import Calendar from 'react-calendar';

import {dayList, storeTime, getProjects} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'
import SelectProjectAdditional from './components/SelectProjectAdditional'
import SelectOtherTasks from './components/SelectOtherTasks'
import SelectNonProjectActivities from './components/SelectNonProjectActivities'

class InsertTime extends React.Component {

    state = {
        date: new Date(),
        activityType: 0,
        registrations: [],
        dataEntered: false,
        values: [],
        projects: [],
        selectedProject: 0,
        h: 0,
        m: 0
    }

    dataEntered = (dataEntered, values) => {
        this.setState({...this.state, dataEntered, values})
    }

    formatDate(date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }
    formatDateMySQL(date) {
        return  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate() 
    }

    onChangeDate = date => {
        console.log("Get times for " + date)
        dayList("test", this.formatDateMySQL(date))
            .then( res => {
                this.setState({...this.state, registrations:res.data,  activityType: 0, date, dataEntered: false }) 
            })  
    }

    onSave = () => {
        //storeTime = (user, date, time, type, values, h, m)
        const {date, h, m, activityType, selectedProject, values} = this.state
        const time=h*60+m*1
        console.log("Sacuvaj vreme za: test", this.formatDateMySQL(date), time, activityType, selectedProject, values)
        storeTime("test", selectedProject, this.formatDateMySQL(date), time, activityType,  values)
            .then( res => {
                if(res == "ok") {
                    this.setState({...this.state, activityType: 0, dataEntered: false, values: [] }, function() {
                        this.onChangeDate(this.state.date)
                    }) 
                } else {
                    alert("Greska")
                }

            })
    }

    onChangeSelect = event => this.setState({...this.state, activityType: event.target.value, dataEntered: false})

    onProjectChange  = event => this.setState({...this.state, selectedProject: event.target.value})

    timeChange = () => {
        this.setState({...this.state, h: this.refs.h.value, m: this.refs.m.value})
    }

    componentDidMount() {
        debugger
        getProjects("").then(res => this.setState({...this.state, projects: res}, function() {
            this.onChangeDate(this.state.date)
        }))

    }

    render() {
        const {date, activityType, registrations, dataEntered, h, m, projects, selectedProject } = this.state
        console.log("registrations", registrations)
        return(
            <React.Fragment>
                <div className="left">
                    <div className="section-calendar">
                        <Calendar
                            onChange={this.onChangeDate}
                            value={date}
                        />
                    </div>   
                    <div className="section-day-overview">
                        <table width="300px">
                            <tr> <th>Projekat</th> <th>Tip</th> <th>Sifra aktivnosti</th> <th>Trajanje</th></tr>
                         {registrations.length && 
                                registrations.map( item => <tr><td>{item.name}</td><td> {item.tip} </td><td>{item.value4} </td><td>{item.duration} </td></tr> )}
                        </table>
                    </div>
                </div>

                <div className="select-project right">
                    <div className="naslov">{this.formatDate(date) }  - kako se utrosili vreme na poslu?</div>
                    <select value={activityType} onChange={this.onChangeSelect.bind(this)} >
                        <option value="0">--Izaberite stavku--</option>
                        <option value="1"> Aktivnosti na predmetu</option>
                        <option value="2">Aktivnosti vezane za predmet</option>
                        <option value="3">Aktivnosti koje nisu vezane za predmet</option>
                        <option value="4">Vreme koje nije vezano za posao</option>

                    </select>
                    {activityType>0 && <div> <h5>Izaberi projekat</h5>
                                     <select onChange={this.onProjectChange} value={selectedProject}>
                                     <option value="0">--Izaberite stavku--</option>
                                        {projects && projects.length &&
                                            projects.map(project => <option value={project.id}>{project.id} - {project.name}</option>)
                                        }
                                    </select>
                                </div>
                    }
                    {activityType==1 && <SelectProjectTasks dataEntered={this.dataEntered} /> }
                    {activityType==2 && <SelectProjectAdditional dataEntered={this.dataEntered} /> }
                    {activityType==3 && <SelectNonProjectActivities dataEntered={this.dataEntered}  /> }
                    {activityType==4 && <SelectOtherTasks dataEntered={this.dataEntered}  /> }
                    {dataEntered && <div className="time-form">
                                        <span>Vreme </span>
                                        <input ref="h" type="text" value={h} onChange={this.timeChange} size={4} /> : 
                                        <input ref="m" type="text" value={m} onChange={this.timeChange} size={4} /> 
                                        <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p>
                                    </div>
                    }
                    
                </div>
            </React.Fragment>
        )
    }
}



export default InsertTime;