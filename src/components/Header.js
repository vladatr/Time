import React from 'react'
import { Link } from 'react-router-dom';

class Header extends React.Component {
    


    render() {
        return(
            <section>
                <h2>Merenje vremena</h2>
                <ul>
                   <li> <Link to="/Vreme">Vremena </Link> </li>
                   <li>  <Link to="/Projekti">Projekti </Link> </li>
                   <li>  <Link to="/Voditelji">Voditelji slučaja </Link> </li>
                </ul>
            </section>
        )
    }
}

export default Header;