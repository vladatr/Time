import React from 'react';

class SelectOtherTasks extends React.Component {
    state= {
        value: 0
    }

    onChangeSelect = (event) => { 
        debugger
        const value = event.target.value
        this.setState({value}) 
        this.props.dataEntered(value!=0, value, 4);
    }

    render() {
        return(
            <div className="select-project">
                <h3>Vreme koje nije vezano za posao</h3>
                <select onChange={this.onChangeSelect}   value={this.state.value}> 
                    <option  value={0}>-- Izberi stavku --</option> 
                    <option  value={1}>Dnevni odmor</option> 
                    <option  value={2}>Bolovanje</option> 
                </select> 
            </div>
        )
    }
}

export default SelectOtherTasks;