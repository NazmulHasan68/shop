const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')





const AuthRouter = require('./routes/auth/Auth-route')

//create a database connection - > u can also
// create a separate file for this and then import/ use that file
mongoose
    .connect('mongodb+srv://n47712338:KQRWdHnuar98gf8v@cluster0.sujst.mongodb.net/')
    .then(()=>console.log("MongoDB is Connected"))
    .catch((error) => console.log(error))


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin : 'http://localhost:5173', 
    methods : ['GET', 'POST', "DELETE", 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'pragma'
    ],
    credentials : true
}))

app.use(cookieParser())
app.use(express.json())
//authentication 
app.use('/api/auth',AuthRouter )

//admin 
const adminProductRoute = require('./routes/admin/productRoutes')
app.use('/api/admin/product',adminProductRoute)

//shope
const shopeProductsRoute = require('./routes/shop/productRoute')
app.use('/api/shop/products',shopeProductsRoute)

//cart 
const shopeCartRoute = require('./routes/shop/CartRoute')
app.use('/api/shop/cart',shopeCartRoute)

//shop address Router
const shopeAddressRoute = require('./routes/shop/AddressRoute')
app.use('/api/shop/address', shopeAddressRoute)

// shope payment
const shopeOrderRoute = require('./routes/shop/OrderRoute')
app.use('/api/shop/order',shopeOrderRoute)

app.listen(PORT, ()=>{
    console.log(`server is now running on port ${PORT}`);
})