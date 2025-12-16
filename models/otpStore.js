const mongoose=require("mongoose")

const otpSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    otp:{type:String}
})

module.exports=mongoose.model("OptStore",otpSchema)