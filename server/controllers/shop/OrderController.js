const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'asdfa66fd5adb948ab'
const store_passwd ='asdfa66fd5adb948ab@ssl'
const is_live = false //true for live, false for sandbox


const Order = require('../../models/OrderMOdel')

const createOrder = async (req, res)=>{
    try {
        const {userId,
            cartItems , 
            addressInfo, 
            orderStatus,
            paymentMethod ,
            paymentSatus,
            totalAmount = 0,
            orderDate,
            oderUpdateDate,
            paymentId,
            payerId,
            quantity
             } = req.body
             
        const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal'
                },
                redirect_urls: {
                    return_url: 'http://localhost:5173/shop/paypal-return',
                    cancel_url: 'http://localhost:5173/shop/paypal-cancel'
                },
                transactions: [
                    {
                        item_list: {
                            items: cartItems.map((item) => ({
                                name: item?.title || 'Unknown Item', // Ensure name exists
                                sku: item?.productId || 'N/A', // Provide default SKU if missing
                                price: item?.price ? item.price.toFixed(2) : '0.00', // Ensure price is a valid number
                                currency: 'USD', // Make sure the currency is correct
                                quantity: item?.quantity || 1 // Ensure quantity is a valid number
                            }))
                        },
                        amount: {
                            currency: 'USD',
                            total: totalAmount.toFixed(2) 
                        },
                        description: 'Purchase from your shop'
                    }
                ]
        };
        const newlyCreatedOrder = new Order({
                        userId,
                        cartItems, 
                        addressInfo, 
                        orderStatus,
                        paymentMethod ,
                        paymentSatus,
                        totalAmount,
                        orderDate,
                        oderUpdateDate,
                        paymentId,
                        payerId,
                        quantity
        })

        await newlyCreatedOrder.save()
        
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(create_payment_json)
        .then(apiResponse => {
            console.log(apiResponse);
            
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({url:GatewayPageURL})
            console.log('Redirecting to: ', GatewayPageURL)
        })
        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "SOme error occured"
        })
        
    }
}



//
const capturePayment = async (req, res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "SOme error occured"
        })
        
    }
}

module.exports = {createOrder, capturePayment}




// SSLCommerzPayment.payment.create(create_payment_json, async(error, paymentInfo)=>{
//     console.log(create_payment_json);
    
//     if(error){
//         console.log(error);
//         return res.status(400).json({
//             success : false,
//             message : 'Error while createing paypal payment '
//         })
//     }else{
//         const newlyCreatedOrder = new Order({
//             userId,
//             cartItems, 
//             addressInfo, 
//             orderStatus,
//             paymentMethod ,
//             paymentSatus,
//             totalAmount,
//             orderDate,
//             oderUpdateDate,
//             paymentId,
//             payerId,
//             quantity
//         })
//         await newlyCreatedOrder.save()
//         const approvalURL = paymentInfo.links.find(link=>link.rel ==='approval_url').href;
//         res.status(200).json({
//             success: true,
//             approvalURL,
//             orderId : newlyCreatedOrder._id,
//         })
//     }
// })