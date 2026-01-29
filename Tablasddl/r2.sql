INSERT INTO productos (nombre, descripcion) VALUES 
('Laptop Pro', '16GB RAM, 512GB SSD'),
('Mouse Ergonómico', 'Conexión Bluetooth 5.0'),
('Teclado Mecánico', 'Switch Blue, RGB'),
('Monitor 27"', '4K UHD IPS'),
('Audífonos Gamer', 'Sonido Surround 7.1'),
('Webcam HD', 'Resolución 1080p'),
('Disco Externo', '2TB USB 3.0'),
('Pad Mouse', 'Superficie de microfibra'),
('Hub USB-C', '4 puertos USB 3.0'),
('Soporte Laptop', 'Aluminio ajustable');
INSERT INTO existencias (id_producto, cantidad, precio, pesokg) VALUES
(1, 15, 1200000, 2),
(2, 50, 25000, 1),
(3, 30, 45000, 1),
(4, 20, 350000, 5),
(5, 40, 60000, 1),
(6, 25, 40000, 1),
(7, 10, 85000, 1),
(8, 100, 15000, 1),
(9, 35, 20000, 1),
(10, 15, 30000, 2);
INSERT INTO facturas (rut_comprador, rut_vendedor) VALUES 
('12.345.678-9', '99.888.777-6'),
('15.222.333-4', '99.888.777-6'),
('20.111.444-5', '88.555.444-3'),
('11.999.888-7', '88.555.444-3'),
('18.777.666-2', '99.888.777-6');
INSERT INTO detalle_facturas (id_factura, id_producto) VALUES 
(1, 1), (1, 2), (1, 3),              
(2, 4), (2, 5), (2, 6), (2, 7),      
(3, 8), (3, 9), (3, 10), (3, 1), (3, 2), 
(4, 3), (4, 4), (4, 5),             
(5, 6), (5, 7), (5, 8), (5, 9);       