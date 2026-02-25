module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Respuesta genérica (no exponemos detalles internos)
  res.status(500).json({
    error: "Error interno del servidor.",
  });
};