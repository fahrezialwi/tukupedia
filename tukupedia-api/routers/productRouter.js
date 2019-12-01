let express = require('express')
let router = express.Router()
const { productController } = require('../controllers')

router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getProductById)
router.post('/products', productController.createProduct)
router.patch('/products/:id', productController.editProduct)
router.delete('/products/:id', productController.deleteProduct)

module.exports = router