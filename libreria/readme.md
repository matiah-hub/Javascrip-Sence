# 📚 Sistema de Gestión de Biblioteca "El Saber"

Este proyecto es una aplicación web full-stack básica diseñada para gestionar un catálogo de libros. Implementa una **API REST** utilizando **Node.js** y **Express**, con persistencia de datos en un archivo local JSON mediante el módulo **File System**.

## 🚀 Características Técnicas

- **Arquitectura REST**: Implementación de los verbos HTTP:
  - `GET /libros`: Listar todos los libros.
  - `POST /libros`: Crear un nuevo registro con ID único.
  - `PUT /libros/:id`: Actualizar datos de un libro existente.
  - `DELETE /libros/:id`: Eliminar un registro del catálogo.
- **Persistencia Asíncrona**: Uso de `fs/promises` para la lectura y escritura del archivo `catalogo.json`, evitando el bloqueo del Event Loop.
- **Validación de Datos**: Control de campos obligatorios y tipos de datos (Año como número entero).
- **Interfaz de Usuario**: Frontend dinámico desarrollado con HTML5, CSS3 y JavaScript (Fetch API).

## 📁 Estructura del Proyecto

```text
biblioteca-api/
  ├── public/
  │    └── index.html      # Interfaz de usuario (Frontend)
  ├── catalogo.json        # Base de datos local (JSON)
  ├── index.js             # Lógica del servidor (Backend)
  ├── package.json         # Dependencias y scripts
  └── README.md            # Documentación del proyecto
🛠️ Instalación y Configuración
Clonar o descargar el repositorio en tu máquina local.

Instalar dependencias:
Ejecuta el siguiente comando en la terminal:

Bash
npm install
Iniciar el servidor:
Puedes usar el script de desarrollo (requiere nodemon):

Bash
npm run dev
O el comando estándar de Node:

Bash
npm start
Acceder a la aplicación:
Abre tu navegador en: http://localhost:3000

📊 Códigos de Respuesta HTTP implementados
200 OK: Operación exitosa.

201 Created: Recurso creado con éxito (usado en POST).

400 Bad Request: Datos enviados inválidos o incompletos.

404 Not Found: El ID solicitado no existe en el catálogo.

500 Internal Server Error: Error inesperado en el servidor o sistema de archivos.