const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const products = [
    { id: 1, name: "Kaos Thrift", price: 50000},
    { id: 2, name: "Celana Jeans", price: 75000},
]

// Endpoint GET semua produk
router.get('/', (req, res) => {
    res.json(products);
});

// Endpoint GET produk berdasarkan ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.json(product);
});

// Endpoint POST untuk menambahkan produk baru
router.post('/', (req, res) => {
    const { name, price } = req.body;
    
    if (!name || !price) {
        return res.status(400).json({ message: "Nama dan harga harus diisi" });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Endpoint PUT untuk update produk berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    if (name) product.name = name;
    if (price) product.price = price;

    res.json({ message: "Produk berhasil diperbarui", product });
});

// Endpoint DELETE untuk menghapus produk berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    products.splice(index, 1);
    res.json({ message: "Produk berhasil dihapus" });
});

// Endpoint upload
router.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({ message: 'Upload berhasil!', file: req.file });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
