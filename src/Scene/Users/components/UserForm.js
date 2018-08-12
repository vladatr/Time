import React from 'react'

import * as UserApi from '../../../api/users'

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {opstine: [], educations: [], addEducation: 0};
      }

    componentDidMount() {
        
        UserApi.getOpstine().then((opstine) => this.setState({...this.state, opstine}) )
        UserApi.getEducation().then((educations) => this.setState({...this.state, educations}) )
    }

    addEducation = () => {
        if(this.refs.addEdu.value.trim() != "") {
            UserApi.storeEducation(this.refs.addEdu.value.trim())
                .then( () => {
                    UserApi.getEducation().then((educations) => this.setState({...this.state, educations, addEducation: 0}) )
                })
        }
        
    }

    userSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        consolo.log("SUBMIT")
    }

    educationChange = () => {
        if(this.refs.edu.value == "999") this.setState({...this.state, addEducation: 1})
    }

    render() {
debugger
        return(
            <form onSubmit={this.userSubmit}>
                <div className="form-part">
                <label for="opstina">Opština</label>
                    <select>
                        {this.state.opstine.length>0 && <Options list={this.state.opstine}/>}
                    </select> 
                </div>

                <div className="form-part">
                <label for="obrazovanje">Obrazovanje</label>
                    <select onChange={this.educationChange} ref="edu">
                        {this.state.educations.length>0 && <Options list={this.state.educations}/>}
                    </select> 
                 </div>

                 {this.state.addEducation && 
                   <div className="form-part">
                   <label for="addEdu">Dodaj obrazovanje</label>
                     <input name="addEdu" ref="addEdu" /> 
                     <input type="button" value="Dodaj" onClick={this.addEducation} /> 
                    </div>             
                }

                <div className="form-part">
                <label for="staz">Radni staž</label>
                    <input name="staz" /> 
                </div>

                <h4>Podaci o Centru za socijalni rad</h4>
                <div className="form-part">
                <label for="obrazovanje">Obrazovanje</label>
                    <select>
                        <option value={0}>Izaberi veličinu</option>
                        <option value={1}>Do 3 voditelja slučaja</option>
                        <option value={2}>4 do 6 voditelja slučaja</option>
                        <option value={3}>Više od 7 voditelja slučaja</option>
                    </select> 
                 </div>

                 <h4>Logovanje</h4>
                 <div className="form-part">
                <label for="username">Korisničko ime</label>
                    <input name="username" /> 
                </div>
                <div className="form-part">
                <label for="password1">Loznika</label>
                    <input name="password1" type="password" /> 
                </div>
                <div className="form-part">
                <label for="password2">Loznika</label>
                    <input name="password2" type="password"  /> 
                </div>

                <div className="form-part">
                    <input name="ok" type="submit" value="Sačuvaj" /> 
                </div>
            </form>
        )
    }

}

const Options = (props) => props.list.map(o =>  <option value={o.id} key={o.id}>{o.value}</option> )





export default UserForm;