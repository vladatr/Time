import React from 'react'


export default class UserDataTable extends React.Component {

    render() {
debugger
        return(
           <div>

               {Array.isArray(this.props.users) &&
               <table width="90%" border="1">
               <thead>
                    <tr><th>Voditelj slučaja</th><th>Broj dosijea</th></tr>
               </thead>
               <tbody>
                    {this.props.users.map(user => 
                            <tr key={"t1" + user.id}><td>{user.username}</td><td>{user.countProjects}</td></tr> 
                    )}
                </tbody>
                </table>
               }
            </div>
        )
    }
       
    
}