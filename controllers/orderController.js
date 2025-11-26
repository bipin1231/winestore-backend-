const Order = require("../models/order");
const User = require("../models/user");
const Product = require("../models/product");
const mongoose = require("mongoose");

const placeOrder = async (req, res) => {
  try {
    const { userId, orderItems } = req.body;
    console.log(req.body);


    // Validate user
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create order
    let order = await Order.create({ user: user._id, orderItems: [] });
    let orderItemToPush = [];


    for (const item of orderItems) {
      if (!mongoose.Types.ObjectId.isValid(item.variantId)) continue;

      const product = await Product.findOne(
        { "variants._id": item.variantId },
        { "variants.$": 1 }
      );

      if (!product) continue;

      const variant = product.variants[0];
      console.log(variant);

      orderItemToPush.push({
        product: product._id,
        variantId: variant._id,
        price: Number(variant.price),
        quantity: Number(item.quantity),
        totalPrice: Number(variant.price) * Number(item.quantity),
        productId: product._id
      });
    }

    console.log(orderItemToPush);

    order.orderItems = orderItemToPush;
    await order.save();

    return res.json(order);
    // return res.json({message:orderItemToPush})
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllOrder=async (req,res)=>{
  try {
    const orderData=await Order.find();
    if(orderData) return res.status(200).json(orderData);
    return res.status(404).json({message:"no order found"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = { placeOrder ,getAllOrder};
