const express = require('express')
const router = express.Router()


const {getfilterProducts, getProductDetails} = require('../../controllers/shop/productsController')
router.get('/get', getfilterProducts)

//product details
router.get('/get/:id', getProductDetails)

module.exports = router