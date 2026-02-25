const repo = require("../repositories/mascotas.repository");

// helpers simples de validación
function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

exports.getMascotas = async (req, res, next) => {
  try {
    const { nombre, rut } = req.query;
    const mascotas = await repo.readAll();

    // Si vienen ambos, mejor forzar a escoger uno para evitar ambigüedad
    if (isNonEmptyString(nombre) && isNonEmptyString(rut)) {
      return res.status(400).json({
        error: "Usa solo uno: nombre o rut (no ambos).",
      });
    }

    // GET sin parámetros: todas
    if (!isNonEmptyString(nombre) && !isNonEmptyString(rut)) {
      return res.status(200).json(mascotas);
    }

    // GET con parámetro nombre: 1 mascota (si existe)
    if (isNonEmptyString(nombre)) {
      const found = mascotas.find(
        (m) => m.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );
      if (!found) {
        return res.status(404).json({ error: "Mascota no encontrada." });
      }
      return res.status(200).json(found);
    }

    // GET con parámetro rut: todas las mascotas del dueño
    const filtered = mascotas.filter(
      (m) => m.rut.trim() === rut.trim()
    );
    return res.status(200).json(filtered);
  } catch (err) {
    next(err);
  }
};

exports.createMascota = async (req, res, next) => {
  try {
    const { nombre, rut } = req.body;

    if (!isNonEmptyString(nombre) || !isNonEmptyString(rut)) {
      return res.status(400).json({
        error: "nombre y rut son obligatorios (string no vacío).",
      });
    }

    const mascotas = await repo.readAll();

    // regla simple: nombre único (para que DELETE por nombre tenga sentido)
    const exists = mascotas.some(
      (m) => m.nombre.toLowerCase() === nombre.trim().toLowerCase()
    );
    if (exists) {
      return res.status(409).json({
        error: "Ya existe una mascota con ese nombre.",
      });
    }

    const newMascota = { nombre: nombre.trim(), rut: rut.trim() };
    mascotas.push(newMascota);

    await repo.writeAll(mascotas);

    return res.status(201).json(newMascota);
  } catch (err) {
    next(err);
  }
};

exports.deleteMascota = async (req, res, next) => {
  try {
    const { nombre, rut } = req.query;

    if (isNonEmptyString(nombre) && isNonEmptyString(rut)) {
      return res.status(400).json({
        error: "Usa solo uno: nombre o rut (no ambos).",
      });
    }

    if (!isNonEmptyString(nombre) && !isNonEmptyString(rut)) {
      return res.status(400).json({
        error: "Debes enviar nombre o rut para eliminar.",
      });
    }

    const mascotas = await repo.readAll();

    // DELETE con parámetro nombre: elimina 1 (si existe)
    if (isNonEmptyString(nombre)) {
      const idx = mascotas.findIndex(
        (m) => m.nombre.toLowerCase() === nombre.trim().toLowerCase()
      );
      if (idx === -1) {
        return res.status(404).json({ error: "Mascota no encontrada." });
      }

      const deleted = mascotas.splice(idx, 1)[0];
      await repo.writeAll(mascotas);
      return res.status(200).json({ deleted });
    }

    // DELETE con parámetro rut: elimina todas las del rut
    const before = mascotas.length;
    const remaining = mascotas.filter((m) => m.rut.trim() !== rut.trim());
    const removedCount = before - remaining.length;

    await repo.writeAll(remaining);

    return res.status(200).json({
      rut: rut.trim(),
      removedCount,
    });
  } catch (err) {
    next(err);
  }
};