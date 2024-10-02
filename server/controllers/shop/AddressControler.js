const Address = require('../../models/AddresModel')

const addAddress = async(req, res) =>{
    try {
        const {userId, address, city, pincode, phone, notes} = req.body
        
        if(!userId || !address || !city || !pincode || !phone || !notes ){
            return res.status(400).json({
                success : false,
                message : 'Invalid data provided ene'
            })
        }

        const newlyCreatedAddress = new Address({
            userId, address, city, pincode, phone, notes
        })

        await newlyCreatedAddress.save()
        res.status(200).json({
            success : true,
            data : newlyCreatedAddress
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message: "Eorr  in Address add"
        })
    }
}

const fetchAddress = async(req, res) =>{
    try {
        const {userId} = req.params
        if(!userId ){
            return res.status(400).json({
                success : false,
                message : 'userId is requird'
            })
        }
        const address = await Address.find({userId})
        res.status(200).json({
            success : true,
            data : address
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message: "Eorr  in Address add"
        })
    }
}

const editAddress = async(req, res) =>{
    try {
        const {userId, addressId} = req.params
        const formdata = req.body

        if(!userId || !addressId){
            return res.status(400).json({
                success : false,
                message : "User id and address id is required"
            })
        }
        const address = await Address.findOneAndUpdate({
            _id : addressId, userId
        },formdata ,{new :true})

        if(!address){
            return res.status(400).json({
                success : false,
                message : "Address not found"
            })
        }
        res.status(200).json({
            success : true,
            data : address
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message: "Eorr  in Address add"
        })
    }
}

const deleteAddress = async(req, res) =>{
    try {
        const {userId, addressId} = req.params
       
        if(!userId || !addressId){
            return res.status(400).json({
                success : false,
                message : "User id and address id is required"
            })
        }

        const address = await Address.findOneAndDelete({_id :addressId, userId})
        if(!address){
            return res.status(400).json({
                success : false,
                message : "Address is not found"
            })
        }
        res.status(200).json({
            success : true,
            message : "Address is deleted successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success : false,
            message: "Eorr  in Address add"
        })
    }
}

module.exports = {
    addAddress,
    fetchAddress,
    editAddress,
    deleteAddress
}