SELECT c.nombre, SUM(ct.saldo) AS saldo_total_combinado
FROM Clientes c
JOIN Cuentas ct ON c.id_cliente = ct.id_cliente
WHERE c.id_cliente IN (
    SELECT id_cliente 
    FROM Cuentas 
    WHERE saldo < 0
)
GROUP BY c.id_cliente, c.nombre
ORDER BY saldo_total_combinado ASC;