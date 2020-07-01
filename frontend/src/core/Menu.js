import React from 'react'
import { Link, withRouter} from "react-router-dom"
import { signout, isAutheticated } from '../auth/helper'



const currentTab =(history, path) =>{
    if( history.location.pathname === path)
    {
        return {color :"green" }
    }
    else{
        return { color: "white"}
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link 
                style = { currentTab(history, "/") }
                className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link 
                style = { currentTab(history, "/cart") }
                className="nav-link" to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
                <Link
                style = { currentTab(history, "/user/dashboard") }
                className="nav-link" to="/user/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link
                style = { currentTab(history, "/admin/dashboard") }
                className="nav-link" to="/admin/dashboard">A. Dashboard</Link>
            </li>
            {!isAutheticated() && (
                <li className="nav-item">
                <Link 
                style = { currentTab(history, "/signup") }
                className="nav-link" to="/signup">Signup</Link>
            </li>
            )}
            {!isAutheticated() && (
                <li className="nav-item">
                <Link 
                style = { currentTab(history, "/signin") }
                className="nav-link" to="/signin">Signin</Link>
            </li>
            )}
            {isAutheticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={() => {
                        signout(() =>{
                            history.push('/')
                        })
                    }}>
                        Signout
                    </span>
                </li>
            )}
        </ul>
    </div>

)


export default withRouter(Menu)