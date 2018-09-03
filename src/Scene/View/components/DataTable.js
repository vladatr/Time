import React from 'react'
import {getData} from '../../data/data'

export default class DataTable extends React.Component {

    render() {
        const treeData = JSON.parse(getData())
        
        debugger
        return(
           <div>

               {Array.isArray(this.props.data) &&
               <table width="90%" border="1">
               <tbody>
                 {this.props.data.map(d => <tr key={d.timestamp}><td>{d.date}</td>
                        <td>{treeData.filter(treeitem => treeitem.id==d.value1)[0] && 
                                treeData.filter(treeitem => treeitem.id==d.value1)[0].name }</td><td>{d.duration}</td></tr>)}
                </tbody>
                </table>
               }
            </div>
        )
    }
       
    
}