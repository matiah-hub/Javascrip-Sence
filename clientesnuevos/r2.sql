SELECT AVG(c.edad) AS promedio_edad_deudores
FROM Clientes c
JOIN Cuentas ct ON c.id_cliente = ct.id_cliente
WHERE ct.saldo < 0;