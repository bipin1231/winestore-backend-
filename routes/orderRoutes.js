const {placeOrder,getAllOrder}=require("../controllers/orderController")
const express=require("express")
const router=express.Router()

router.post("/",placeOrder)
router.get("/",getAllOrder)


module.exports=router