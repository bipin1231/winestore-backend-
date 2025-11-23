const mongoose=require("mongoose");

const orderItem=mongoose.Schema({
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
        unique:true,
     },
     totalPrice:{
        type:Number
     }
}, { timestamps: true })

module.exports=mongoose.model("Order",orderSchema)