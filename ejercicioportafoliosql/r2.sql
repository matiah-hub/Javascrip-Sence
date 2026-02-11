SELECT s.nombre, s.sueldo
FROM reparto_soltera_otra_vez s
LEFT JOIN reparto_papi_ricky p ON s.nombre = p.nombre
WHERE p.nombre IS NULL 
AND s.sueldo > 90;