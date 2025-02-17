const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Simpan file di folder 'uploads/'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
    }
});

// Filter file yang diperbolehkan
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar (JPEG, PNG, JPG) yang diperbolehkan!'), false);
    }
};

// Inisialisasi middleware multer
const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // Maksimal 2MB
});

module.exports = upload;
