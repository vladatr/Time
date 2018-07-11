import React from 'react'
import { Link } from 'react-router-dom';

class Header extends React.Component {
    


    render() {
        return(
            <section>
                <h2>Merenje vremena</h2>
                <Link to="/Vreme">Vremena </Link>
                <Link to="/Projekti">Prijekti </Link>
            </section>
        )
    }
}

export default Header;