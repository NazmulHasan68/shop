const express = require('express')
const {   
    addAddress,
    fetchAddress,
    editAddress,
    deleteAddress} = require('../../controllers/shop/AddressControler')

    const router = express.Router()

    router.post('/add', addAddress)
    router.get('/get/:userId', fetchAddress)
    router.delete('/delete/:userId/:addressId', deleteAddress)
    router.put('/update/:userId/:addressId', editAddress)

    module.exports = router