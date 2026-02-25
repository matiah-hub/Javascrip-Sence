const express = require("express");
const path = require("path");
const mascotasRoutes = require("./routes/mascotas.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// Parse JSON body
app.use(express.json());

// Servir frontend estático
app.use(express.static(path.join(__dirname, "../public")));

// API
app.use("/api/mascotas", mascotasRoutes);

// Fallback simple: si entran a /, sirve index.html (ya lo hace express.static)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Manejo de errores al final
app.use(errorMiddleware);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`);
});