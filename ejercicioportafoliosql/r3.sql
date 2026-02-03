(SELECT nombre, sueldo FROM reparto_soltera_otra_vez WHERE sueldo < 85
 EXCEPT
 SELECT s.nombre, s.sueldo FROM reparto_soltera_otra_vez s JOIN reparto_papi_ricky p ON s.nombre = p.nombre)
UNION
(SELECT nombre, sueldo FROM reparto_papi_ricky WHERE sueldo < 85
 EXCEPT
 SELECT p.nombre, p.sueldo FROM reparto_papi_ricky p JOIN reparto_soltera_otra_vez s ON s.nombre = p.nombre);