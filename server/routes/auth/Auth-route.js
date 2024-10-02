const express = require('express');

const router = express.Router();


//register user
const { registerUser, loginUser, authMiddleware, logoutUser } = require('../../controllers/Auth/AuthControler');
router.post('/register',registerUser)

//login user 
router.post('/login',loginUser)

//logout user
router.post('/logout', logoutUser)

//auth middleware 
router.get('/check-auth', authMiddleware, (req, res)=>{
    const user = req.user
    res.status(200).json({
        success : true,
        message : 'Authenticated user',
        user
    })
})

module.exports = router