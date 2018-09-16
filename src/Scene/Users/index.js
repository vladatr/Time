import React from 'react'

import UserForm from './components/UserForm'

class Users extends React.Component {
    render() {
        const {user} = this.props
        return(
            <React.Fragment>
                <h2>Dodavanje voditelja slučaja</h2>
                {user.type==1 && <UserForm user={user} />}
                {user.type!=1 && <h3>Samo administrator dodaje korisnike</h3>}
            </React.Fragment>
        )
    }
}

export default Users;