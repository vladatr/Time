import React from 'react'
import Calendar from 'react-calendar';


import SelectProjectTasks from './components/SelectProjectTasks'
import SelectProjectAdditional from './components/SelectProjectAdditional'
import SelectOtherTasks from './components/SelectOtherTasks'
import SelectNonProjectActivities from './components/SelectNonProjectActivities'

class InsertTime extends React.Component {

    state = {
        date: new Date(),
        activitieType: 0
    }

    formatDate(date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }

    onChangeDate = date => this.setState({ ...this.state, date })

    onChangeSelect = event => this.setState({...this.state, activitieType: event.target.value})

    render() {
        return(
            <React.Fragment>
                <div className="section-calendar">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>   
                <div className="naslov">{this.formatDate(this.state.date) }  - kako se utrosili vreme na poslu?</div>
                <select value={this.state.activitieType} onChange={this.onChangeSelect.bind(this)} >
                    <option value="0">--Izaberite stavku--</option>
                    <option value="1"> Aktivnosti na predmetu</option>
                    <option value="2">Aktivnosti vezane za predmet</option>
                    <option value="3">Aktivnosti koje nisu vezane za predmet</option>
                    <option value="4">Vreme koje nije vezano za posao</option>

                </select>
                {this.state.activitieType==1 && <SelectProjectTasks /> }
                {this.state.activitieType==2 && <SelectProjectAdditional /> }
                {this.state.activitieType==3 && <SelectOtherTasks /> }
                {this.state.activitieType==4 && <SelectNonProjectActivities /> }
            </React.Fragment>
        )
    }
}



export default InsertTime;