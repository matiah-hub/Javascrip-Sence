SELECT c.nombre, SUM(dp.cantidad * dp.precio_unitario) as total_comprado
FROM clientes c
JOIN pedidos p ON c.id_cliente = p.id_cliente
JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
GROUP BY c.nombre;