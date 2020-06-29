import React, { userState, useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"

const Signup = () => {
    
const [values, setValues] = useState({
    name:"",
    email: "",
    password:"",
    error:"",
    success: false
})

const { name, email, password, error, success} =values

const handleChange = name => event => {
    setValues({...values, error:false, [name]: event.target.value})
}

const onSubmit = event =>{
    event.preventDefault()
    setValues({...values, error:false})
    signup({name, email, password})
    .then(data => {
        if(data.error){
            setValues({...values, error:data.error, success: false})
        }
        else{
            setValues({
                ...values,
                name:"",
                email:"",
                password:"",
                error:"",
                success: true
            })
        }
    })
    .catch(console.log("Error"))
}

    const signupform = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3            text-left">
                    <form>
                        <div 
                        
                        className="form-group"
                        onChange = {handleChange("name")}
                        >
                            <label className="text-light">
                                Name
                            </label>
                        <input className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Email
                            </label>
                            <input 
                           
                            className="form-control" 
                            onChange = {handleChange("email")}
                            type="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">
                                Password
                            </label>
                            <input 
                            
                            className="form-control" 
                            onChange = {handleChange("password")}
                            type="password" />
                        </div>
                        <button className="btn btn-success btn-block">Signup</button>
                    
                    </form>
                    <p className="text-white text-center">hey</p>
                </div>
        
            </div>
        )
}

    return(
        <Base title="Signup Page" description="Hey Are u not registerd? Get Register now..">
       
            
            {signupform()}
        
        </Base>
    )
}

export default Signup