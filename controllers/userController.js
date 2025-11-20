const User = require('../models/user');


const loginUser=async (req,res) => {
console.log(req.body);

  const {email,password}=req.body;

  try {
    const user =await User.findOne({email});
    if(!user) return res.status(404).json({message:"Invalid email"});

    const isMatch=await user.matchPassword(password);
     if(!isMatch) return res.status(404).json({message:"Invalid password"});

     res.json({message:"logged in successfully"});


  } catch (error) {
       res.status(500).json({ message: error.message });
  }
  
}

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getUsers, createUser,

  loginUser
 };
