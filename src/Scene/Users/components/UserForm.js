import React from 'react'

import * as UserApi from '../../../api/users'

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {opstine: [], userList: [], users: [], educations: [], addEducation: 0};
        this.userSubmit = this.userSubmit.bind(this);
      }

    componentDidMount() {
        
        UserApi.getOpstine().then((opstine) => this.setState({...this.state, opstine}) )
        UserApi.getEducation().then((educations) => this.setState({...this.state, educations}) )
        UserApi.getUsers(this.props.user.username).then((users) => {
            debugger
            let userList = []
            users.map(user => userList.push({id: user.id, value1: user.username + ' '+ user.type==1 ? "A" : "VS"} ))
            debugger; this.setState({...this.state, userList, users}) 
        } )
    }

    addEducation = () => {
        if(this.refs.addEdu.value.trim() != "") {
            debugger
            UserApi.storeEducation(this.refs.addEdu.value.trim())
                .then( () => {
                    UserApi.getEducation().then((educations) => this.setState({...this.state, educations, addEducation: 0}) )
                })
        }
        
    }

    userSubmit(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.refs.ime.value.trim().length<6) {
            alert("Ime i prezima - bar 6 znakova");
            return
        }
        if(this.refs.username.value.trim().length<4) {
            alert("Korisničko ime - bar 4 znaka");
            return
        }
        if(this.refs.password1.value !== this.refs.password2.value) {
            alert("Ne slažu se lozinke.");
            return
        }
        if(this.refs.password1.value.length == 0) {
            alert("Uneti lozinke");
            return
        }
        if(this.refs.velicina.value == 0) {
            alert("Izabrati veličinu centra");
            return
        }
        if(this.refs.staz.value == 0 || this.refs.staz.value == "") {
            alert("Uneti staž.");
            return
        }
        if(isNaN(this.refs.staz.value)) {
            alert("Uneti staž.");
            return
        }
        debugger
        UserApi.storeUser({admin: this.props.user.username, ime: this.refs.ime.value, opstina: this.refs.opstina.value, edu: this.refs.edu.value, staz: this.refs.staz.value,
            velicina_centra: this.refs.velicina.value, tip: this.refs.tip.value, username: this.refs.username.value, password: this.refs.password1.value} )
        .then( (res) => {
            if(res === "ok") {
                alert("Sačuvan korisnik.");
                this.refs.ime.value=""
                this.refs.staz.value=""
                this.refs.username.value=""
                this.refs.password1.value=""
                this.refs.password2.value=""
            } else {
                alert(res);
            }
           
        })
    }

    educationChange = () => {
        if(this.refs.edu.value == "999") this.setState({...this.state, addEducation: 1})
    }

    render() {
        return(
            <form onSubmit={this.userSubmit}>
                <div className="form-part">
                <label for="ime">Ime i prezime </label>
                    <input name="ime" ref="ime" autoComplete="off" /> 
                </div>

                <div className="form-part">
                <label for="opstina">Opština </label>
                    <select ref="opstina">
                        {this.state.opstine.length>0 && <Options list={this.state.opstine}/>}
                    </select> 
                </div>

                <div className="form-part">
                <label for="obrazovanje">Obrazovanje </label>
                    <select onChange={this.educationChange} ref="edu">
                        {this.state.educations.length>0 && <Options list={this.state.educations}/>}
                    </select> 
                 </div>

                 {this.state.addEducation>0 && 
                   <div className="form-part">
                   <label for="addEdu">Dodaj obrazovanje </label>
                     <input name="addEdu" ref="addEdu" /> 
                     <input type="button" value="Dodaj" onClick={this.addEducation} /> 
                    </div>             
                }

                <div className="form-part">
                <label for="staz">Radni staž </label>
                    <input name="staz" ref="staz" autoComplete="off" /> 
                </div>

                <h4>Podaci o Centru za socijalni rad</h4>
                <div className="form-part">
                <label for="obrazovanje">Velicina centra </label>
                    <select ref="velicina">
                        <option value={0}>Izaberi veličinu</option>
                        <option value={1}>Do 3 voditelja slučaja</option>
                        <option value={2}>4 do 6 voditelja slučaja</option>
                        <option value={3}>Više od 7 voditelja slučaja</option>
                    </select> 
                 </div>

                 <h4>Logovanje</h4>
                 <div className="form-part">
                <label for="tip">Tip pristupa </label>
                    <select ref="tip">
                        <option value={2}>Voditelj slučaja</option>
                        <option value={1}>Supervizor</option>
                    </select> 
                </div>
                 <div className="form-part">
                <label for="username">Ime za logovanje </label>
                    <input name="username"  ref="username" autoComplete="off" /> 
                </div>
                <div className="form-part">
                <label for="password1">Loznika </label>
                    <input name="password1" type="password" ref="password1" autoComplete="off" /> 
                </div>
                <div className="form-part">
                <label for="password2">Loznika </label>
                    <input name="password2" type="password" ref="password2" autoComplete="off" /> 
                </div>

                <div className="form-part">
                    <input name="ok" type="submit" value="Sačuvaj" /> 
                </div>

                <div id="izmena">
                    <hr />
                    <h3>Izmeni podatke o voditelju slučaja</h3>
                    <label for="users">Izaberi voditelja slučaja </label>
                    <select ref="users">
                        {this.state.opstine.length>0 && <Options list={this.state.userList}/>}
                    </select> 
                </div>

            </form>
        )
    }

}

const Options = (props) => props.list.map(o =>  <option value={o.id} key={o.id}>{o.value}</option> )





export default UserForm;