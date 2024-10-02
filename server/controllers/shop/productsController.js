const Product = require('../../models/product')

const getfilterProducts = async(req, res) => {
    try {
        const {category =[] , brand=[], sortBy ='price-lowtohigh'} = req.query

        let filters = {}

        if(category.length){
            filters.category = {$in : category.split(',')}
        }

        if(brand.length){
            filters.brand = {$in : brand.split(',')}
        }
        let sort = {}
        switch(sortBy){
            case  'price-lowtohigh': 
                sort.price = 1
                break;
            case  'price-hightolow': 
                sort.price = -1
                break;
            case  'title-atoz': 
                sort.title = 1
                break;
            case  'title-ztoa': 
                sort.title = -1
                break;
            default :
                sort.price = 1
                break
        }
        const product = await Product.find(filters).sort(sort)

        res.status(200).json({
            success : true,
            data : product
        })
    } catch (error) {
       console.log(error);
        res.status(400).json({
            success : false,
            message : 'Some thing is wrong'
        })
    }
}


const getProductDetails = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id) 
        if(!product){
            res.status(200).json({
                success : false,
                message : 'product not found'
            })
        }
        res.status(200).json({
            success:true,
            data: product
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message : 'Some thing is getProduct card'
        })
    }
}

module.exports = {getfilterProducts, getProductDetails}