SELECT c.nombre, COUNT(ct.id_cuenta) AS cantidad_cuentas
FROM Clientes c
JOIN Cuentas ct ON c.id_cliente = ct.id_cliente
GROUP BY c.nombre
HAVING COUNT(ct.id_cuenta) > 1
ORDER BY cantidad_cuentas DESC;