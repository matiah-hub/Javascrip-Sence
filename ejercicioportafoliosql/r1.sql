SELECT 
    s.nombre, 
    s.sueldo AS "sueldo en soltera", 
    p.sueldo AS "sueldo en papi", 
    (s.sueldo + p.sueldo) AS "sueldo sumado"
FROM reparto_soltera_otra_vez s
JOIN reparto_papi_ricky p ON s.nombre = p.nombre
ORDER BY s.nombre ASC;
