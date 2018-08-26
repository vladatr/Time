import React from 'react'
import tree from '../../data/tree'

const allowed = ["1.1.2.1.", "1.1.2.2."];

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

    onChangeSelect = (event, korak) => { 
        let value = event.target.value
        let values = [...this.state.values]
        values[korak]=value;
        for(let i=this.state.korak+1; i<4; i++) values[i]=0;
        
        console.log(values, korak, value)
        this.props.dataEntered(korak==3 && value!=0, values); //insertTime component must know if data is entered
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
                             <h5>Programi</h5>
                            <select onChange={(event) => this.onChangeSelect(event, 0)}   value={values[0]}> 
                                   <FirstItem />
                                  {nodes[0].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
            </div> }
            
        { korak>=1 && <div className="select-project select-project-task2">
                        <h5>Postupci</h5>
                        <select onChange={(event) => this.onChangeSelect(event, 1)}   value={values[1]}> 
                                <FirstItem />
                                  {nodes[1].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
              </div> }
            
        { korak>=2 && <div className="select-project select-project-task3">
                        <h5>Zadaci</h5>
                        <select onChange={(event) => this.onChangeSelect(event, 2)}   value={values[2]}> 
                                <FirstItem />
                                  {nodes[2].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
           </div> }
  
        { korak>=3 && <div className="select-project select-project-task4">
                         <h5>Aktivnosti</h5>
                            <select onChange={(event) => this.onChangeSelect(event, 3)}   value={values[3]}> 
                                    <FirstItem />
                                    {nodes[3].children.map(node => console.log("4. korak ",node.data.id))}
                                  {nodes[3].children
                                    .map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
                </div> }
         </React.Fragment>
        ) 
    }

}

const FirstItem = () => <option key={0}  value={0}>-- Izberi stavku --</option> 




export default SelectProjectTasks; 