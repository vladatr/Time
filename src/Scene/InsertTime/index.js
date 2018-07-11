import React from 'react'
import Calendar from 'react-calendar';

import {dayList, storeTime} from '../../api'
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
        h: 0,
        m: 0
    }

    dataEntered = (dataEntered, values) => {
        debugger
        console.log(dataEntered, values)
        this.setState({...this.state, dataEntered, values})
    }

    formatDate(date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }
    formatDateMySQL(date) {
        return  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate() 
    }

    onChangeDate = date => {
        dayList("aca", this.formatDateMySQL(date))
            .then( res => {
                debugger
                this.setState({registrations:res.data,  activityType: 0, date }) 
            })  
    }

    onSave = () => {
        //storeTime = (user, date, time, type, values, h, m)
        const {date, h, m, activityType, values} = this.state
        const time=h*60+m*1
        console.log("test", date, time, activityType, values)
    }

    onChangeSelect = event => this.setState({...this.state, activityType: event.target.value, dataEntered: false})

    timeChange = (params) => {
        debugger
        this.setState({...this.state, h: this.refs.h.value, m: this.refs.m.value})
    }

    render() {
        const {date, activityType, registrations, dataEntered, h, m } = this.state
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
                            <tr> <th>Pocetak</th> <th>Kraj</th> <th>Projekat</th> </tr>
                         {registrations.length && 
                                registrations.map( item => <tr><td>{item.begin}</td><td> {item.end} </td><td>{item.project} </td></tr> )}
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
                    {activityType==1 && <SelectProjectTasks dataEntered={this.dataEntered} /> }
                    {activityType==2 && <SelectProjectAdditional dataEntered={this.dataEntered} /> }
                    {activityType==3 && <SelectNonProjectActivities dataEntered={this.dataEntered}  /> }
                    {activityType==4 && <SelectOtherTasks dataEntered={this.dataEntered}  /> }
                    {dataEntered && <div className="time-form">
                                        <span>Vreme </span>
                                        <input ref="h" type="text" value={h} onChange={this.timeChange} /> : 
                                        <input ref="m" type="text" value={m} onChange={this.timeChange} /> 
                                        <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p>
                                    </div>
                    }
                    
                </div>
            </React.Fragment>
        )
    }
}



export default InsertTime;