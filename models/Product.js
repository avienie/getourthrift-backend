const mongoose = require('mongoose');
const upload = require('../middlewares/upload');

// ✅ Upload gambar produk
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'Gagal upload gambar' });
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Product', ProductSchema);
