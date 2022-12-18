// to run : npm run server
//git commit -m 'Initial commit'
const express = require('express');

const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

//init middleware
// app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Welcome FRAISCH WEBSITE ☺♥'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
