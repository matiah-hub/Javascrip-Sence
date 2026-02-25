# 🇨🇱 Ministerio de las Mascotas - Registro Civil

Este proyecto es una aplicación web desarrollada para el Gobierno de Chile con el fin de gestionar el Registro Civil de mascotas. Permite centralizar la información de los animales y sus dueños mediante una arquitectura robusta de Node.js y persistencia en archivos JSON.

## 📋 Funcionalidades del Sistema

### Backend (Servicio Web)
El servidor responde a los siguientes requerimientos técnicos:
- **Consultas Generales**: Retorno de todas las mascotas registradas.
- **Búsqueda por Nombre**: Filtra y retorna una mascota específica.
- **Búsqueda por RUT**: Retorna el listado de mascotas asociadas a un mismo dueño.
- **Registro**: Almacenamiento persistente de nuevas mascotas en `mascotas.json`.
- **Eliminación**: Capacidad de dar de baja una mascota por nombre o realizar limpiezas masivas por RUT.

### Frontend (Interfaz de Usuario)
- **Consumo de API**: Implementación de Axios para la comunicación asíncrona.
- **Manejo de Errores**: Capa de captura que informa al ciudadano sobre errores de conexión o datos duplicados.
- **Interfaz Institucional**: Diseño alineado con los estándares del Gobierno de Chile.

## 🛠️ Tecnologías Utilizadas
- **Lenguaje**: JavaScript (ES6+).
- **Entorno**: Node.js.
- **Framework**: Express.
- **Librería de Peticiones**: Axios.
- **Almacenamiento**: JSON (FileSystem).

## 🚀 Instrucciones de Ejecución

1. Instalar dependencias necesarias:
   ```bash
   npm install express
Iniciar el servidor oficial:

Bash
node src/app.js     


Acceder al portal oficial:

Abrir en el navegador http://localhost:3000.