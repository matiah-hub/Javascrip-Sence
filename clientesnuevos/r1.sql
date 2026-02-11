SELECT c.nombre, ct.id_cuenta, ct.saldo
FROM Clientes c
JOIN Cuentas ct ON c.id_cliente = ct.id_cliente
WHERE c.edad = (SELECT MAX(edad) FROM Clientes);