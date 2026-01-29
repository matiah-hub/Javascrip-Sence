SELECT s.nombre as sucursal, ee.descripcion as estado, COUNT(enc.id_encomienda) as cantidad
FROM sucursales s
JOIN encomiendas enc ON s.id_sucursal = enc.id_sucursal_origen
JOIN estados_envio ee ON enc.id_estado = ee.id_estado
GROUP BY s.nombre, ee.descripcion;