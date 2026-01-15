class GhibliAPI {
    constructor(baseUrl = "https://ghibliapi.vercel.app/films") {
        this.baseUrl = baseUrl;
        this.cache = null;
    }

    async getFilms() {
        if (this.cache) return this.cache;
        const res = await fetch(this.baseUrl);
        if (!res.ok) throw new Error("Error al obtener films");
        const data = await res.json();
        this.cache = data;
        return data;
    }

    async listarTitulosYDirectores() {
        const films = await this.getFilms();
        console.table(films.map(f => ({ Título: f.title, Director: f.director })));
        this.renderizar(films, "dir");
    }

    async listarTitulosYAnio() {
        const films = await this.getFilms();
        console.table(films.map(f => ({ Título: f.title, Año: f.release_date })));
        this.renderizar(films, "anio");
    }

    async filtrarPorAnio() {
        const anioInput = prompt("Ingrese un año (YYYY):");
        const anio = parseInt(anioInput, 10);
        if (Number.isNaN(anio)) return alert("Año inválido");

        const films = await this.getFilms();
        const filtrados = films.filter(f => parseInt(f.release_date, 10) === anio);
        console.table(filtrados);
        this.renderizar(filtrados, "filtro");
    }

    async listarTitulosYDescripcion() {
        const films = await this.getFilms();
        console.table(films.map(f => ({ Título: f.title, Descripción: f.description.substring(0, 50) + "..." })));
        this.renderizar(films, "desc");
    }

    async listarIds() {
        const films = await this.getFilms();
        console.table(films.map(f => ({ Título: f.title, ID: f.id })));
        this.renderizar(films, "id");
    }

    renderizar(peliculas, modo) {
        const salida = document.getElementById("salida-visual");
        salida.innerHTML = ""; 
        if (peliculas.length === 0) {
            salida.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        peliculas.forEach(p => {
            const card = document.createElement("div");
            card.className = "film-card";

            card.innerHTML = `
                <img src="${p.image}" alt="${p.title}">
                <div class="info">
                    <h4>${p.title}</h4>
                    <p><strong>Año:</strong> ${p.release_date}</p>
                    <p><strong>Director:</strong> ${p.director}</p>
                    ${modo === 'desc' ? `<p class="desc">${p.description}</p>` : ''}
                    ${modo === 'id' ? `<p class="id-text">ID: ${p.id}</p>` : ''}
                </div>
            `;
            salida.appendChild(card);
        });
    }
}

const api = new GhibliAPI();