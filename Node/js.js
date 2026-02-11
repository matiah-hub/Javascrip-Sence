const http = require("http");
const port = 3000;
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomWord(minLen = 3, maxLen = 10) {
    const letters = ['Agumon', 'Terriermon', 'V-mon', 'Guilmon', 'renamon']
    const index = [randomNumber(0, letters.length - 1)];
    return letters[index]
}

function send(res, statusCode, contentType, body) {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.end(body);
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const method = req.method;

    if (path === '/') {
        if (method === 'GET') {
            const fecha = new Date();
            const html = `
                <!DOCTYPE html>
                <html lang="es">
                <head><meta charset="utf-8"><title>Ejemplo Nodejs</title></head>
                <body> 
                    <h1>Fecha y hora del servidor</h1>
                    <p>Hoy es: <strong>${days[fecha.getDay()]}, ${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}</strong></p>
                    <p>Hora actual: <strong>${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}</strong></p>
                </body>
                </html>`;
            return send(res, 200, "text/html; charset=utf-8", html);
        }
        return send(res, 405, "text/plain; charset=utf-8", `Método no permitido: ${method}`);
    }

    if (path === '/random-data') {
        if (method === 'GET') {
            const palabra = randomWord();
            const html = `<!DOCTYPE html><html><body><h1>Palabra aleatoria: ${palabra}</h1></body></html>`;
            return send(res, 200, "text/html; charset=utf-8", html);
        }
        
        if (method === 'PUT') {
            const numero = randomNumber(10, 50000);
            const html = `<!DOCTYPE html><html><body><h1>Número aleatorio: ${numero}</h1></body></html>`;
            return send(res, 200, "text/html; charset=utf-8", html);
        }
        return send(res, 405, "text/plain; charset=utf-8", `Aún no estoy preparado para responder al método ${method}`);
    }

    send(res, 404, "text/plain", "Ruta no encontrada");
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});