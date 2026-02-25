const fs = require("fs/promises");
const path = require("path");

const DB_PATH = path.join(__dirname, "../../data/mascotas.json");

async function readAll() {
  try {
    const content = await fs.readFile(DB_PATH, "utf-8");
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    // Si el archivo no existe, devolvemos [] (útil para principiantes)
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(mascotas) {
  // Escritura “bonita” para que los alumnos puedan leer el JSON
  const json = JSON.stringify(mascotas, null, 2);
  await fs.writeFile(DB_PATH, json, "utf-8");
}

module.exports = {
  readAll,
  writeAll,
};