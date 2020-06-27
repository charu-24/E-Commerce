import React, { userState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"

const Signin = () => {
    const signinform = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3            text-left">
                    <form>
                        
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input className="form-control" type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input className="form-control" type="password" />
                        </div>
                        <button className="btn btn-success btn-block">Signup</button>
                    
                    </form>
                </div>
        
            </div>
        )
}


    return(
        <Base title="Signin Page" description="Login user">
       
            {signinform()}
        
        </Base>
    )
}

export default Signin