const cloudinary = require("cloudinary").v2
const multer = require('multer')


cloudinary.config({
    cloud_name : 'dpn0fjl8h',
    api_key : '854551483526131',
    api_secret : 'NWc_2OALhAXCBceQ20G3tGxOnck'
})

const storage = new multer.memoryStorage()

const imageUploadUtil = async(file)=> {
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    })
    return result
}
const upload = multer({storage})
module.exports = {upload , imageUploadUtil}