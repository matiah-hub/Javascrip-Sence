const out = document.getElementById("out");
const msgOk = document.getElementById("msgOk");
const msgError = document.getElementById("msgError");

// Función para mostrar mensajes de éxito
function showOk(text) {
  msgOk.style.display = "block";
  msgError.style.display = "none";
  msgOk.textContent = text;
}

// Función para mostrar errores (Capa de captura exigida por la pauta)
function showError(text) {
  msgError.style.display = "block";
  msgOk.style.display = "none";
  msgError.textContent = text;
}

// Función para listar las mascotas de forma limpia
function renderTable(data) {
  // Si es un objeto solo (busqueda por nombre), lo metemos en un array
  const list = Array.isArray(data) ? data : [data];
  
  if (list.length === 0 || !list[0]) {
    out.innerHTML = "<em>No se encontraron registros.</em>";
    return;
  }

  // cambio en la forma de mostrar los datos, ahora con formato de lista para mejor legibilidad
  let html = "<ul>";
  list.forEach(m => {
    html += `<li><strong>Mascota:</strong> ${m.nombre} | <strong>Dueño (RUT):</strong> ${m.rut}</li>`;
  });
  html += "</ul>";
  out.innerHTML = html;
}

function handleAxiosError(err) {
  if (err.response) {
    const { status, data } = err.response;
    showError(`Error ${status}: ${data?.error ?? "Error en la operación"}`);
    return;
  }
  showError("Error de conexión: No se pudo contactar al Ministerio.");
}

// 1. GET Todas
const fetchAll = async () => {
  try {
    const res = await axios.get("/api/mascotas");
    showOk("Registros actualizados.");
    renderTable(res.data);
  } catch (err) {
    handleAxiosError(err);
  }
};

document.getElementById("btnAll").onclick = fetchAll;

// 2. GET por Nombre
document.getElementById("btnByNombre").onclick = async () => {
  try {
    const nombre = document.getElementById("qNombre").value.trim();
    const res = await axios.get("/api/mascotas", { params: { nombre } });
    showOk("Búsqueda finalizada.");
    renderTable(res.data);
  } catch (err) {
    handleAxiosError(err);
  }
};

// 3. POST Crear (Ahora limpia los campos y actualiza la lista sola)
document.getElementById("btnCreate").onclick = async () => {
  try {
    const nombre = document.getElementById("cNombre").value.trim();
    const rut = document.getElementById("cRut").value.trim();
    await axios.post("/api/mascotas", { nombre, rut });
    
    // Feedback visual
    showOk(`¡${nombre} ha sido registrado con éxito!`);
    
    // Limpiamos los inputs
    document.getElementById("cNombre").value = "";
    document.getElementById("cRut").value = "";
    
    // Actualizamos la lista automáticamente sin necesidad de recargar la página
    fetchAll();
  } catch (err) {
    handleAxiosError(err);
  }
};

// 4. DELETE por Nombre
document.getElementById("btnDelNombre").onclick = async () => {
  try {
    const nombre = document.getElementById("dNombre").value.trim();
    await axios.delete("/api/mascotas", { params: { nombre } });
    showOk("Mascota eliminada del registro.");
    fetchAll();
  } catch (err) {
    handleAxiosError(err);
  }
};

// 5. DELETE por RUT
document.getElementById("btnDelRut").onclick = async () => {
  try {
    const rut = document.getElementById("dRut").value.trim();
    await axios.delete("/api/mascotas", { params: { rut } });
    showOk("Todos los registros asociados al RUT han sido eliminados.");
    fetchAll();
  } catch (err) {
    handleAxiosError(err);
  }
};