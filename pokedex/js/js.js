const base = "https://pokeapi.co/api/v2/pokemon/";
const ids = Array.from({ length: 9 }, (_, i) => i + 1); 
let pokemonCache = []; 
async function obtenerPokemon(id) {
    const res = await fetch(`${base}${id}`);
    if (!res.ok) throw new Error("Error al conectar con PokeAPI");
    return res.json();
}

async function cargarPokedex() {
    try {
        mostrarCargando(true);
        const data = await Promise.all(ids.map(obtenerPokemon));
        pokemonCache = data;
        renderCards(data);
    } catch (e) {
        mostrarError("Error de red: no fue posible obtener datos de la PokeAPI. Intenta nuevamente.");
    } finally {
        mostrarCargando(false);
    }
}

function renderCards(lista) {
    const grid = document.querySelector("#grid");
    grid.innerHTML = "";

    lista.forEach(p => {
        const nombre = p.name;
        const idFormateado = `#${String(p.id).padStart(3, "0")}`; 
        const sprite = p.sprites?.other?.["official-artwork"]?.front_default || p.sprites?.front_default;
        const tipos = p.types.map(t => t.type.name);

        const cardHTML = `
            <div class="col-12 col-sm-6 col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <div class="bg-light p-4 d-flex justify-content-center">
                        <img src="${sprite}" class="card-img-top w-75" alt="${nombre}">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title text-capitalize fw-bold mb-0">${nombre}</h5>
                            <span class="badge rounded-pill bg-dark text-white">${idFormateado}</span>
                        </div>
                        <div class="mt-3">
                            ${tipos.map(t => `<span class="badge bg-primary me-1 text-uppercase">${t}</span>`).join("")}
                        </div>
                        <button class="btn btn-outline-primary btn-sm w-100 mt-4">Ver más</button>
                    </div>
                </div>
            </div>
        `;
        grid.insertAdjacentHTML("beforeend", cardHTML);
    });
}

function mostrarCargando(on) {
    document.getElementById("loader").hidden = !on;
}

function mostrarError(msg) {
    const a = document.getElementById("alert");
    a.textContent = msg;
    a.hidden = false;
}

document.getElementById("busqueda").addEventListener("input", (e) => {
    const termino = e.target.value.toLowerCase();
    const filtrados = pokemonCache.filter(p => p.name.includes(termino));
    renderCards(filtrados);
});

document.addEventListener("DOMContentLoaded", cargarPokedex);