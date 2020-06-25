import React from 'react'
import {Route, Link, Switch, BrowserRouter as Router} from "react-router-dom"
import Home from "./core/Home"

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    )
}
