import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppFrame from './components/AppFrame'
import Header from './components/Header'

class App extends React.Component {
    render() {
        return(
            <Router basename={'/time2/'}>
                <React.Fragment>
                      <Header /> 
                     <AppFrame />
                </React.Fragment>
            </Router>
        )
    }
}

export default App;