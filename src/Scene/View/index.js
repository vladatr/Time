import React from 'react'

import { getData, getProjects} from '../../api'
import DataTable from './components/DataTable'

class View extends React.Component {
    state = {
        projects: [],
        selectedProject: 0,
        data: []
    }

    onProjectChange  = event => {
        this.setState({...this.state, selectedProject: event.target.value})
        getData(event.target.value)
            .then( (res) => {
                this.setState({...this.state, data:res});
            })
    }

    componentDidMount() {
        if(this.props.user.username) getProjects(this.props.user.username)
            .then(res => this.setState({...this.state, projects: res}))

    }
    render() {
        debugger
        const {projects, selectedProject} = this.state
        return(
            <React.Fragment>
                <h2>Pregled podataka po dosijeu</h2>
                <div> <h5>Izaberi dosije</h5>
                <select onChange={this.onProjectChange} value={selectedProject}>
                <option value="0">--Izaberite stavku--</option>
                {projects && projects.length &&
                    projects.map(project => <option key={"kp" + project.id} value={project.id}>{project.id} - {project.name}</option>)
                }
            </select>
            <DataTable data={this.state.data} />
        </div>
            </React.Fragment>
        )
    }
}

export default View;