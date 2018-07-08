import React from 'react';
import { Switch, Route } from "react-router-dom";


import InsertTime from '../Scene/InsertTime'
import Footer from './Footer'
import Header from './Header'

const AppFrame = (props) => {

    return (
      <div className="content-wrapper">
         <Header />
        <Switch>
          <Route exact path="/" component={InsertTime} />
          <Route path="/InsertTime" component={InsertTime} />

        </Switch>
        <Footer />
      </div>
    )
  };

  export default AppFrame;

