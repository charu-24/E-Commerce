import React from 'react'
import "../styles.css"
import { API } from "../user/backend"
import Base from "../core/Base"
export default function Home() {
    console.log("API IS", API)

    return (
        <Base title="Home page">
            <div className="row">
            <div className="col-4">
            <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
            <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
            <button className="btn btn-success">Test</button>
        
        </div>
            </div>
        </Base>
    )
}
