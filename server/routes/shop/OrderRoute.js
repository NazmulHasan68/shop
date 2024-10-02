const express = require('express')


const {createOrder} = require('../../controllers/shop/OrderController')
const router = express.Router()

router.post('/create', createOrder)

module.exports = router