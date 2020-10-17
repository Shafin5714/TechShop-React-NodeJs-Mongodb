const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const products = require('../data/products')
const Product =require('../models/productModel')



// Fetch all products  GET api/products
router.get('/',asyncHandler( async(req,res)=>{
    const products =await Product.find({})
   return res.json(products)

}))


// Fetch single product  GET /api/products/:id
router.get('/:id',asyncHandler( async(req,res)=>{
    const product =await Product.findById(req.params.id)
    if(product){
       return res.json(product)
    }
//    res.status(404).json({message:"Product not found"})
        res.status(404)
        throw new Error('Product not found')
}))


module.exports = router