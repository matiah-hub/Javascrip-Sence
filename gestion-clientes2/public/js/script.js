async function aplicarFiltros() {
            const rut = document.getElementById('f_rut').value;
            const nombre = document.getElementById('f_nombre').value;
            const min = document.getElementById('f_min').value;
            const max = document.getElementById('f_max').value;

            let query = "";
            if (rut) query = `?rut=${rut}`;
            else if (nombre) query = `?nombre=${nombre}`;
            else if (min && max) query = `?edadMin=${min}&edadMax=${max}`;

            const res = await fetch(`/clientes${query}`);
            const data = await res.json();
            
            if (data.message) {
                alert(data.message);
                document.getElementById('cuerpo-tabla').innerHTML = "";
            } else {
                renderizarTabla(data);
            }
        }

        async function listarClientes() {
            const res = await fetch('/clientes');
            const data = await res.json();
            renderizarTabla(data);
        }

        function renderizarTabla(lista) {
            const tabla = document.getElementById('cuerpo-tabla');
            tabla.innerHTML = lista.map(c => `
                <tr>
                    <td>${c.rut}</td>
                    <td>${c.nombre}</td>
                    <td>${c.edad}</td>
                    <td>
                        <button onclick="eliminarIndividual('${c.rut}')" class="btn btn-outline-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            `).join('');
        }

        // 2. CREAR CLIENTE (POST)
        async function crearCliente() {
            const rut = document.getElementById('c_rut').value;
            const nombre = document.getElementById('c_nombre').value;
            const edad = document.getElementById('c_edad').value;

            const res = await fetch('/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rut, nombre, edad })
            });
            const data = await res.json();
            alert(data.message || data.error);
            if (res.ok) {
                document.getElementById('c_rut').value = "";
                document.getElementById('c_nombre').value = "";
                document.getElementById('c_edad').value = "";
                listarClientes();
            }
        }

        // 3. ACTUALIZAR NOMBRE (PUT)
        async function actualizarCliente() {
            const rut = document.getElementById('u_rut').value;
            const nombre = document.getElementById('u_nombre').value;

            const res = await fetch(`/clientes/${rut}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre })
            });
            const data = await res.json();
            alert(data.message || data.error);
            listarClientes();
        }

        // 4. ELIMINAR INDIVIDUAL
        async function eliminarIndividual(rut) {
            if (!confirm("¿Eliminar este cliente?")) return;
            const res = await fetch(`/clientes/${rut}`, { method: 'DELETE' });
            const data = await res.json();
            alert(data.message);
            listarClientes();
        }

        // 5. ELIMINAR POR RANGO DE EDAD 
        async function eliminarPorRango() {
            const min = document.getElementById('del_min').value;
            const max = document.getElementById('del_max').value;
            if (!min || !max) return alert("Ingresa el rango de edad");

            if (!confirm(`¿Borrar a todos entre ${min} y ${max} años?`)) return;

            const res = await fetch(`/clientes?edadMin=${min}&edadMax=${max}`, { method: 'DELETE' });
            const data = await res.json();
            alert(data.message); 
            listarClientes();
        }

        window.onload = listarClientes;
