import React from 'react'

import UserForm from './components/UserForm'

class Users extends React.Component {
    render() {

        return(
            <React.Fragment>
                <h2>Voditelji slučaja</h2>
                <UserForm />
            </React.Fragment>
        )
    }
}

export default Users;