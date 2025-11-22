const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  // variantId: { type: String, required: true }, 
  size: { type: String},
  price: { type: Number, min: 0 },
  stock: { type: Number, default: 0 },
  images: [{ type: String }],  
}); 

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  category: { type: String},

  variants: [variantSchema],   

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
