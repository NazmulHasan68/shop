const express = require('express')
const{
    addtoCart,
    updatecartItem,
    DeleteCardItem,
    fetchCartitem
} = require('../../controllers/shop/CartController')


const router = express.Router()

router.post('/add', addtoCart)
router.get('/get/:userId', fetchCartitem)
router.put('/update-cart', updatecartItem)
router.delete('/:userId/:productId',DeleteCardItem)

module.exports = router