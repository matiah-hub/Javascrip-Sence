let cargarDatos;

window.addEventListener('load', () => {
    const btn = document.getElementById('BtnCargar');
    const tabla = document.getElementById('TablaDatos');
    const mensaje = document.getElementById('mensajeEstado');

    if (!btn || !tabla || !mensaje) {
        console.error("Error: No se encontraron los IDs 'BtnCargar', 'TablaDatos' o 'mensajeEstado' en el HTML.");
        return;
    }

    cargarDatos = async () => {
        tabla.innerHTML = '';
        mensaje.classList.remove('d-none');
        mensaje.innerText = 'Cargando... Espere...';
        mensaje.classList.replace('alert-danger', 'alert-info');

        try {
            const respuesta = await fetch('http://localhost:3000/api/v1/usuarios');

            if (!respuesta.ok) {
                throw new Error('Error al cargar los datos de la API (Status: ' + respuesta.status + ')');
            }

            const resultado = await respuesta.json();
            const listaUsuarios = resultado.data;

            if (!listaUsuarios || !Array.isArray(listaUsuarios)) {
                throw new Error('El formato de datos recibido no es una lista válida.');
            }

            listaUsuarios.forEach(item => {
                const fila = `
                <tr>
                    <td>${item.id || 'N/A'}</td>
                    <td>${item.nombre || 'Sin nombre'}</td>
                    <td><span class="badge bg-info">Activo</span></td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${item.id})">Eliminar</button>
                        <button class="btn btn-warning btn-sm" onclick="editarUsuario(${item.id}, '${item.nombre}')">Editar</button>
                        <button class="btn btn-success btn-sm" onclick="verUsuario(${item.id})">Ver</button>
                        <button class="btn btn-primary btn-sm" onclick="detallesUsuario(${item.id})">Detalles</button>
                    </td>
                </tr>
                `;
                tabla.innerHTML += fila;
            });

            mensaje.classList.add('d-none');

        } catch (error) {
            mensaje.innerText = 'Error al conectar: ' + error.message;
            mensaje.classList.replace('alert-info', 'alert-danger');
            console.error('Error detallado:', error);
        }
    };

    btn.addEventListener('click', cargarDatos);
});

async function eliminarUsuario(id) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
        const res = await fetch(`http://localhost:3000/api/v1/usuarios/${id}`, { method: 'DELETE' });
        if (res.ok) cargarDatos();
        else alert('Error al eliminar');
    } catch (e) { console.error(e); }
}

async function editarUsuario(id, nombreActual) {
    const nuevoNombre = prompt('Editar nombre:', nombreActual);
    if (!nuevoNombre || nuevoNombre === nombreActual) return;
    try {
        const res = await fetch(`http://localhost:3000/api/v1/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre })
        });
        if (res.ok) cargarDatos();
        else alert('Error al editar');
    } catch (e) { console.error(e); }
}

async function verUsuario(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/usuarios/${id}`);
        const json = await res.json();
        if (res.ok) alert(`Usuario: ${json.data.nombre}`);
        else alert('Usuario no encontrado');
    } catch (e) { console.error(e); }
}

async function detallesUsuario(id) {
    try {
        const res = await fetch(`http://localhost:3000/api/v1/usuarios/${id}`);
        const json = await res.json();
        if (res.ok) {
            alert(`--- Detalles del Usuario ---\nID: ${json.data.id}\nNombre: ${json.data.nombre}\nEstado: Activo`);
        } else alert('Usuario no encontrado');
    } catch (e) { console.error(e); }
}