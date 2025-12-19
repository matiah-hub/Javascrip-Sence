#  DigiTienda E-commerce - Tamer System

Este es un proyecto de tienda virtual inspirado en el universo Digimon, que permite explorar un catálogo dinámico, ver detalles técnicos de cada especie y gestionar un inventario de compra con estética digital neón.

##  Estructura del Proyecto

El proyecto sigue una arquitectura de archivos organizada para facilitar el mantenimiento y la carga de activos:

* **Raíz**: Contiene los archivos de navegación principal `index.html` y `detalle.html`.
* **Carpeta ASSET/**: Centraliza todos los recursos del sistema.
    * `ASSET/CSS/css.css`: Estilos personalizados con temática de "Modo Oscuro" y bordes verdes.
    * `ASSET/JS/app.js`: Lógica principal, catálogo de productos, sistema de carrito y autenticación.
    * `ASSET/IMG/`: Galería de imágenes (V-mon, Agumon, Gabumon, Terriermon y Veemonchibi).

##  Acceso y Pruebas

Para testear las funcionalidades de seguridad y el sistema de recompensas, utilice los siguientes datos:

- **Login Tamer**: 
  - **Usuario**: (Cualquier nombre de usuario)
  - **Password Maestra**: `1234`
- **Promociones**: 
  - **Código de Descuento**: `DESC15` (Aplica un 15% de rebaja al total de la compra).

##  Funcionalidades Principales

1. **Catálogo Dinámico**: Generación automática de tarjetas de productos desde JavaScript.
2. **Navegación por Parámetros**: Uso de `URLSearchParams` para cargar datos específicos de cada Digimon en la página de detalle.
3. **Gestión de Carrito**: Funciones para añadir y eliminar productos, con actualización automática de contadores y totales.
4. **Validación de Cupones**: Lógica implementada para aplicar descuentos mediante entrada de texto.

## Notas de Instalación y Soporte

- **Rutas Relativas**: Se deben referenciar los archivos JS y CSS incluyendo el prefijo `ASSET/` (ej: `ASSET/JS/app.js`) para evitar errores 404 de carga.
- **Precios**: Los valores en el código fuente se manejan como enteros (ej: `50000`) para garantizar la precisión matemática.
- **Reglas del Juego**: Dentro de la experiencia de usuario, el regalo especial es el de tamaño grande y no es de color azul.

---
**Desarrollado para el Digimundo - 2025**