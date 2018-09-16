import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppFrame from './components/AppFrame'
import Login from './components/Login'
import Header from './components/Header'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {username: undefined, type: undefined}}
    }

    setUser = (username, type) => {
        debugger
        localStorage.setItem("wko", username)
        localStorage.setItem("ty", type)
        this.setState({...this.state, user: {username, type}});
    }

    logOut = () => {
        localStorage.clear();
        this.setState({...this.state, user: undefined});
        window.location.href = "/time2/"
    }

    componentDidMount() {
        debugger
        const username = localStorage.getItem("wko")
        const type = localStorage.getItem("ty")
        if(username) this.setUser(username, type)
    }
    
    render() {
        debugger
        const loggedIn = false;
        return(
            <Router basename={'/time2/'}>
                <React.Fragment>
                        {this.state.user.username && <Header user={this.state.user} logOut={this.logOut}/>  }
                      {this.state.user.username && <AppFrame user={this.state.user}  />}
                      {!this.state.user.username && <Login setUser={this.setUser} />}
                     
                </React.Fragment>
            </Router>
        )
    }
}


export default App;