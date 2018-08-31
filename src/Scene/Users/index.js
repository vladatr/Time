import React from 'react'

import UserForm from './components/UserForm'

class Users extends React.Component {
    render() {

        return(
            <React.Fragment>
                <h2>Dodavanje korisnika</h2>
                {this.props.user.type==1 && <UserForm />}
                {this.props.user.type!=1 && <h3>Samo administrator dodaje korisnike</h3>}
            </React.Fragment>
        )
    }
}

export default Users;