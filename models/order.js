const mongoose=require("mongoose");

const orderItemSchema=mongoose.Schema({
    product:{
      type:mongoose.Schema.ObjectId,
      ref:"Product",
      required:true
     },
    variantId:{
        type:mongoose.Schema.ObjectId,
    },
    price:{
        type:Number
    },
    totalPrice:{
        type:Number
    }
})

const orderSchema=mongoose.Schema({
   user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
     },
     totalPrice:{
        type:Number
     },
     orderItems:[orderItemSchema]
}, { timestamps: true })

module.exports=mongoose.model("Order",orderSchema)