SELECT 
    f.id AS factura_n, 
    p.nombre AS producto, 
    e.precio AS precio_unitario
FROM facturas f
JOIN detalle_facturas df ON f.id = df.id_factura
JOIN productos p ON df.id_producto = p.id
JOIN existencias e ON p.id = e.id_producto
WHERE f.id = 1; 