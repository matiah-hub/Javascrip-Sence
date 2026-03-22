👾 Digi-Market Pro: Sistema de Gestión Tamer
¡Bienvenido al panel de control definitivo para tu tienda de Digimon! Este sistema es una Single Page Application (SPA) robusta que permite gestionar inventario, ventas, descuentos masivos y ofertas relámpago con cronómetro en tiempo real.

🚀 Características Principales
Gestión de Inventario 🛠️: Edición masiva de nombres, descripciones, precios, stock y descuentos directamente desde una tabla dinámica.

Actualización de Imágenes 📸: Sistema de carga de archivos con vista previa y edición rápida haciendo clic en la miniatura.

Ofertas Relámpago ⚡: Temporizador global programable. Define un % de descuento y un tiempo; el sistema aplicará el descuento a toda la tienda y lo quitará automáticamente al finalizar.

Sistema de Cupones 🎫: Soporte para el cupón maestro DIGIEVOLUCION que aplica un 20% de descuento adicional en el carrito.

Seguridad 🔒: Autenticación mediante JWT (JSON Web Tokens) y encriptación de contraseñas con Bcrypt.

Historial de Ventas 📊: Registro detallado de transacciones con capacidad de generar reportes técnicos por consola.

🛠️ Tecnologías Utilizadas
Backend: Node.js & Express.

Base de Datos: PostgreSQL.

Frontend: HTML5, CSS3 (Bootstrap 5) y JavaScript Vanilla (ES6+).

Autenticación: JWT.

Manejo de Archivos: Express-fileupload.

📦 Instalación y Configuración
1. Requisitos Previos
Node.js instalado.

PostgreSQL funcionando.

2. Base de Datos
Crea las tablas necesarias ejecutando este SQL en tu terminal de Postgres:

SQL
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    image_url TEXT,
    discount_percent INTEGER DEFAULT 0
);

CREATE TABLE sales_history (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    quantity INTEGER,
    total_price DECIMAL,
    sale_date TIMESTAMP DEFAULT NOW()
);

-- Nota: Asegúrate de tener también tus tablas de 'users' y 'cart_items'.
3. Variables de Entorno
Crea un archivo .env en la raíz del proyecto:

Fragmento de código
PORT=3000
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_NAME=digimarket
DB_PORT=5432
JWT_SECRET=tu_secreto_super_seguro
4. Ejecución
Bash
npm install
node server.js
🎮 Guía de Uso para el Administrador
Editar un Producto
Ve a la pestaña Panel Control.

Texto: Modifica el nombre o descripción directamente en la casilla.

Imagen: Haz clic sobre la foto pequeña del Digimon para subir una nueva versión.

Guardar: No olvides presionar el botón azul "Guardar Cambios de Tabla" para que los textos y precios se sincronicen con la base de datos.

Activar Oferta con Tiempo
En el panel de control, ingresa el porcentaje (ej: 50) y los minutos (ej: 10).

Haz clic en "Iniciar Oferta".

Verás un banner rojo con la cuenta regresiva en la pestaña de la Tienda.

Reporte de Ventas
En la pestaña Ventas, presiona el botón de reporte y abre la consola de desarrollador de tu navegador (F12) para ver una tabla organizada con el total acumulado de tus ganancias.

⚠️ Notas de Mantenimiento
Las imágenes se guardan en /public/uploads.

Si una imagen no se encuentra físicamente, el sistema cargará automáticamente un placeholder para mantener la estética del sitio.

Tip de Tamer: El cupón secreto DIGIEVOLUCION es acumulable con los descuentos individuales de cada producto. ¡Úsalo con sabiduría!