import React from 'react'
import Calendar from 'react-calendar';

import {dayList, storeTime, getProjects, deleteItem} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'
import SelectProjectAdditional from './components/SelectProjectAdditional'
import SelectOtherTasks from './components/SelectOtherTasks'
import SelectNonProjectActivities from './components/SelectNonProjectActivities'
import {getData} from '../data/data'

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

    deleteItem = (id) => {
        deleteItem(id)
            .then( (res) => {
                if(res=="ok") {
                    this.onChangeDate(this.state.date)
                }
            })
    }

    onChangeDate = date => {
        dayList(this.props.user.username, this.formatDateMySQL(date))
            .then( res => {
                this.setState({...this.state, registrations:res.data,  activityType: 0, date, dataEntered: false }) 
            })  
    }

    onSave = () => {
        //storeTime = (user, date, time, type, values, h, m)
        const {date, h, m, activityType, selectedProject, values} = this.state
        const time=h*60+m*1
        console.log("Sacuvaj vreme za: test", this.formatDateMySQL(date), time, activityType, selectedProject, values)
        storeTime(this.props.user.username, selectedProject, this.formatDateMySQL(date), time, activityType,  values)
            .then( res => {
                if(res == "ok") {
                    this.setState({...this.state, activityType: 0, dataEntered: false, values: [], selectedProject: 0 }, function() {
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
        if(this.props.user.username) getProjects(this.props.user.username).then(res => this.setState({...this.state, projects: res}, function() {
            this.onChangeDate(this.state.date)
        }))

    }

    render() {
        const treeData = JSON.parse(getData())
        const a = ["", "Aktivnosti na predmetu", "Aktivnosti vezane za predmet", "Aktivnosti koje nisu vezane za predmet", "Vreme koje nije vezano za posao"]
        console.log()
        const {date, activityType, registrations, dataEntered, h, m, projects, selectedProject } = this.state
        console.log("registrations", registrations)

        const stil = {paddingLeft: "30px", cursor: "pointer", fontWeight: "bold", color: "red" }
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
                            
                         {registrations.length && 
                                registrations.map( item => <div className="day-item">
                                                   <p> <b>{item.name}</b> / {a[item.tip]} <span onClick={() => this.deleteItem(item.id)} style={stil}>X</span></p>

                                                   <div> {item.value1} {treeData.filter(treeitem => treeitem.id==item.value1)[0] &&
                                                    treeData.filter(treeitem => treeitem.id==item.value1)[0].name } </div>

                                                    <div> {item.value2} {treeData.filter(treeitem => treeitem.id==item.value2)[0] &&
                                                    treeData.filter(treeitem => treeitem.id==item.value2)[0].name } </div>

                                                    <div> {item.value3} {treeData.filter(treeitem => treeitem.id==item.value3)[0] &&
                                                    treeData.filter(treeitem => treeitem.id==item.value3)[0].name } </div>
                                                    
                                                 <div> {item.value4} {treeData.filter(treeitem => treeitem.id==item.value4)[0] &&
                                                                 treeData.filter(treeitem => treeitem.id==item.value4)[0].name } 
                                                     <b> {item.duration} min.</b> </div> 
                                           </div>)
                        }
                        
                    </div>
                </div>

                <div className="select-project right">
                    <div className="naslov">{this.formatDate(date) }  - kako se utrosili vreme na poslu?</div>
                    <select value={activityType} onChange={this.onChangeSelect.bind(this)} >
                        <option value="0">--Izaberite stavku--</option>
                        <option value="1"> Aktivnosti na projektu</option>
                        <option value="2">Aktivnosti vezane za predmet</option>
                        <option value="3">Aktivnosti koje nisu vezane za predmet</option>
                        <option value="4">Vreme koje nije vezano za posao</option>

                    </select>
                    {activityType>0 && activityType<3 && <div> <h5>Izaberi projekat</h5>
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