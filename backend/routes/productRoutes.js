const express = require('express')
const router = express.Router()
const { getProducts,getProductById } = require('../controllers/productController')



// Fetch all products  GET api/products
router.route('/').get(getProducts)


// Fetch single product  GET /api/products/:id
router.route('/:id').get(getProductById)


module.exports = router