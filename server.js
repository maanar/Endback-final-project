// to run : npm run server
//git commit -m 'Initial commit'
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const mongoose = require('mongoose');
const path = require("path");


//routes
/*
const authRoutes =require('./routes/api/auth');
const productRoutes =require('./routes/api/product');
const profileRoutes = require('./routes/api/profile');
const userRoutes =require('./routes/api/users');
*/
//Connect to database
connectDB();

//init middleware // it allow us to get the data in request stop body
app.use(express.json({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "uploads")))

app.get('/', (req, res) => res.send('Welcome FRAISCH WEBSITE ☺♥'));


/*
app.use('/users', userRoutes);
app.use('/auth',  authRoutes);
app.use('/profile', profileRoutes);  
app.use('/product' , productRoutes);

*/


//define routes to make requist
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));


app.get("/api/products", async (req, resp) => {
  try {
    const {key,product_name}=req.query
    const search = key
      ? {
          $or: [
            { product_nam: { $regex: key, $options: '$i' } },
            { category: { $regex: key, $options: '$i' } },
          ]
        }
      : {}
    const data = await Products.find(search)
    res.json({ data })
  }
  catch (error) {
    console.log(error)
  }
  
 })
 

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
