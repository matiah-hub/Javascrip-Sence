# M5 — Modelado y Consultas SQL (E-commerce)

## 📝 Descripción
Este proyecto consiste en el diseño y la implementación de una base de datos relacional para un sistema de E-commerce. El objetivo es modelar un dominio de ventas, generar el esquema relacional mediante SQL y ejecutar consultas analíticas para simular operaciones habituales de negocio.

## 🚀 Cómo ejecutar
1.  **Requisitos**: Tener instalado PostgreSQL y pgAdmin 4.
2.  **Preparación**: Crear una nueva base de datos llamada `ecommerce_db`.
3.  **Ejecución**: Abrir el archivo `sql/script.sql` en el Query Tool de pgAdmin y ejecutarlo completamente. El script incluye un bloque de limpieza `DROP TABLE` para permitir múltiples ejecuciones sin conflictos.

## 📊 Estructura del Proyecto
- `er/`: Contiene el diagrama Entidad-Relación exportado desde pgAdmin.
- `sql/`: Contiene el script unificado con comandos DDL, DML y Consultas.
- `README.md`: Documentación del proyecto.

## 🛠️ Detalles Técnicos
- **Normalización**: El modelo se encuentra en Tercera Forma Normal (3FN) para evitar redundancia de datos.
- **Integridad Referencial**: Se implementaron restricciones `ON DELETE CASCADE` para ítems de órdenes e `inventario`, y `ON DELETE RESTRICT` para proteger la integridad de los usuarios.
- **Optimización**: Se incluyeron índices en las columnas de `fecha` para acelerar los reportes temporales.

## 🔍 Consultas Requeridas
El proyecto resuelve los siguientes requerimientos de negocio:
1.  **Oferta Verano**: Actualización masiva del 20% de descuento en precios.
2.  **Stock Crítico**: Reporte de productos con 5 unidades o menos en inventario.
3.  **Simulación de Compra**: Cálculo automático de Subtotal, IVA (19%) y Total.
4.  **Reporte Mensual**: Total de ventas netas de Diciembre 2022.
5.  **Ranking de Usuarios**: Identificación del cliente con mayor volumen de compras en 2022.