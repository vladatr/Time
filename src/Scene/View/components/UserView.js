import React from 'react'

import { getData, getProjects, getFilteredProjectsForUser} from '../../../api'
import DataTable from './DataTable'


class AdminView extends React.Component {
    state = {
        searchText: "",
        projects: [],
        selectedProject: 0,
        data: [],
        users: [] //per admin
    }

    onProjectChange  = event => {
        debugger
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
        const getP = this.state.searchText == "" ? getProjects : getFilteredProjectsForUser
        getP(this.props.user.username, this.state.searchText)
            .then(res => this.setState({...this.state, projects: res, data: []}) )
    }

    componentDidMount() {
        if(this.props.user.username) getProjects(this.props.user.username)
            .then(res => this.setState({...this.state, projects: res}))

    }
    render() {

        const {projects, selectedProject, searchText} = this.state
        return(
            <React.Fragment>

                <h2>Pretraga dosijea</h2>
               Tekst za pretragu  
               <input type="text" size="20" value={searchText} onChange={this.searchChange} />
               <button onClick={this.doSearch.bind(this)}>
                    {searchText == "" ? "Prikaži sve" : "Filtriraj" }
                </button>
                {projects.length>0 && <p>Broj prikazanij dosijea: {projects.length}</p>}
                <ProjectTable projects={projects} />
                
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

const ProjectTable = ({projects}) => {
    return(
        <table width="500px" border="1">
            <tr><th width="60%">Dosije</th><th width="15%">Broj korisnika</th><th>Vreme</th></tr>
            {projects.length>0 &&
            projects.map((p, i) => <tr key={p.name + i}><td>{p.name}</td><td>{p.brojKorisnika}</td><td>{p.vreme}</td> </tr>)}
        </table>
    )
}

export default AdminView;