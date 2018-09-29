import React from 'react'

import SupervizorView from './components/SupervizorView'
import AdminView from './components/AdminView'
import UserView from './components/UserView'

const View = (props) => {
    
        return(
            <React.Fragment>
                { props.user.username == "admin" && <AdminView />}
                { props.user.type==1 && props.user.username != "admin" && <SupervizorView user={props.user} /> }
                { props.user.type==2 && <UserView user={props.user} /> }
            </React.Fragment>
        )

}

export default View;
