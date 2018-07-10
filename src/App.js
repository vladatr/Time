import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppFrame from './components/AppFrame'

class App extends React.Component {
    render() {
        return(
            <Router basename={'/time2/'}>
                <React.Fragment>
                     <AppFrame />
                </React.Fragment>
            </Router>
        )
    }
}

export default App;