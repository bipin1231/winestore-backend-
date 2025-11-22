const mongoose = require('mongoose');
const product = require('./product');

const cartSchema=new mongoose.Schema({
    user:{
       type:mongoose.Schema.ObjectId,
       ref:'User',
       required:true,
       unique:true,
    },
    items:[cartItemsSchema],
    totalPrice:{type:Number}

})

const cartItemsSchema=new mongoose.Schema({
   product:{
    type:mongoose.Schema.ObjectId,
    ref:"Product",
    required:true
   },
   variant:{
    type:mongoose.Schema.ObjectId,
   },
   quantity:{
    type:Number,
    required:true,
    min:1
   },
   price:{
    type:Number,
    required:true,
   },
   image:{
    type:string
   },
   totalPrice:{type:Number}

})
module.exports=mongoose.model("Cart",cartSchema)