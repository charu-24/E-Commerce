const express= require('express')
const router = express.Router()


const { getUserById, userPurchaseList} = require('../controllers/user')

const {
    isSignedIn,
     isAdmin, 
     isAuthenticated
    } = require('../controllers/auth')

const { updateStock } = require('../controllers/product')

const {getOrderById , createOrder, getAllOrders} = require("../controllers/order")

//params
router.param("userId", getUserById)
router.param("orderId", getOrderById)

//create order
router.post('/order/create/:userId', isSignedIn, isAuthenticated, userPurchaseList, updateStock, createOrder,)

// get all orders
router.get("order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)
module.exports = router