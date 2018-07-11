import React from 'react' 

import {addProject} from '../../api'

class Projects extends React.Component{

    state = {
        name: "" 
    }

    nameChange = (event) => {
        debugger
        this.setState({name: event.target.value})
    }

    onSave = () => {
        if(this.state.name.length>1) {
            console.log("Save project " + this.state.name )
        }
    }

    render() {
        return(
            <div className="project-page">
                <h3>Dodaj novi projekat</h3>
                <p>Naziv </p>
                <input type="text" size={30} onChange={this.nameChange} value={this.state.name} />
                <p><button className="button-save" onClick={this.onSave}>Sacuvaj</button></p>
            </div>
        )
    }
}

export default Projects;