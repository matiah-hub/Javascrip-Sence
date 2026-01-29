INSERT INTO clientes (nombre, email, telefono) VALUES 
('Diego Alarcón', 'diego@email.com', '+56911112222'),
('Claudia Rojas', 'claudia@email.com', '+56933334444');

INSERT INTO sucursales (nombre, direccion) VALUES 
('Sucursal Norte', 'Av. Libertad 500'),
('Sucursal Sur', 'Calle Biobío 12');

INSERT INTO estados_envio (descripcion) VALUES 
('Recibido'), ('En Tránsito'), ('Entregado');

INSERT INTO encomiendas (id_cliente, id_sucursal_origen, id_estado, peso_kg) VALUES 
(1, 1, 1, 12.5),
(2, 2, 2, 3.2);

INSERT INTO categorias (nombre) VALUES 
('Electrónica'), ('Hogar');

INSERT INTO productos (nombre, precio, id_categoria) VALUES 
('Monitor Gamer', 250000, 1),
('Silla Oficina', 85000, 2),
('Teclado Mecánico', 45000, 1);

INSERT INTO pedidos (id_cliente, fecha_pedido) VALUES 
(1, CURRENT_DATE),
(2, CURRENT_DATE);

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES 
(1, 1, 1, 250000),
(1, 3, 1, 45000), 
(2, 2, 2, 85000);  

INSERT INTO tipos_transaccion (nombre_tipo) VALUES 
('Abono'), ('Cargo');

INSERT INTO cuentas (id_cliente, numero_cuenta, saldo) VALUES 
(1, '999-001', 500000),
(2, '999-002', 150000);

INSERT INTO transacciones (id_cuenta, id_tipo, monto) VALUES 
(1, 1, 500000), 
(2, 1, 150000); 