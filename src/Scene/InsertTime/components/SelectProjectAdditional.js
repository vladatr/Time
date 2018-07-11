import React from 'react';

class SelectProjectAdditional extends React.Component {
    state= {
        value: 0
    }

    onChangeSelect = (event) => { 
        debugger
        const value = event.target.value
        let result=[]
        result.push(value)
        this.setState({value}) 
        this.props.dataEntered(value!=0, result);
    }

    render() {
        return(
                <div className="select-project">
                     <h3>Aktivnosti vezane za predmet</h3>
                    <select onChange={this.onChangeSelect}   value={this.state.value}> 
                        <option  value={0}>-- Izberi stavku --</option> 
                        <option  value={1}>sastanci oko predmeta </option> 
                        <option  value={2}>priprema strategije za pristup korisniku</option> 
                        <option  value={3}>administracija </option> 
                        <option  value={4}>telefonska komunikacija vezana za predmet  </option> 
                        <option  value={5}>ostali poslovi za korisnika </option> 
                    </select> 
                </div>
        )
    }
}

export default SelectProjectAdditional;