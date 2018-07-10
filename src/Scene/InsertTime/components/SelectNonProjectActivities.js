import React from 'react';

class SelectNonProjectActivities extends React.Component {
    state= {
        value: 0
    }

    onChangeSelect = (event) => { this.setState({value: event.target.value}) }

    render() {
        return(
            <div className="select-project">
                <h3> Aktivnosti koje nisu vezane za predmet</h3>
                <select onChange={this.onChangeSelect}   value={this.state.value}> 
                    <option  value={0}>-- Izberi stavku --</option> 
                    <option  value={1}>trening/obuka</option> 
                    <option  value={2}>sastanci </option> 
                    <option  value={3}>upoznavanje sa novim davaocima usluga i servisima </option> 
                    <option  value={4}>administracija</option> 
                    <option  value={5}>telefonska komunikacija</option> 
                    <option  value={6}>dežurstvo </option> 
                    <option  value={7}>članstvo u stručnom timu</option> 
                </select> 
            </div>
        )
    }
}

export default SelectNonProjectActivities;