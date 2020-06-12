const express = require('express')
const router = express.Router()

const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth')
const { getUserById, getUser } = require('../controllers/user')
const { Router } = require('express')

router.param('userId', getUserById)

router.get('/user/:userId',isSignedIn, isAuthenticated, getUser)

module.exports = router