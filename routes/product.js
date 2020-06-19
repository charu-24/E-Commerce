const express= require('express')
const router = express.Router()


const { 
    getCategoryById,    
} = require('../controllers/category')

const { getUserById} = require('../controllers/user')

const { getProductById, createProduct} = require('../controllers/product')

const {
    isSignedIn,
     isAdmin, 
     isAuthenticated
    } = require('../controllers/auth')

//params
router.param("userId", getUserById)
router.param("productId", getProductById)

//create product
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)



module.exports = router