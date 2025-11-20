const express = require('express');
const router = express.Router();
const {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    addProductVaraint,
}=require('../controllers/productController')

router.get('/',getProduct)
router.get('/:id',findProductById)
router.post('/',createProduct);
router.put('/:id',updateProduct)
router.post('/:id',addProductVaraint)
router.delete('/:id',deleteProduct)
module.exports = router;