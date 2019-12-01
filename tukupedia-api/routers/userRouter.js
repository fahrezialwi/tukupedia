let express = require('express')
let router = express.Router()
const { userController } = require('../controllers')

router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.post('/users', userController.createUser)
router.get('/login', userController.loginUser)

module.exports = router