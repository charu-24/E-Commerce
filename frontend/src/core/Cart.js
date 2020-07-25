import React, { useState, useEffect } from "react";
import "../styles.css"
import { API } from "../backend"
import Base from "../core/Base"
import Card from './Card'
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";



const Cart=() => {
    console.log("API IS", API)
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)
   
    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
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
                        setReload={setReload}
                        reload={reload}
                    />
                    )
                })}
            </div>
        )
    }

    const loadCheckout = () =>{
        return(
            <div>
                <h2><StripeCheckout 
                 products={products}
                 setReload={setReload}
                 reload={reload}
                /></h2>
            </div>
        )
    }
    
    return (

        <Base title="Cart page">
            <div className="row ">
                <div className="col-md-6 text-center">{products.length > 0} ? loadAllProducts() : (<h3>No Products Here</h3>)</div>
                <div className="col-md-6 text-center">{loadCheckout()}</div>
                    
              
            </div>
        </Base>
    )
}

export default Cart