const Product = require('../models/product');

const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    const { name, size, price,variants } = req.body;
    try {
        const product = new Product({ name, size, price,
            variants:variants || []
         });
        await product.save();
        res.status(201).json(product); // send the saved product
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findProductById = async (req, res) => {
    
    try {
        const product = await Product.findById(req.params.id)
      if(!product) return res.status(404).json({message:"Product Not Found"})
   
    res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//update product

const updateProduct=async(req,res)=>{
 try {
    const updatedProduct=await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
     if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

//delete product

const deleteProduct=async(req,res)=>{
    try {
        const removed=await Product.findByIdAndDelete(req.params.id);
        if(!removed) res.status(404).json({message:"Product not found"})
        res.json({message:"Product deleted successfully"});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const addProductVaraint=async(req,res)=>{
    const {size,price,stock}=res.body;
    try {
        const product=await Product.findById(req.params.id)
        if(!product) return res.status(404).json({message:"product not found"})
        
        product.variants.push({size,stock,price})
        await product.save();
        res.json(product);
    } catch (error) {
          res.status(400).json({message:error.message}) 
    }
}

module.exports = { 
     getProduct,
     createProduct,
     updateProduct,
     deleteProduct,
     findProductById,
     addProductVaraint
     };
