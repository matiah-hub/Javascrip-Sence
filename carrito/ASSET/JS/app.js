const catalogo = [
  { id: 1, nombre: "V-mon", precio: 50.000, img: "ASSET/IMG/vmon.jpg", desc: "Una nueva especie de Digimon que fue descubierta recientemente. Como un superviviente de las especies que florecieron en el Génesis del Mundo Digital, es capaz de usar la Digievolución Armor, una pseudo-evolución usando los Digimentals. Entre otros, V-mon es una excelente Especie de Combate, ya que posee un poder oculto, y demuestra tremendas habilidades al armor digievolucionar. Aunque tiene una traviesa personalidad amante de las bromas, tiene otro lado con un fuerte sentido de justicia. Su técnica distintiva es mover sus dos brazos en círculos, golpeando al oponente (Puño Bunbun). Su técnica especial es noquear al oponente con un intenso cabezazo (Cabezazo de V-mon)" },
  { id: 2, nombre: "Agumon", precio:50.000, img: "ASSET/IMG/agumon.jpg", desc: "Un Digimon de Tipo Reptil que ha crecido y llegó a ser capaz de caminar sobre dos patas, tiene la apariencia de un dinosaurio pequeño. Debido a que todavía está en camino a la edad adulta, su poder es bajo, pero como su personalidad es bastante feroz, no entiende el miedo. Ha crecido garras duras y afiladas tanto en sus manos como en sus pies, y demuestra su poder en batalla. También es un ser que presagia la evolución a un gran y poderoso Digimon. Su movimiento especial es escupir aliento de fuego desde su boca para atacar al oponente Flama Bebé." },
  { id: 3, nombre: "Gabumon", precio: 50.000, img: "ASSET/IMG/gabumon.jpg", desc: "A pesar de que está cubierto por una piel, es claramente un Digimon reptil. Debido a su personalidad extremadamente tímida, siempre recoge los datos que Garurumon deja tras de sí, y da forma en una piel de llevar. Debido a que usa la piel de Garurumon, es temido por otros Digimon, que cumple la función de salvaguardar en sí como resultado de la protección de su cuerpo. Cuando está usando esa piel, su personalidad hace un cambio completo de 180 °. Su movimiento especial es  Petit Fire" },
  { id: 4, nombre: "Terriermon", precio:50.000, img: "ASSET/IMG/terriermon.jpg", desc: "Con un cuerno que crece de su cabeza, es un Digimon envuelto en el misterio. Se puede clasificar como un Digimon Bestia por su estructura corporal, pero todavía no se entiende qué tipo de forma evolucionada asumirá. Además, se rumorea que a veces nace con un gemelo. Es un tipo muy lindo de Digimon, y de su comportamiento tranquilo, no parece como una Especie de combate Digimon, pero en el caso de la batalla, se demuestra que es más poderoso de lo que parece. Su Movimiento personal está generando un pequeño tornado girando sus oídos como una hélice (Mini Tornado). Su Movimiento especial está escupiendo un diparo de aire sobrecalentado (Fuego Ardiente). Además, posee una poderosa fuerza en la Técnica Unísona Doble Tifón que realiza con Lopmon, su gemeloA pesar de que está cubierto por una piel, es claramente un Digimon reptil. Debido a su personalidad extremadamente tímida, siempre recoge los datos que Garurumon deja tras de sí, y da forma en una piel de llevar. Debido a que usa la piel de Garurumon, es temido por otros Digimon, que cumple la función de salvaguardar en sí como resultado de la protección de su cuerpo. Cuando está usando esa piel, su personalidad hace un cambio completo de 180 . Su movimiento especial es Petit Fire." },
];

let carrito = [];     
const PASSWORD_MAESTRA = "1234"; 
let usuarioLogueado = false; 


function renderizarProductos() {
    const grid = document.querySelector("#productos-grid");
    if (!grid) return; 

    grid.innerHTML = "";
    catalogo.forEach(p => {
        grid.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card bg-black border-success text-light h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top p-3" alt="${p.nombre}">
                    <div class="card-body text-center">
                        <h5 class="card-title text-success">${p.nombre}</h5>
                        <p class="card-text fw-bold">$ ${p.precio.toLocaleString('es-CL')}</p>
                        <div class="d-grid gap-2">
                            <a href="detalle.html?id=${p.id}" class="btn btn-outline-info btn-sm">Ver Detalles</a>
                            <button onclick="agregarProducto(${p.id})" class="btn btn-success btn-sm">Añadir 🛒</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
 
function agregarProducto(idProducto) {
    const prod = catalogo.find(p => p.id === idProducto);
    if (prod) {
        carrito.push({ ...prod, descuentoAplicado: false });
        renderizarCarrito();
    }
}

function quitarProducto(index) { 
    carrito.splice(index, 1);
    renderizarCarrito();
}

function aplicarDescuento(codigo) { 
    if (codigo === "DESC15") {
        return 0.85; 
    }
    return 1;
}

function calcularTotal() { 
    const codigo = document.querySelector("#cupon")?.value || "";
    const factor = aplicarDescuento(codigo);
    const total = carrito.reduce((acc, p) => acc + p.precio, 0);
    return Math.round(total * factor);
}

function renderizarCarrito() { 
    const tbody = document.querySelector("#cart-items");
    const totalSpan = document.querySelector("#cart-total");
    const countSpan = document.querySelector("#cart-count");

    if (!tbody) return;

    tbody.innerHTML = "";
    carrito.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>$ ${p.precio.toLocaleString('es-CL')}</td>
                <td><button class="btn btn-outline-danger btn-sm" onclick="quitarProducto(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    totalSpan.textContent = `$ ${calcularTotal().toLocaleString('es-CL')}`;
    countSpan.textContent = carrito.length;
}


function iniciarSesion() {
    const user = document.querySelector("#userLogin").value;
    const pass = document.querySelector("#passLogin").value;

    if (pass === PASSWORD_MAESTRA) {
        usuarioLogueado = true;
        alert(`¡Bienvenido al Digimundo, ${user}!`);
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalAuth'));
        modal.hide();
    } else {
        alert("Contraseña incorrecta. (Pista: 1234)");
    }
}

document.querySelector("#cupon")?.addEventListener("input", renderizarCarrito);

document.addEventListener("DOMContentLoaded", renderizarProductos);