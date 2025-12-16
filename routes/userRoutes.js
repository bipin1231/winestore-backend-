const express = require('express');
const router = express.Router();
const { getUsers, createUser ,loginUser} = require('../controllers/userController');

const {protect,admin}=require("../middlewares/authMiddleware")
const upload = require('../config/imageUpload');

// //protect thr routes
// router.get('/',protect,admin, getUsers);
router.get('/', getUsers);
router.post('/signuo', createUser);
router.post('/login',loginUser)

module.exports = router;
