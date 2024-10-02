const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/product");

const handleImageUpload = async(req, res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64'); 
        const url = 'data:'+ req.file.mimetype+";base64,"+b64
        const result = await imageUploadUtil(url)
        res.status(200).json({
            success : true,
            result : result
        })
       

    } catch (error) {
        res.status(400).json({
            success : false,
            message : 'Error occured '
        })
    }
}

// Add a new Product 
const addProduct = async(req,res)=>{
    try {
        const {image, title, description, category, brand, price, salePrice,totalStock } = req.body
        const newlyCreatedProduct = new Product({
            image, title, description, category, brand, price, salePrice,totalStock
        })

        await newlyCreatedProduct.save()
        res.status(200).json({
            success : true,
            data : newlyCreatedProduct,
            message : 'Product is added succesfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : " Error occured"
        })
    }
}

//fetch all product
const fetchaddProduct = async(req,res)=>{
    try {
        const listofProduct = await Product.find({})
        res.status(200).json({
            success : true,
            data: listofProduct,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : " Error occured he ami ene"
        })
    }
}


//edit a product
const editaddProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const {image, title, description, category, brand, price, salePrice,totalStock } = req.body

        let findProduct = await Product.findById(id)
        if(!fetchaddProduct){
            return res.status(400).json({
                success: false,
                message : "Product not found"
            })
        }
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price === ' '? 0 : price || findProduct.price
        findProduct.salePrice = salePrice === ' '? 0 : salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock === '' ? 0 : salePrice || findProduct.totalStock
        findProduct.image = image || findProduct.image

        await findProduct.save()
        res.status(200).json({
            success : true,
            data : findProduct
        })        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : " Error occured"
        })
    }
}


//delete a product 
const DeletedProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message : "Product is Deleted succesfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : " Error occured"
        })
    }
}

module.exports ={ handleImageUpload, addProduct, fetchaddProduct,editaddProduct,DeletedProduct}