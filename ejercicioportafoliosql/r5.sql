INSERT INTO actores (nombre)
SELECT nombre FROM (SELECT nombre FROM reparto_soltera_otra_vez UNION SELECT nombre FROM reparto_papi_ricky) AS total;

INSERT INTO teleseries (nombre) VALUES ('Soltera Otra Vez'), ('Papi Ricky');
INSERT INTO reparto_actores (id_actor, id_teleserie, sueldo, protagonico)
SELECT a.id_actor, 1, r.sueldo, r.protagonico
FROM reparto_soltera_otra_vez r
JOIN actores a ON r.nombre = a.nombre;
INSERT INTO reparto_actores (id_actor, id_teleserie, sueldo, protagonico)
SELECT a.id_actor, 2, r.sueldo, r.protagonico
FROM reparto_papi_ricky r
JOIN actores a ON r.nombre = a.nombre;