const Cart = require("../models/cart")
const User = require("../models/user")
const Product = require("../models/product")

const addToCart = async (req, res) => {

  try {

    const { userId, variantId, quantity, productId } = req.body;
    console.log(userId);


    let user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "user not found" })

    }
    const product = await Product.findOne(
      { "variants._id": variantId },
      { "variants.$": 1, name: 1 }
    );


    if (!product) {
      return res.status(404).json({ message: "product not found" })

    }
    console.log(product);


    let cart = await Cart.findOne({ user: userId })



    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: []
      })
    }

    const existingItem = cart.items.find(i => i.variantId?.toString() === variantId)

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        variantId,

        price: product.variants.price
      })
    }
    await cart.save();
    res.json(cart);
  

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updateCartItemQuantiy=async(req,res)=>{
  try{
    const {cartItemId,quantity}=req.body

    let cart=await Cart.findOne(
     {"items._id":cartItemId},
     {"items.$":1,name:1}
    )
    if(!cart){
return res.status(404).json({message:"cart not found"})
    }
    cart.items.quantity +=quantity

    await cart.save()
    res.json(cart);
  }catch(error){
    res.status(500).res({message:error.message})
  }
}

module.exports = { addToCart ,updateCartItemQuantiy}