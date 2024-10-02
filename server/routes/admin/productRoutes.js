const express = require('express')

const { upload } = require('../../helpers/cloudinary')
const {handleImageUpload , addProduct, fetchaddProduct, editaddProduct, DeletedProduct} = require('../../controllers/admin/productController')
const router = express.Router()

router.post('/upload-image', upload.single('my_file'), handleImageUpload)
router.post('/add', addProduct)
router.put('/edit/:id', editaddProduct)
router.delete('/delete/:id', DeletedProduct)
router.get('/get', fetchaddProduct)

module.exports = router