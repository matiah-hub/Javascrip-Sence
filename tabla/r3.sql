CREATE TABLE encomiendas (
    id_encomienda SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES clientes(id_cliente),
    id_sucursal_origen INT NOT NULL REFERENCES sucursales(id_sucursal),
    id_estado INT NOT NULL REFERENCES estados_envio(id_estado),
    peso_kg NUMERIC(6,2) NOT NULL CHECK (peso_kg > 0),
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);

	CREATE TABLE detalle_pedido (
    id_pedido INT NOT NULL REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_producto)
);
CREATE TABLE transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    id_cuenta INT NOT NULL REFERENCES cuentas(id_cuenta) ON DELETE CASCADE,
    id_tipo INT NOT NULL REFERENCES tipos_transaccion(id_tipo),
    monto NUMERIC(15,2) NOT NULL CHECK (monto > 0),
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);