import React from 'react'
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom"
import Home from "./core/Home"
import Signup from './user/Signup'
import Signin from './user/Signin'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup"  component={Signup} />
                <Route path="/signin"  component={Signin} />
            </Switch>
        </Router>
    )
}
