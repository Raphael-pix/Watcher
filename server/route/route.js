
const {addUser,signinUser} = require('../controller/users-contoller')
const express = require('express')

const router = express.Router()

router.post('/signup',addUser)
router.post('/login',signinUser)

module.exports = router