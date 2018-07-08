import React from 'react'
import Calendar from 'react-calendar';

import tree from './data/data'

class InsertTime extends React.Component {

    state = {
        step: 0,
        date: new Date()
    }
    
    componentDidMount() {
        console.log(tree)
    }

    onChange = date => this.setState({ ...this.state, date })

    render() {
        return(
            <React.Fragment>
                <div className="section-calendar">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                </div>
                <div className="section-select">

                </div>
            </React.Fragment>
        )
    }
}

export default InsertTime;