import React, {useState } from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import {signin, authenticate, isAutheticated} from "../auth/helper/index"



const Signin = () => {

    const [values, setValues] = useState({
        email:"",
        encry_password:"",
        error:"",
        loading:false,
        didRedirect:false
    })
    const {email, encry_password, error, loading, didRedirect} = values

    const { user } = isAutheticated()

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading:true})
        signin({email,encry_password})
        .then(data => {
            if(data.error) {
                setValues({...values, error:data.error, loading: false})
            }else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect:true,

                    })
                })
            }
        })
        .catch(error => console.log("error in siginin"))
    }

    const performRedirect = () => {
        if(didRedirect){
            if( user && user.role===1){
                return <p>redirected to admin</p>
            }else{
                return <p>redirected to user</p>
            }
        }
        if(isAutheticated()){
            return <Redirect to="/" />
        }
    }

    const signinform = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3            text-left">
                    <form>
                        
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input className="form-control" 
                            onChange={handleChange("email")}
                            value={email}
                            type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input className="form-control" 
                            onChange={handleChange("email")}
                            value={email}
                            type="password" />
                        </div>
                        <button 
                        onClick={onSubmit}
                        className="btn btn-success btn-block">Signup</button>
                    
                    </form>
                </div>
        
            </div>
        )
}

const loadingMessage = () => {
    return (
      loading && (
          <div className="alert alert-info">
            <h1>Loading...</h1>
          </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };



    return(
        <Base title="Signin Page" description="Login user">
       
            {signinform()}
            {performRedirect()}
        
        </Base>
    )
}

export default Signin