SELECT 
    SUM(cantidad * precio_unitario) AS subtotal_neto,
    ROUND(SUM(cantidad * precio_unitario) * 0.19, 2) AS monto_iva,
    ROUND(SUM(cantidad * precio_unitario) * 1.19, 2) AS total_pagar
FROM orden_items
WHERE id_orden = (SELECT MAX(id_orden) FROM ordenes);
SELECT SUM(oi.cantidad * oi.precio_unitario) AS ventas_totales_diciembre
FROM ordenes o
JOIN orden_items oi ON o.id_orden = oi.id_orden
WHERE o.fecha BETWEEN '2022-12-01' AND '2022-12-31';