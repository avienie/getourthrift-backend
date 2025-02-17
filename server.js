const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
const upload = require('./middlewares/upload');

mongoose.connect('mongodb://127.0.0.1:27017/thriftDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Databse Connected"))
  .catch(err => console.log("Database Connection Error:", err));

app.use(express.json()); // Middleware untuk parsing JSON
app.use('/api/products', productRoutes); // Pastikan route di-mount dengan benar

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
