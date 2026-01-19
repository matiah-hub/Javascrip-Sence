class Users {
    constructor(baseUrl = "https://jsonplaceholder.typicode.com/users") {
        this.baseUrl = baseUrl;
        this.users = [];
        this.isReady = false;
        this._onReadyCallbacks = [];
        this._loadUser();
    }

    onReady(cb) {
        if (this.isReady) {
            cb();
        } else {
            this._onReadyCallbacks.push(cb);
        }
    }

    _setReady() {
        this.isReady = true;
        this._onReadyCallbacks.forEach(cb => cb());
    }

    _requireReady() {
        if (!this.isReady) throw new Error("Aún cargando datos. Espere un momento.");
    }

    _loadUser() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.baseUrl, true);
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    this.users = JSON.parse(xhr.responseText);
                    console.log('Usuarios cargados exitosamente.');
                    this._setReady();
                } catch (err) {
                    console.error('Error parseando JSON:', err);
                }
            } else {
                console.error('Error en API:', xhr.status, xhr.statusText);
            }
        };
        xhr.onerror = () => console.error('Error en la conexión.');
        xhr.send();
    }

    _normalize(str) {
        return String(str || "").trim().toLowerCase();
    }

    _findByNamePrompt() {
        this._requireReady();
        const nameInput = prompt('Ingrese el nombre del usuario:');
        if (!nameInput) return null;

        const busca = this._normalize(nameInput);
        const user = this.users.find(u => this._normalize(u.name) === busca);

        if (!user) {
            console.warn('Usuario no encontrado:', nameInput);
            alert('Usuario no encontrado');
            return null;
        }
        return user;
    }

    listaNombres() {
        this._requireReady();
        const nombres = this.users.map(u => u.name);
        console.table(nombres);
        return nombres;
    }

    mostrarInfoBasica() {
        const user = this._findByNamePrompt();
        if (!user) return null;
        const info = { username: user.username, email: user.email };
        console.log(`Información de ${user.name}:`);
        console.table(info);
        return info;
    }

    listarDireccionesByName() {
        const user = this._findByNamePrompt();
        if (!user) return null;
        const address = user.address; 
        console.log(`Dirección de ${user.name}:`);
        console.table(address);
        return address;
    }

    mostrarInfoAvanzadaByName() {
        const user = this._findByNamePrompt();
        if (!user) return null;
        const infoAvanzada = {
            phone: user.phone,
            website: user.website,
            company: user.company
        };
        console.log(`Info avanzada de ${user.name}:`);
        console.table(infoAvanzada);
        return infoAvanzada;
    }

    listarTodasLasCompanias() {
        this._requireReady();
        const data = this.users.map(u => ({
            company: u.company.name,
            catchPhrase: u.company.catchPhrase
        }));
        console.table(data);
        return data;
    }

    listarNombreOrdenado() {
        this._requireReady();
        const ordenados = this.users.map(u => u.name).sort((a, b) => a.localeCompare(b));
        console.table(ordenados);
        return ordenados;
    }
}

const api = new Users();
const statusEl = document.querySelector('#status');
const salidaEl = document.querySelector('#salida');

function setStatus(msg, type = "light") {
    statusEl.className = `alert alert-${type} border`;
    statusEl.textContent = msg;
}

function habilitarBotones(enabled) {
    document.querySelectorAll('.api-btn').forEach(b => b.disabled = !enabled);
}

function imprimir(datos) {
    if (datos === null) return;
    if (Array.isArray(datos)) {
        salidaEl.textContent = datos.map(d => typeof d === "string" ? `- ${d}` : JSON.stringify(d, null, 2)).join('\n');
    } else {
        salidaEl.textContent = JSON.stringify(datos, null, 2);
    }
}

api.onReady(() => {
    setStatus('Usuarios cargados, ya puede usar la app', 'success');
    habilitarBotones(true);
});

// Event Listeners para los botones [cite: 57]
document.getElementById('btnNames').addEventListener('click', () => imprimir(api.listaNombres()));
document.getElementById('btnBasic').addEventListener('click', () => imprimir(api.mostrarInfoBasica()));
document.getElementById('btnAddress').addEventListener('click', () => imprimir(api.listarDireccionesByName()));
document.getElementById('btnAdvanced').addEventListener('click', () => imprimir(api.mostrarInfoAvanzadaByName()));
document.getElementById('btnCompanies').addEventListener('click', () => imprimir(api.listarTodasLasCompanias()));
document.getElementById('btnSorted').addEventListener('click', () => imprimir(api.listarNombreOrdenado()));
document.getElementById('btnClear').addEventListener('click', () => salidaEl.textContent = "");