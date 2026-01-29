SELECT 'Total Ventas Retail' as Concepto, SUM(cantidad * precio_unitario) as Valor FROM detalle_pedido
UNION
SELECT 'Total Fondos Bancarios', SUM(saldo) FROM cuentas
UNION
SELECT 'Peso Total Encomiendas', SUM(peso_kg) FROM encomiendas;