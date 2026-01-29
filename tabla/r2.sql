CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(12,2) NOT NULL CHECK (precio >= 0),
    id_categoria INT REFERENCES categorias(id_categoria)
);

CREATE TABLE cuentas (
    id_cuenta SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES clientes(id_cliente),
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    saldo NUMERIC(15,2) NOT NULL DEFAULT 0 CHECK (saldo >= 0),
    fecha_apertura DATE DEFAULT CURRENT_DATE
);
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_cliente INT NOT NULL REFERENCES clientes(id_cliente),
    fecha_pedido DATE NOT NULL DEFAULT CURRENT_DATE
); 