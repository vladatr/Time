import React from 'react'
import { Link } from 'react-router-dom';

class Header extends React.Component {
    


    render() {
        const {user} = this.props
console.log("user ", user)
        return(
            <section>
                <div className="naslov1"><h2>Merenje vremena</h2></div>
                <div className="naslov">
                    <span className="logged-in">{user.username}</span> 
                    <span className="log-out" onClick={this.props.logOut}>Odjavi se</span>
                 </div>
                 <div style={{clear: "both"}}>
                    <ul>
                    {user.type==2 && <li> <Link to="/Vreme">Vremena </Link> </li> }
                    {user.type==2 && <li>  <Link to="/Dosije">Dosije </Link> </li> }
                    <li>  <Link to="/Voditelji_slucaja">Voditelji </Link> </li>
                    <li>  <Link to="/Pregled">Pregled </Link> </li>
                    </ul>
                </div>
            </section>
        )
    }
}

export default Header;