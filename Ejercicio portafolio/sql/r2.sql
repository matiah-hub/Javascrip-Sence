
INSERT INTO usuarios (nombre, email) VALUES
('Juan Pérez', 'juan@perez.cl'),
('María Soto', 'm.soto@gmail.com'),
('Carlos Ruiz', 'cruiz88@outlook.com'),
('Ana López', 'alopez@empresa.com'),
('Luisa Jara', 'luisa.jara@duoc.cl');


INSERT INTO productos (nombre, precio) VALUES
('Smartphone Galaxy', 450000),
('Audífonos Sony', 120000),
('Cargador USB-C', 15000),
('Laptop Gamer Pro', 1200000),
('Mouse Ergonómico', 35000);


INSERT INTO inventario (id_producto, stock) VALUES
(1, 10),
(2, 2),  
(3, 25), 
(4, 4),
(5, 1); 

INSERT INTO ordenes (id_usuario, fecha) VALUES
(1, '2022-12-05'),
(2, '2022-12-10'),
(3, '2022-12-15'),
(1, '2022-12-20'),
(4, '2022-11-25'); 

INSERT INTO orden_items (id_orden, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 450000), (1, 3, 2, 15000),
(2, 2, 1, 120000),
(3, 4, 1, 1200000),
(4, 5, 2, 35000),
(5, 1, 1, 450000);