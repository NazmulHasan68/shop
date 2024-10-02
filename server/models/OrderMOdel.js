const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId : String,
    cartItems : [
        {
            productId :String,
            title:String,
            image : String,
            price: String,
            quantity:String
        }
    ],
    addressInfro :{
        addressId :String,
        address :String,
        city:String,
        pincode:String,
        phone:String,
        notes :String
    },
    orderStatus :String,
    paymentMethod :String,
    paymentSatus : String,
    totalAmount :Number,
    orderDate :Date,
    oderUpdateDate :Date,
    paymentId : String,
    payerId : String,
    quantity :Number
})

module.exports = mongoose.model('Order',OrderSchema)