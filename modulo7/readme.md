🏪 Sistema de Gestión de Inventario y Ventas - Portafolio M7
Este proyecto es una aplicación web full-stack diseñada para gestionar el inventario de una tienda y procesar ventas garantizando la integridad de los datos mediante el uso de Transacciones (TCL).

🚀 Características Técnicas
Backend: Node.js con Express.

API REST: Endpoints estructurados para la consulta y manipulación de datos.

Control de Transacciones (TCL): Implementación de lógica de Commit y Rollback para asegurar que el stock solo se descuente si la venta es exitosa.

Manejo de Errores: Uso de códigos de estado HTTP estandarizados:

200 OK: Consulta de productos exitosa.

201 Created: Venta registrada y stock actualizado.

409 Conflict: Error de lógica (ej. stock insuficiente), activando el Rollback.

404 Not Found: Recurso o producto no encontrado.

Frontend Dinámico: Interfaz construida con HTML5 y CSS3 que consume la API de forma asíncrona (Fetch API).

🛠️ Nota de Implementación (Persistencia)
Para esta entrega, se ha optado por un Motor de Persistencia en Memoria (Mock Data). Esta decisión garantiza la portabilidad del proyecto y su ejecución inmediata en cualquier entorno sin dependencias de configuración de servicios locales de PostgreSQL.

Importante: La arquitectura del código está diseñada para ser fácilmente migrable a un motor de base de datos relacional mediante el reemplazo del controlador actual por uno basado en pg o Sequelize, manteniendo intacta la lógica de negocio.

📦 Instalación y Ejecución
Descargar/Clonar la carpeta del proyecto.

Abrir una terminal en la raíz del proyecto e instalar las dependencias:

Bash

npm install
Iniciar el servidor:

Bash

node app.js
Abrir el navegador en: http://localhost:3000

📝 Instrucciones de Prueba
Listado: Al cargar la página, se listarán automáticamente los productos desde el servidor.

Venta Exitosa: Ingrese el ID de un producto existente (ej: 2) y una cantidad válida (ej: 1). El stock se actualizará y verá un mensaje de éxito.

Simulación de Rollback: Intente comprar una cantidad superior al stock disponible (ej: 100). El sistema detectará el error, enviará un código 409 y restaurará el stock al estado anterior para evitar datos inconsistentes.