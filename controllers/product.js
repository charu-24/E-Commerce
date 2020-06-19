const Product = require('../models/product')
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Problem is within the file check it and try again.."
            })
        }

        //destructuring the fields
        const { name, description, category, price, stock} = fields
        if(!name || !description || !category || !price || !stock){
            return res.status(400).json({
                error: "All fields are required"
            })

        }

        let product = new Product(fields)

        if(files.photo){
            if(files.photo.size> 3000000){
                return res.status(400).json({
                    error: "File is too big!"
                })
            }

        }

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save the product in DB"
                })
            }
            res.json({product})
        })
    })
}