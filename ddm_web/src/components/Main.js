/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React from 'react';
import RegistrationForm from "./RegistrationForm";
import QueryProduct from "./QueryProduct";
import { Switch, Route } from 'react-router-dom'
import Order from './Order'
import Home from "./Home";

class Main extends React.Component {
    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/register" component={RegistrationForm}/>
                    <Route path="/search" component={QueryProduct}/>
                    <Route path="/order" component={Order}/>
                    <Route component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default Main;