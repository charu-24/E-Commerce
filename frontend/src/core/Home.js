import React from 'react'
import "../styles.css"
import { API } from "../user/backend"

export default function Home() {
    console.log("API IS", process.env.REACT_APP_DATABASE)

    return (
        <div>
            <h1> hey homy sweety </h1>
        </div>
    )
}
