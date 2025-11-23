const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require("./routes/cartRoutes")
const cookieParser = require('cookie-parser');



dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes);


app.use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
