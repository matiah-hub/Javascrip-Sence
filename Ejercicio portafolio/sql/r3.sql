UPDATE productos 
SET precio = ROUND(precio * 0.80, 2);
SELECT p.id_producto, p.nombre, i.stock
FROM inventario i
JOIN productos p USING (id_producto)
WHERE i.stock <= 5;
INSERT INTO ordenes (id_usuario, fecha) VALUES (5, '2022-12-28');
INSERT INTO orden_items (id_orden, id_producto, cantidad, precio_unitario) 
VALUES 
((SELECT MAX(id_orden) FROM ordenes), 2, 1, 96000), 
((SELECT MAX(id_orden) FROM ordenes), 5, 1, 28000);