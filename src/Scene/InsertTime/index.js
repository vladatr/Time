import React from 'react'
import Calendar from 'react-calendar';

import {dayList} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'
import SelectProjectAdditional from './components/SelectProjectAdditional'
import SelectOtherTasks from './components/SelectOtherTasks'
import SelectNonProjectActivities from './components/SelectNonProjectActivities'

class InsertTime extends React.Component {

    state = {
        date: new Date(),
        activityType: 0,
        registrations: []
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

    onChangeSelect = event => this.setState({...this.state, activityType: event.target.value})

    componentDidMount() {

    }

    render() {
        const {date, activityType, registrations } = this.state
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
                    {activityType==1 && <SelectProjectTasks /> }
                    {activityType==2 && <SelectProjectAdditional /> }
                    {activityType==3 && <SelectNonProjectActivities /> }
                    {activityType==4 && <SelectOtherTasks /> }

                    
                </div>
            </React.Fragment>
        )
    }
}



export default InsertTime;