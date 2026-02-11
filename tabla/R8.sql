SELECT c.nombre, cta.numero_cuenta, cta.saldo
FROM clientes c
JOIN cuentas cta ON c.id_cliente = cta.id_cliente;