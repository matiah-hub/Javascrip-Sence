DROP TABLE IF EXISTS detalle_facturas;
DROP TABLE IF EXISTS existencias;
DROP TABLE IF EXISTS facturas; 
DROP TABLE IF EXISTS productos;

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE existencias (
    id SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    cantidad INTEGER,
    precio INTEGER,
    pesokg INTEGER,
    CONSTRAINT fk_producto_existencia FOREIGN KEY (id_producto) REFERENCES productos(id)
);
CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    rut_comprador VARCHAR(12) NOT NULL,
    rut_vendedor VARCHAR(12) NOT NULL
);
CREATE TABLE detalle_facturas ( 
    id SERIAL PRIMARY KEY,
    id_producto INTEGER NOT NULL,
    id_factura INTEGER NOT NULL, 
    CONSTRAINT fk_producto_detalle FOREIGN KEY (id_producto) REFERENCES productos(id),
    CONSTRAINT fk_factura_detalle FOREIGN KEY (id_factura) REFERENCES facturas(id) 
);