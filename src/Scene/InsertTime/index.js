import React from 'react'
import Calendar from 'react-calendar';


import SelectProjectTasks from './components/SelectProjectTasks'

class InsertTime extends React.Component {

    state = {
        date: new Date()
    }

    onChangeDate = date => this.setState({ ...this.state, date })

    render() {
        return(
            <React.Fragment>
                <div className="section-calendar">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>          
                <SelectProjectTasks />
            </React.Fragment>
        )
    }
}

export default InsertTime;