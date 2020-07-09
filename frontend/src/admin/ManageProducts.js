import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { isAutheticated } from '../auth/helper'
import { getAllProduct, deleteProduct } from "../admin/helper/adminapicall"

const ManageProducts = () => {

    const [products, setProducts] = useState([])

    const [error, setError] = useState()

    const { user, token } = isAutheticated()

    const preload = () =>{
        getAllProduct().then(data => {
            console.log("char")
            if(data.error) {
                setError(data.error)
            }else{
                console.log(data)
                setProducts(data)
            }
        })
    }
    //needed to be erased again
     const [products, setProducts] = useState([])

    const [error, setError] = useState()

    const { user, token } = isAutheticated()

    const preload = () =>{
        getAllProduct().then(data => {
            console.log(data)
            if(error) {
                console.log(data.error)
            }else{
                console.log(data)
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    //delete product
    const deleteThisProduct = (productId) => {
      deleteProduct(productId, user._id, token).then(data =>{
        
        if(error){
          console.log(data.error)
        }else{
          console.log(data)
         setProducts(data)
        }
      })
    }

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

         {products && products.map((product, index) =>(
            <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{product.name}</h3>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/admin/product/update/productId`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {
                deleteThisProduct(product._id)
              }} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
         ))}
        </div>
      </div>
    </Base>
    )
}

export default ManageProducts
