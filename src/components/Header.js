import React from 'react'
import { Link } from 'react-router-dom';

class Header extends React.Component {
    


    render() {
        console.log(this.props)

        return(
            <section>
                <div className="naslov1"><h2>Merenje vremena</h2></div>
                <div className="naslov">
                    <span className="logged-in">{this.props.user.username}</span> 
                    <span className="log-out" onClick={this.props.logOut}>Odjavi se</span>
                 </div>
                 <div style={{clear: "both"}}>
                    <ul>
                    <li> <Link to="/Vreme">Vremena </Link> </li>
                    <li>  <Link to="/Projekti">Projekti </Link> </li>
                    <li>  <Link to="/Korisnici">Korisnici </Link> </li>
                    <li>  <Link to="/Pregled">Pregled </Link> </li>
                    </ul>
                </div>
            </section>
        )
    }
}

export default Header;