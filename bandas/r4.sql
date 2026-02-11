SELECT nombre_banda, COUNT(nombre_disco) AS total_discos
FROM bandas_discos
GROUP BY nombre_banda
ORDER BY total_discos DESC;