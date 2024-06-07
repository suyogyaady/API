

const router = require('express').Router();
const productController = require('../controllers/productControllers')


router.post('/create', productController.createProduct)

// fetch all products
router.get('/get_all_products', productController.getAllProducts)

// fetch single products
router.get('/get_single_products/:id', productController.getSingleProduct)

//delete product
router.delete('/delete_product/:id',productController.deleteProduct)

//update product
router.put('/update_product/:id',productController.updateProduct)

module.exports = router
   
