import React from 'react'

import { checkUser } from '../api/users';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.setUser = this.setUser.bind(this)
    }

    setUser(event) {
debugger
        event.preventDefault()
        const username = this.refs.username.value
        checkUser(username, this.refs.password.value)
        .then((res) => {
            debugger
            if(res.status=="ok") {
                this.props.setUser(res.username, res.type)
            }             
        })
        
    }

    render() {
        return(
            <div className="login-container">
                <div>
                    <h1>LoginPage</h1>
                    <form onSubmit={this.setUser}>
                        <div className="form-group">
                            <label for="username">Korisničko ime</label> <br />
                                <input type="text" className="form-control" ref="username" placeholder="korisnicko ime" autoComplete="off" />
                        </div>
                        <div className="form-group">
                            <label for="password">Lozinka</label> <br />
                                <input type="password" className="form-control" ref="password" placeholder="lozinka" autoComplete="off" />
                        </div> 
                        <button type="submit" className="btn btn-primary">Prijavi se</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;