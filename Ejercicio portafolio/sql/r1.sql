DROP TABLE IF EXISTS orden_items CASCADE;
DROP TABLE IF EXISTS ordenes CASCADE;
DROP TABLE IF EXISTS inventario CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT now()
	);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE inventario (
    id_producto INT PRIMARY KEY REFERENCES productos ON DELETE CASCADE,
    stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE ordenes (
    id_orden SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES usuarios ON DELETE RESTRICT,
    fecha DATE NOT NULL,
    total NUMERIC(12,2) DEFAULT 0
);

CREATE TABLE orden_items (
    id_item SERIAL PRIMARY KEY,
    id_orden INT REFERENCES ordenes ON DELETE CASCADE,
    id_producto INT REFERENCES productos,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL
);

CREATE INDEX idx_ordenes_fecha ON ordenes(fecha);
CREATE INDEX idx_ordenes_usuario ON ordenes(id_usuario);