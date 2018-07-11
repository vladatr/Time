import React from 'react';
import { Switch, Route } from "react-router-dom";


import InsertTime from '../Scene/InsertTime'
import Projects from '../Scene/Projects'
import Footer from './Footer'
import Header from './Header'

const AppFrame = (props) => {

    return (
      <div className="content-wrapper">
        <Switch>
          <Route exact path="/" component={InsertTime} />
          <Route path="/Vreme" component={InsertTime} />
          <Route path="/Projekti" component={Projects} />
          <Route component={<div>404</div>}/>
        </Switch>
        <Footer />
      </div>
    )
  };

  export default AppFrame;

