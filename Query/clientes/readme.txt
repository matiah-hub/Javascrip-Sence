# Ejercicio de Consultas SQL - Clientes

Este repositorio contiene la resolución de una serie de consultas SQL aplicadas a una base de datos de clientes, desarrollada como parte de una actividad práctica de manejo de PostgreSQL.

## 🛠️ Herramientas utilizadas
* **Motor de Base de Datos:** PostgreSQL 18
* **Interfaz de Gestión:** pgAdmin 4
* **Lenguaje:** SQL (Structured Query Language)

## 📋 Descripción del Proyecto
Se trabajó sobre una tabla llamada `clientes` con los siguientes campos:
* `rut` (VARCHAR)
* `nombre` (VARCHAR)
* `edad` (INTEGER)

El objetivo fue aplicar diferentes filtros utilizando cláusulas `WHERE`, operadores de comparación y patrones de búsqueda con `LIKE`.

## 📁 Estructura de Archivos
Cada requerimiento solicitado en la guía se encuentra en su propio archivo `.sql` para facilitar la revisión:

* **R1:** Búsqueda por RUT específico.
* **R2:** Filtro por edad (mayores de 25).
* **R3:** Uso de operador diferente (`<>`) para excluir nombres.
* **R4 y R5:** Uso de comodines (`%`) para buscar patrones al inicio y final del texto.
* **R6 y R7:** Consultas con múltiples condiciones lógicas (`AND`, `NOT LIKE`).
* **R8:** Consulta avanzada utilizando `OR`, `IN` y rangos con `BETWEEN`.

## 📸 Evidencias
Los resultados de cada consulta han sido verificados en el **Data Output** de pgAdmin y se adjuntan capturas de pantalla en la carpeta de entrega.