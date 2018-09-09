import React from 'react' 

import {storeProject,  getProjects, getPrograms} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'
import {getData} from '../data/data'

class Projects extends React.Component{

    treeData = JSON.parse(getData())

    state = {
        name: "" ,
        brojKorisnika: 0 ,
        info: "",
        //dataEntered: false,
        values: [],
        programs: [],
        selectedProject: 0,
        projects: []
    }
    
    componentDidMount() {
        getProjects(this.props.user.username).then(res => this.setState({...this.state, projects: res}))
    }
/*
    onProjectChange  = event => this.setState({...this.state, selectedProject: event.target.value})
*/
    onProjectChange  = event => {
        debugger
        this.setState({...this.state, selectedProject: event.target.value, programs: []})
        getPrograms(event.target.value)
            .then( res => {
                this.setState({...this.state, programs: res})
            })
    }
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
                    const that = this
                    setTimeout(function() {that.setState({...this.state, info: ""}) }, 2000)
                })
                .catch( err => this.setState({...this.state, info: err}))
        } else {
            alert("Naziv dosijea treba da ima više od jednog znaka");
        }
    }

    addProgram(id) {
        let programs = [...this.state.programs]
        programs.push({value1: id})
        this.setState({...this.state, programs})
    }

    brojKorisnikaChange = () => {
        this.setState({...this.state, brojKorisnika: this.refs.brojKorisnika.value})
    }

    render() {
        const { selectedProject, projects, programs} = this.state
        return(
            <div className="project-page">
                <h3>Dodaj novi dosije</h3>
                <p>Naziv </p>
                <input type="text" size={30} onChange={this.nameChange} value={this.state.name} /> <br />
                Broj korisnika <input type="text" size={4} onChange={this.brojKorisnikaChange}  value={this.state.brojKorisnika} ref="brojKorisnika" />
                <div className="info">{this.state.info}</div>
                {this.state.info.length==0 && <p><button className="button-save" onClick={this.onSave}>Sačuvaj</button></p> }


                <h3>Programi i postupci</h3>
                <div> <h5>Izaberi dosije</h5>
                                     <select onChange={this.onProjectChange} value={selectedProject}>
                                     <option value="0">--Izaberite stavku--</option>
                                        {projects && projects.length &&
                                            projects.map(project => <option value={project.id}>{project.id} - {project.name}</option>)
                                        }
                                    </select>
                                </div>
                                
                { // selectedProject>0 && programs.length>0 && 
                   // programs.map(p => <p>{p.value1 + " - " + this.treeData.filter(treeitem => treeitem.id==p.value1)[0].name}</p>)
                }
                { selectedProject>0 &&  <SelectProjectTasks selectedProject={selectedProject} user={this.props.user}
                             programs={programs} addProgram={this.addProgram.bind(this)}  /> }

                    
            </div>
        )
    }
}

export default Projects;