import React, { useState, useEffect } from "react";
import "../styles.css"
import { API } from "../backend"
import Base from "../core/Base"
import Card from './Card'
import { loadCart } from "./helper/cartHelper";



const Cart=() => {
    console.log("API IS", API)
    const [products, setProducts] = useState([])
   
    useEffect(() => {
        setProducts(loadCart())
    }, [])

    const loadAllProducts = () => {
        return(
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) =>{
                    return(
                        <Card 
                        key={index}
                        product={product}
                        removeFromCart={true}
                        addToCart={false}
                    />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h2>This section is to checkout</h2>
            </div>
        )
    }
    
    return (

        <Base title="Cart page">
            <div className="row ">
                <div className="col-md-6">{loadAllProducts()}</div>
                <div className="col-md-6">{loadCheckout()}</div>
                    
              
            </div>
        </Base>
    )
}

export default Cart