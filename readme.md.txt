# Sistema de Gestión de Países - Módulo 7

Este proyecto es una aplicación full-stack desarrollada con **Node.js**, **Express** y **PostgreSQL**. Permite gestionar información demográfica y económica (PIB) de distintos países mediante una interfaz web dinámica.

## 🚀 Características Principales

* **Consultas Optimizadas:** Uso de `pg-cursor` para la lectura de datos en bloques configurables (5, 10, 20 o 50 registros).
* **Integridad de Datos:** Implementación de **Transacciones SQL** (`BEGIN`, `COMMIT`, `ROLLBACK`) para asegurar que los registros se guarden o eliminen correctamente en múltiples tablas relacionadas (`paises`, `paises_pib` y `paises_data_web`).
* **Arquitectura de Middlewares:** Manejo centralizado de errores mediante un middleware global de Express utilizando el parámetro `next`.
* **Interfaz Dinámica:** Frontend construido con HTML5, CSS3 y JavaScript (Fetch API) para operaciones CRUD sin recargar la página.

## 🛠️ Tecnologías Utilizadas

* **Backend:** Node.js, Express.
* **Base de Datos:** PostgreSQL.
* **Librerías:** `pg` (PostgreSQL client), `pg-cursor`, `dotenv`, `cors`.
* **Frontend:** JavaScript (Vanilla), CSS Moderno.

## 📋 Requisitos Previos

1. Tener instalado **Node.js** y **PostgreSQL**.
2. Crear la base de datos y las tablas correspondientes (`paises`, `paises_pib`, `paises_data_web`).
3. Configurar el archivo `.env` con las credenciales de la base de datos:
   ```env
   DB_USER=tu_usuario
   DB_HOST=localhost
   DB_NAME=tu_base_de_datos
   DB_PASSWORD=tu_contraseña
   DB_PORT=5432
⚙️ Instalación y Uso
Clonar o descargar el proyecto.

Instalar las dependencias:

Bash
npm install
Iniciar el servidor:

Bash
node app.js
Abrir en el navegador: http://localhost:3000