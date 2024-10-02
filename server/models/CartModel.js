const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        redquired : true
    },
    items : [
        {
            productId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'product',
                required : true
            },
            quantity :{
                type : Number,
                required : true,
                min : 1
            }
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Cart', CartSchema)
