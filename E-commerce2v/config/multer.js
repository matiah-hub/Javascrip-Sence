const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        // Unificamos a la carpeta public/uploads/
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    // Corregido: se elimina la variable inexiste 'ok' y se mejora el mensaje
    cb(new Error("Solo se permiten archivos de imagen: jpg, png, jpeg, webp"));
};

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
