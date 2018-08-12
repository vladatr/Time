import React from 'react' 

import {storeProject} from '../../api'
import SelectProjectTasks from './components/SelectProjectTasks'

class Projects extends React.Component{

    state = {
        name: "" ,
        info: ""
    }

    nameChange = (event) => {
        this.setState({...this.state, name: event.target.value})
    }

    onSave = () => {
        if(this.state.name.length>1) {
            console.log("Save project " + this.state.name )

            storeProject("test", this.state.name)
                .then( res => {
                    this.setState({...this.state, info: res.data})
                })
                .catch( err => this.setState({...this.state, info: err}))
        }
    }

    render() {
        return(
            <div className="project-page">
                <h3>Dodaj novi projekat</h3>
                <p>Naziv </p>
                <input type="text" size={30} onChange={this.nameChange} value={this.state.name} />
                <div className="info">{this.state.info}</div>
                {this.state.info.length==0 && <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p> }
                <SelectProjectTasks dataEntered={this.dataEntered} />
            </div>
        )
    }
}

export default Projects;