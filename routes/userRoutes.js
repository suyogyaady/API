const router = require('express').Router();
const userController = require('../controllers/userControllers')

// Creating user registration route
router.post('/create', userController.createUser)

// Creating login route
router.post('/login', userController.loginUser)

//forgot password
router.post('/forgot_password', userController.forgotPassword)




// exporting the routerr
module.exports = router

