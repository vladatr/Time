import React from 'react' 

import {storeProject,  getProjects} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'

class Projects extends React.Component{

    state = {
        name: "" ,
        brojKorisnika: 0 ,
        info: "",
        //dataEntered: false,
        values: [],

        selectedProject: 0,
        projects: []
    }
    
    componentDidMount() {
        getProjects(this.props.user.username).then(res => this.setState({...this.state, projects: res}))
    }

    onProjectChange  = event => this.setState({...this.state, selectedProject: event.target.value})
/*
    dataEntered = (dataEntered, values) => {
        this.setState({...this.state, dataEntered, values})
    }
*/
    nameChange = (event) => {
        this.setState({...this.state, name: event.target.value})
    }

    onSave = () => {
        if(this.state.name.length>1) {
            console.log("Save project " + this.state.name )

            storeProject(this.props.user.username, this.state.name, this.state.brojKorisnika)
                .then( res => {
                    this.setState({...this.state, info: res.data, name:"", brojKorisnika: 0})
                    getProjects(this.props.user.username).then(res => this.setState({...this.state, projects: res}))
                })
                .catch( err => this.setState({...this.state, info: err}))
        } else {
            alert("Naziv dosijea treba da ima više od jednog znaka");
        }
    }

   
    percentChange = () => {
        this.setState({...this.state, preostalo1: this.refs.preostalo1.value, preostalo2: this.refs.preostalo2.value})
    }

    brojKorisnikaChange = () => {
        this.setState({...this.state, brojKorisnika: this.refs.brojKorisnika.value})
    }

    render() {
        const { selectedProject, projects} = this.state
        return(
            <div className="project-page">
                <h3>Dodaj novi dosije</h3>
                <p>Naziv </p>
                <input type="text" size={30} onChange={this.nameChange} value={this.state.name} /> <br />
                Broj korisnika <input type="text" size={4} onChange={this.brojKorisnikaChange}  value={this.state.brojKorisnika} ref="brojKorisnika" />
                <div className="info">{this.state.info}</div>
                {this.state.info.length==0 && <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p> }


                <h3>Programi i postupci</h3>
                <div> <h5>Izaberi dosije</h5>
                                     <select onChange={this.onProjectChange} value={selectedProject}>
                                     <option value="0">--Izaberite stavku--</option>
                                        {projects && projects.length &&
                                            projects.map(project => <option value={project.id}>{project.id} - {project.name}</option>)
                                        }
                                    </select>
                                </div>

                { selectedProject>0 &&  <SelectProjectTasks selectedProject={selectedProject} user={this.props.user} /> }

                    }
            </div>
        )
    }
}

export default Projects;