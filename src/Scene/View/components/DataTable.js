import React from 'react'

export default class DataTable extends React.Component {

    render() {
        
        debugger
        return(
           <div>

               {Array.isArray(this.props.data) &&
               <table width="90%" border="1">
               <tbody>
                 {this.props.data.map(d => <tr key={d.timestamp}><td>{d.date}</td><td>{d.value4}</td><td>{d.duration}</td></tr>)}
                </tbody>
                </table>
               }
            </div>
        )
    }
       
    
}