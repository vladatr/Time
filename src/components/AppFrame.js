import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";


import InsertTime from '../Scene/InsertTime'
import Projects from '../Scene/Projects'
import Users from '../Scene/Users'
import View from '../Scene/View'
import Footer from './Footer'


const AppFrame = (props) => {
   // if(!props.user.username) props.history.push('/Prijava')
    return (
      <div className="content-wrapper">
        <Switch>
          <Route exact path="/" component={() => <InsertTime user={props.user} />}  />
          <Route path="/Vreme" component={() => <InsertTime user={props.user} />}  />
          <Route path="/Dosije" component={() => <Projects user={props.user} />}  />
          <Route path="/Voditelji_slucaja" component={() => <Users user={props.user} />}  />
          <Route path="/Pregled" component={() => <View user={props.user} />}  />

          <Route component={<div>404</div>}/>
        </Switch>
        <Footer />
      </div>
    )
  };

  export default withRouter(AppFrame);

