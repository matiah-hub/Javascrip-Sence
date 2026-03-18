const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const upload_dir = path.join(__dirname, 'uploads');
if (!fs.existsSync(upload_dir)) fs.mkdirSync(upload_dir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, file, cb) => { cb(null, upload_dir); },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ok = /image\/(jpeg|png|gif).*/.test(file.mimetype);
    cb(ok ? null : new Error("Solo se permiten archivos de imagen, solo jpg, png y gif"), ok);
}

const upload = multer({
    storage,
    limits: { filesize: 1024 * 1024 * 5 }, //5mb
    fileFilter,
});

app.use(express.static(path.join(__dirname, "public"))); //archivos estaticos   
app.use('/uploads', express.static(upload_dir));

app.post('/upload', upload.single('foto'), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No se subio ningun archivo");
    }
    res.status(201).json({
        ok: true,
        mensaje: 'imagen subida correctamente',
        archivo: req.file.filename,
        ruta: `/uploads/${req.file.filename}`
    });
});

//errores basicos
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ ok: false, mensaje: err.message });
    }
    if (err) {
        return res.status(415).json({ ok: false, mensaje: err.message });
    }
    res.status(500).json({ ok: false, mensaje: 'error interno del servidor' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});





