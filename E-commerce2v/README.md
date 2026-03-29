# 🚀 Digi-Market v2 - Guía de Evaluación Técnica

Bienvenido al "Digi-Market", una plataforma Fullstack robusta diseñada para la gestión comercial moderna. Este proyecto integra funcionalidades avanzadas de tiempo real, seguridad multicapa y una arquitectura de base de datos relacional optimizada.

---

## 🛠️ Despliegue en Entorno Local

Para levantar este proyecto en tu entorno local, sigue estos pasos desde la raíz del proyecto (`todounido/`):

### 1. Preparación del Entorno
*   **Base de Datos:** Asegúrate de tener **PostgreSQL** activo.
*   **Variables de Entorno:** Verifica que el archivo `.env` contenga tu `DATABASE_URL` y `JWT_SECRET`. 
*   **Estructura:** Si es una instalación nueva, recuerda ejecutar el script SQL de correcciones estructurales (`update_db.sql`) en tu cliente de base de datos.

### 2. Instalación y Ejecución
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor
npm start
```

> [!TIP]
> El servidor arrancará por defecto en `http://localhost:3000`. Puedes monitorear la consola para confirmar la conexión exitosa a la base de datos.

---

## 🛡️ Acceso de Administrador (Evaluación)

Para probar los flujos restringidos y las capacidades avanzadas de gestión, utiliza las siguientes credenciales en el modal de **Inicio de Sesión**:

*   **Email:** `admin@digimarket.cl`
*   **Password:** `12345`

### Capacidades del Administrador:
- **Gestión de Stock:** Creación, edición y eliminación de productos con persistencia en `public/uploads`.
- **Panel de Ventas:** Visualización del historial maestro de transacciones.
- **Cascaded Delete:** Sistema de protección que limpia relaciones en la base de datos automáticamente.
- **Control de Acceso:** Middleware JWT para bloquear intrusiones en rutas críticas.

---

## ✨ Funcionalidades Destacadas

> [!IMPORTANT]
> **Tiempo Real (SSE):** El sistema utiliza *Server-Sent Events* para notificar "Ofertas Relámpago" y cambios críticos de stock sin necesidad de refrescar la página.

*   **Carrito Transaccional:** Sistema de persistencia que asegura que los pedidos lleguen a la base de datos con validación de inventario.
*   **Seguridad:** Implementación de `bcrypt` para el hashing de contraseñas y `jsonwebtoken` para sesiones seguras.
*   **Diseño Responsive:** Interfaz fluida adaptada a cualquier dispositivo.

---

¡Éxito en la revisión técnica! Si tienes alguna duda sobre la arquitectura, puedes consultar el código fuente en la carpeta `/src`.  👾
