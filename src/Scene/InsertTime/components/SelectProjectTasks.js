import React from 'react'
import tree from '../data/data'

class SelectProjectTasks extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeSelect = this.onChangeSelect.bind(this)
    }
    
    state = {
        korak: 0,
        values: [],
        nodes: [tree._root, null, null, null],
       
    }

    cb = (node, korak) => {
        let temp = [...this.state.nodes]
        temp[korak+1] = node
        this.setState({...this.state, nodes:temp, korak: korak+1})
        console.log("callback ", this.state)
    }

    onChangeSelect = (event) => { 
        let value = event.target.value
        let values = [...this.state.values]
        values[this.state.korak]=value;
        for(let i=this.state.korak+1; i<4; i++) values[i]=0;
        console.log(values)
        let korak = this.state.korak;
        this.setState( {...this.state,values}, function() {
            tree.find(this.state.nodes[korak], value, this.cb, korak);
        } ); 
     }

    
    render() {
        debugger
        const {korak, nodes, values} = this.state
    
        return(
         <React.Fragment>
          { korak>=0 &&  <div className="select-project select-project-task1">
                             <h3>Programi</h3>
                            <select onChange={this.onChangeSelect}   value={values[0]}> 
                                   <FirstItem />
                                  {nodes[0].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
            </div> }
            
        { korak>=1 && <div className="select-project select-project-task2">
                        <h3>Postupci</h3>
                        <select onChange={this.onChangeSelect}   value={values[1]}> 
                                <FirstItem />
                                  {nodes[1].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
              </div> }
            
        { korak>=2 && <div className="select-project select-project-task3">
                        <h3>Zadaci</h3>
                        <select onChange={this.onChangeSelect}   value={values[2]}> 
                                <FirstItem />
                                  {nodes[2].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
           </div> }
  
        { korak>=3 && <div className="select-project select-project-task4">
                         <h3>Aktivnosti</h3>
                            <select onChange={this.onChangeSelect}   value={values[3]}> 
                                    <FirstItem />
                                  {nodes[3].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
                </div> }
         </React.Fragment>
        ) 
    }

}

const FirstItem = () => <option key={0}  value={0}>-- Izberi stavku --</option> 




export default SelectProjectTasks; 