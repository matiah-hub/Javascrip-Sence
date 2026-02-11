const base = "https://pokeapi.co/api/v2/pokemon/";
const ids = Array.from({ length: 9 }, (_, i) => i + 1);
let pokemonCache = [];

async function obtenerPokemon(id) {
    const res = await fetch(`${base}${id}`);
    if (!res.ok) throw new Error("Error de red");
    return res.json();
}

async function cargarPokedex() {
    try {
        mostrarCargando(true);
        const data = await Promise.all(ids.map(obtenerPokemon));
        pokemonCache = data;
        renderCards(data);
    } catch (e) {
        mostrarError("No fue posible obtener datos de la PokeAPI. Intenta nuevamente.");
    } finally {
        mostrarCargando(false);
    }
}

function renderCards(lista) {
    const grid = document.querySelector("#grid");
    grid.innerHTML = "";
    lista.forEach(p => {
        const idFormateado = `#${String(p.id).padStart(3, "0")}`;
        const sprite = p.sprites?.other?.["official-artwork"]?.front_default;
        const tipos = p.types.map(t => t.type.name);

        grid.insertAdjacentHTML("beforeend", `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${sprite}" class="card-img-top p-4" alt="${p.name}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title text-capitalize mb-0">${p.name}</h5>
                            <span class="text-muted small">${idFormateado}</span>
                        </div>
                        <div class="mb-3">
                            ${tipos.map(t => `<span class="badge bg-light text-secondary me-1 text-uppercase">${t}</span>`).join("")}
                        </div>
                        <button class="btn btn-primary btn-sm w-100" onclick="verDetalle(${p.id})">Ver más</button>
                    </div>
                </div>
            </div>
        `);
    });
}

async function verDetalle(id) {
    const p = pokemonCache.find(poke => poke.id === id);
    const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    
    document.getElementById('modalNombre').textContent = p.name;
    document.getElementById('modalId').textContent = `#${String(p.id).padStart(3, "0")}`;
    document.getElementById('modalImg').src = p.sprites?.other?.["official-artwork"]?.front_default;
    document.getElementById('modalAltura').textContent = p.height / 10;
    document.getElementById('modalPeso').textContent = p.weight / 10;
    document.getElementById('modalTipos').innerHTML = p.types.map(t => 
        `<span class="badge bg-primary text-uppercase me-1">${t.type.name}</span>`
    ).join("");
    document.getElementById('modalDesc').textContent = "Cargando descripción...";

    modal.show();

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const species = await res.json();
        const texto = species.flavor_text_entries.find(e => e.language.name === "es")?.flavor_text || "Sin descripción.";
        document.getElementById('modalDesc').textContent = texto.replace(/\f/g, ' ');
    } catch (e) {
        document.getElementById('modalDesc').textContent = "Error al cargar descripción.";
    }
}

function mostrarCargando(on) { document.getElementById("loader").hidden = !on; }
function mostrarError(msg) {
    const a = document.getElementById("alert");
    a.textContent = msg; a.hidden = false;
}

document.getElementById("busqueda").addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    renderCards(pokemonCache.filter(p => p.name.includes(term)));
});

document.addEventListener("DOMContentLoaded", cargarPokedex);