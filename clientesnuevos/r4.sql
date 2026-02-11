SELECT c.nombre, SUM(ct.saldo) AS saldo_total, COUNT(ct.id_cuenta) AS n_cuentas
FROM Clientes c
JOIN Cuentas ct ON c.id_cliente = ct.id_cliente
GROUP BY c.id_cliente, c.nombre
HAVING COUNT(ct.id_cuenta) > 1
ORDER BY saldo_total DESC;