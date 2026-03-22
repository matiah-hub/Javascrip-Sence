const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /image\/(jpeg|png|webp).*/;
    const mimetypes = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
    if (mimetypes && extname) {
        return cb(null, true);
    }
    cb(new Error("Solo se permiten archivos de imagen jpg, png , jpeg webp"), ok);
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});


