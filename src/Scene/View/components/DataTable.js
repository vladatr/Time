import React from 'react'
import {getData} from '../../data/data'

export default class DataTable extends React.Component {
    treeData = JSON.parse(getData())
    render() {
        const treeData = this.treeData
        
        debugger
        return(
           <div>

               {Array.isArray(this.props.data) &&
               <table width="90%" border="1">
               <tr><th>Datum (unos)</th><th>Program</th><th>Trajanje (min.)</th></tr>
               <tbody>
                 {this.props.data.map(d => <tr key={d.timestamp}><td><b>{d.date}</b> { "(" + d.timestamp + ")"}</td>
                        <td>{treeData.filter(treeitem => treeitem.id==d.value1)[0] && 
                                treeData.filter(treeitem => treeitem.id==d.value1)[0].name }</td><td>{d.duration}</td></tr>)}
                </tbody>
                </table>
               }
            </div>
        )
    }
       
    
}