const url = 'https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10';

let cachePersonajes = null;


function obtenerPersonajes() {
    const elDiv = document.getElementById('lista-personajes');
    
    if (cachePersonajes) {
        console.log("Cargando desde memoria local...");
        renderizarLista(cachePersonajes);
    } else {
        console.log("Consultando API...");
        fetch(url)
            .then(res => res.json())
            .then(datos => {
                cachePersonajes = datos;
                renderizarLista(datos);
            })
            .catch(err => console.error("Error al obtener datos:", err));
    }
}

function renderizarLista(personajes) {
    const elDiv = document.getElementById('lista-personajes');
    elDiv.innerHTML = ""; 
    
    personajes.forEach(element => {
        let div = document.createElement('div');
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.marginBottom = "10px";

        let img = document.createElement('img');
        img.src = element.image;
        img.style.width = "60px";
        img.style.marginRight = "10px";

        let span = document.createElement('span');
        span.innerHTML = `<strong>ID: ${element.id}</strong> - ${element.name} (${element.species})`;

        div.appendChild(img);
        div.appendChild(span);
        elDiv.appendChild(div);
    });
}


function agruparPorEspecie() {
    if (!cachePersonajes) {
        alert("Carga los personajes primero");
        return;
    }
    const elDiv = document.getElementById('agrupacion-especie');
    elDiv.innerHTML = "<h3>Agrupación por Especie</h3>";

    const grupos = cachePersonajes.reduce((acc, p) => {
        acc[p.species] = acc[p.species] || [];
        acc[p.species].push(p.name);
        return acc;
    }, {});

    for (let especie in grupos) {
        let h4 = document.createElement('h4');
        h4.innerText = especie;
        let ul = document.createElement('ul');
        grupos[especie].forEach(n => {
            let li = document.createElement('li');
            li.innerText = n;
            ul.appendChild(li);
        });
        elDiv.appendChild(h4);
        elDiv.appendChild(ul);
    }
}


function mostrarFichaDinamica(id = null) {
    if (!cachePersonajes) {
        alert("Carga los personajes primero");
        return;
    }
    
    const elDiv = document.getElementById('ficha-individual');
    let personaje;

    if (id) {
        personaje = cachePersonajes.find(p => p.id === id);
    } else {
        const randomIdx = Math.floor(Math.random() * cachePersonajes.length);
        personaje = cachePersonajes[randomIdx];
    }

    elDiv.innerHTML = `
        <h3>Ficha Individual</h3>
        <div style="border: 2px solid #333; width: 220px; padding: 15px; text-align: center; border-radius: 10px;">
            <img src="${personaje.image}" style="width: 100%; border-radius: 5px;">
            <p><strong>${personaje.name}</strong></p>
            <p>ID: ${personaje.id} | ${personaje.species}</p>
        </div>`;
}