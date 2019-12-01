let express = require('express')
let router = express.Router()
const { cartController } = require('../controllers')

router.get('/carts', cartController.getCarts)
router.get('/carts/:id', cartController.getCartById)
router.post('/carts', cartController.createCart)
router.patch('/carts/:id', cartController.editCart)
router.delete('/carts/:id', cartController.deleteCart)

module.exports = router