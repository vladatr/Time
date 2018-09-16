import React from 'react'

import { getData, getProjectsForAdmin, getFilteredProjects} from '../../api'
import {getUsersCountProjects} from '../../api/users'
import DataTable from './components/DataTable'
import UserDataTable from './components/UserDataTable'

class View extends React.Component {
    state = {
        searchText: "",
        filteredProjectsByName: [],
        projects: [],
        selectedProject: 0,
        data: [],
        users: [] //per admin
    }

    onProjectChange  = event => {
        this.setState({...this.state, selectedProject: event.target.value})
        getData(event.target.value)
            .then( (res) => {
                this.setState({...this.state, data:res});
            })
    }

    
    searchChange = (e) => {
        this.setState({...this.state, searchText: e.target.value})
    }

    doSearch = (e) => {
        getFilteredProjects(this.props.user.username, this.state.searchText)
            .then(res => this.setState({...this.state, filteredProjectsByName: res}) )
    }

    componentDidMount() {
        if(this.props.user.username) getProjectsForAdmin(this.props.user.username)
            .then(res => this.setState({...this.state, projects: res}))
        if(this.props.user.username) getUsersCountProjects(this.props.user.username)
            .then(res => this.setState({...this.state, users: res}) )
    }
    render() {

        const {projects, selectedProject, users, searchText, filteredProjectsByName} = this.state
        return(
            <React.Fragment>
                <h2>Pregled voditelja slučaja</h2>
                {users && <UserDataTable users={users} />}

                <h2>Pretraga dosijea</h2>
               Tekst za pretragu  
               <input type="text" size="20" value={searchText} onChange={this.searchChange} />
               <button onClick={this.doSearch.bind(this)}>Pretraži</button>
               {filteredProjectsByName.length>0 &&
                filteredProjectsByName.map((p, i) => <p key={p.name + i}>{p.user} {p.name} {p.vreme} </p>)}

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