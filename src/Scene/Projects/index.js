import React from 'react' 

import {storeProject, storeProjectItems, getProjects} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'

class Projects extends React.Component{

    state = {
        name: "" ,
        info: "",
        dataEntered: false,
        values: [],
        preostalo1: 100,
        preostalo2: 0,
        selectedProject: 0,
        projects: []
    }
    
    componentDidMount() {
        getProjects(this.props.user.username).then(res => this.setState({...this.state, projects: res}))
    }

    onProjectChange  = event => this.setState({...this.state, selectedProject: event.target.value})

    dataEntered = (dataEntered, values) => {
        this.setState({...this.state, dataEntered, values})
    }

    nameChange = (event) => {
        this.setState({...this.state, name: event.target.value})
    }

    onSave = () => {
        if(this.state.name.length>1) {
            console.log("Save project " + this.state.name )

            storeProject(this.props.user.username, this.state.name)
                .then( res => {
                    this.setState({...this.state, info: res.data})
                })
                .catch( err => this.setState({...this.state, info: err}))
        }
    }

    onSaveProjectItems = () => {
        //storeTime = (user, date, time, type, values, h, m)
        const { preostalo1, preostalo2, selectedProject, values} = this.state
     
        storeProjectItems("user",  preostalo1, preostalo2, selectedProject, values)
            .then( res => {
                if(res == "ok") {
                    this.setState({...this.state,  dataEntered: false, values: []}) 
                } else {
                    alert("Greska")
                }

            })
    }

    percentChange = () => {
        this.setState({...this.state, preostalo1: this.refs.preostalo1.value, preostalo2: this.refs.preostalo2.value})
    }

    render() {
        const {preostalo1, preostalo2, dataEntered, selectedProject, projects} = this.state
        return(
            <div className="project-page">
                <h3>Dodaj novi projekat</h3>
                <p>Naziv </p>
                <input type="text" size={30} onChange={this.nameChange} value={this.state.name} />
                <div className="info">{this.state.info}</div>
                {this.state.info.length==0 && <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p> }


                <h3>Izaberi stavke projekta</h3>
                <div> <h5>Izaberi projekat</h5>
                                     <select onChange={this.onProjectChange} value={selectedProject}>
                                     <option value="0">--Izaberite stavku--</option>
                                        {projects && projects.length &&
                                            projects.map(project => <option value={project.id}>{project.id} - {project.name}</option>)
                                        }
                                    </select>
                                </div>

                { selectedProject>0 &&  <SelectProjectTasks dataEntered={this.dataEntered} /> }
                {dataEntered && <div className="percent-form">
                                        <span>Procena preostalog vremen na početku </span>
                                        <input ref="preostalo1" type="text" value={preostalo1} onChange={this.percentChange} size={4} />% <br />
                                        <span>Procena preostalog vremen na kraju </span>
                                        <input ref="preostalo2" type="text" value={preostalo2} onChange={this.percentChange} size={4} />% 
                                        <p><button className="button-save" onClick={this.onSaveProjectItems}>Sacuvaj</button></p>
                                    </div>
                    }
            </div>
        )
    }
}

export default Projects;