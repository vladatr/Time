import React from 'react'

import {getSupervisors} from '../../../api/users'
import SupervizorView from './SupervizorView'

class AdminView extends React.Component {
    state = {
        selectedSupervisor: "",
        supervisors: [] 
    }

    onSupervisorChange  = event => {
        this.setState({...this.state, selectedSupervisor: event.target.value})
        console.log(this.state.selectedSupervisor)
    }



    componentDidMount() {
         getSupervisors()
            .then(res => this.setState({...this.state, supervisors: res}))
    }
    render() {

        const {supervisors, selectedSupervisor} = this.state
        return(
            <React.Fragment>
                <h2>Pregled supervizora</h2>
                <div> <h5>Izaberi dosije</h5>
                <select onChange={this.onSupervisorChange} value={selectedSupervisor}>
                <option value="0">--Izaberite stavku--</option>
                {supervisors && supervisors.length &&
                    supervisors.map(user => <option key={"ku" + user.id} value={user.username}>{user.id} - {user.username}</option>)
                }
            </select>
            {selectedSupervisor != "" && <SupervizorView user={{type: "1", username: selectedSupervisor }} />}
        </div>
            </React.Fragment>
        )
    }
}

export default AdminView;