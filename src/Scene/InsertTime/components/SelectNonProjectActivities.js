import React from 'react';

class SelectNonProjectActivities extends React.Component {
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
                <h3> Aktivnosti koje nisu vezane za dosije</h3>
                <select onChange={this.onChangeSelect}   value={this.state.value}> 
                    <option  value={0}>-- Izberi stavku --</option> 
                    <option  value={1}>trening/obuka</option> 
                    <option  value={2}>sastanci </option> 
                    <option  value={3}>upoznavanje sa novim davaocima usluga i servisima </option> 
                    <option  value={4}>administracija</option> 
                    <option  value={5}>telefonska komunikacija</option> 
                    <option  value={6}>dežurstvo </option> 
                    <option  value={7}>članstvo u stručnom timu</option> 
                    <option  value={8}>rad u prijemnoj kancelariji</option> 
                    <option  value={9}>rad na tuđim predmetima</option> 
                    <option  value={10}>razgovor sa strankama na predmetima koji su završeni</option> 
                    <option  value={11}>odlazak u sud/policiju u svojstvu organa starateljstva</option> 
                    <option  value={12}>popunjavanje dnevnika</option> 
                </select> 
            </div>
        )
    }
}

export default SelectNonProjectActivities;