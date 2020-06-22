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
        const { name, description, price, stock, photo, category} = fields
        if(!name || !description ||  !price || !stock){
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
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        console.log(product.photo)
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

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.updateProduct = (req, res) =>{
    const product = req.product;
    product.name = req.body.name;

    product.save((err, updateProduct) => {
        if(err){
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }  
        res.json(updateProduct)
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Not able to Remove"
            })
        }  
        res.json({
            message: "deleted"
        })
    })
}