import React from 'react'
import tree from '../data/data'

class SelectProjectTasks extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeSelect1 = this.onChangeSelect1.bind(this)
        this.onChangeSelect2 = this.onChangeSelect2.bind(this)
        this.onChangeSelect3 = this.onChangeSelect3.bind(this)
        this.onChangeSelect4 = this.onChangeSelect4.bind(this)
    }
    
    state = {
        korak: 0,
        nodes: [tree._root, null, null, null],
        selectedValues: []
    }

    cb = (node, korak) => {
        debugger
        let temp = [...this.state.nodes]
        temp[korak+1] = node
        this.setState({...this.state, nodes:temp, korak: korak+1})
        console.log("callback ", this.state)
    }

    onChangeSelect1 = (event) => { this.setState({...this.state, selectedValues: [event.target.value, 0] }); console.log("handler ", this.state);  tree.find(this.state.nodes[0], event.target.value, this.cb, 0);    }
    onChangeSelect2 = (event) => { this.setState({...this.state, selectedValues: [this.state.selectedValues[0], event.target.value, 0, 0]}); tree.find(this.state.nodes[1], event.target.value, this.cb, 1);     }
    onChangeSelect3 = (event) => {this.setState({...this.state, selectedValues: [this.state.selectedValues[0], this.state.selectedValues[1], event.target.value, 0]}); tree.find(this.state.nodes[2], event.target.value, this.cb, 2);     }
    onChangeSelect4 = (event) => this.setState({...this.state, selectedValues: [this.state.selectedValues[0], this.state.selectedValues[1], this.state.selectedValues[2], event.target.value]} )


    
    render() {
        debugger
        const {korak, nodes, selectedValues} = this.state
    
        return(
         <React.Fragment>
            <div className="select-project-task1">
        { korak>=0 && <select onChange={this.onChangeSelect1}   value={selectedValues[0]}> 
                                   <FirstItem />
                                  {nodes[0].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> }
            </div>
            <div className="select-project-task2">
        { korak>=1 && <select onChange={this.onChangeSelect2}   value={selectedValues[1]}> 
                                <FirstItem />
                                  {nodes[1].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> }
              </div>
            <div className="select-project-task3">
        { korak>=2 && <select onChange={this.onChangeSelect3}   value={selectedValues[2]}> 
                                <FirstItem />
                                  {nodes[2].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> }
           </div>
            <div className="select-project-task4">
        { korak>=3 && <select onChange={this.onChangeSelect4}   value={selectedValues[3]}> 
                                    <FirstItem />
                                  {nodes[3].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> }
                </div>
         </React.Fragment>
        ) 
    }

}

const FirstItem = () => <option key={0}  value={0}>-- Izberi stavku --</option> 




export default SelectProjectTasks; 