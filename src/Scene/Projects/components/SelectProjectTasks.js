import React from 'react'
import tree from '../../data/tree'


import {storeProjectItems} from '../../../api'

class SelectProjectTasks extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeSelect = this.onChangeSelect.bind(this)
    }
    
    state = {
        info: "",
        korak: 0,
        value1: 0,
        value2: [],
        preostalo1: 100,
        preostalo2: 0,
        nodes: [tree._root, null, null, null]
    }

       
    percentChange = () => {
        this.setState({...this.state, preostalo1: this.refs.preostalo1.value, preostalo2: this.refs.preostalo2.value})
    }

    cb = (node, korak) => {
        let temp = [...this.state.nodes]
        temp[korak+1] = node
        this.setState({...this.state, nodes:temp, korak: korak+1})
        console.log("callback ", this.state)
    }

    onChangeSelect = (event) => { 
        debugger
        const value = event.target.value

        this.setState( {...this.state,value1: value}, function() {
            tree.find(this.state.nodes[0], value, this.cb, 0); //korak je 1
        } ); 
     }

     onSaveProjectItems = () => {
         debugger
   
        //storeTime = (user, date, time, type, values, h, m)
        const { preostalo1, preostalo2, value1} = this.state
        if(value1==0) {alert("Izabrati stavke"); return;}
        //get all checkboxes
        const cbitems = Object.keys(this.refs).map(r => {
            if(this.refs[r].type=="checkbox") return this.refs[r];
        })
        let selected = cbitems.filter(cb => cb && cb.checked);
        if(selected.length==0) {alert("Izabrati stavke"); return;}
        debugger
        selected = selected.map(cb => cb.id);
        

        storeProjectItems(this.props.user.username,  preostalo1, preostalo2, this.props.selectedProject, value1, selected)
            .then( res => {
                if(res == "ok") {
                    debugger;
                    this.setState({...this.state,   value1:0, value2: [], info: "Program je unet. Unesite sledeći program za izabrani dosije", korak: 0}) 
                    const that = this;
                    setTimeout(function() {debugger; that.setState({...this.state, info: ""})}, 3000);
                } else {
                    alert("Greska")
                }

            })
    }


    
    render() {
        const {korak, nodes, value1, value2, preostalo1, preostalo2, info} = this.state
    debugger
        return(
         <React.Fragment>
            {info && <h4>{info}</h4>}
          { korak>=0 &&  <div className="select-project select-project-task1">
                             <h5>Programi</h5>
                            <select onChange={(event) => this.onChangeSelect(event, 0)}   value={value1}> 
                                   <FirstItem />
                                  {nodes[0].children.map( node =>  <option key={node.data.id}  value={node.data.id}>{node.data.name} </option>   ) }
                                </select> 
            </div> }
            
        { korak==1 && <div className="select-project select-project-task2">
                        <h5>Postupci</h5>
                        {nodes[1].children.map( (node, index) =>  <div><input type="checkbox" ref={"value2"+index} key={node.data.id} id={node.data.id}  />{node.data.name}</div>) }
              </div> }

                              {korak>=1 && <div className="percent-form">
                                        <span>Procena preostalog vremen na početku programa</span>
                                        <input ref="preostalo1" type="text" value={preostalo1} onChange={this.percentChange} size={4} />% <br />
                                       <span>Procena preostalog vremen na kraju </span>
                                        <input ref="preostalo2" type="text" value={preostalo2} onChange={this.percentChange} size={4} />% 
                                        <p><button className="button-save" onClick={this.onSaveProjectItems}>Sacuvaj</button></p>
                                    </div>
                              }
       
         </React.Fragment>
        ) 
    }

}

const FirstItem = () => <option key={0}  value={0}>-- Izberi stavku --</option> 




export default SelectProjectTasks; 