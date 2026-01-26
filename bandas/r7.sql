SELECT nombre_banda, COUNT(nombre_disco) AS cantidad_discos
FROM bandas_discos
WHERE nombre_disco LIKE '% %'
GROUP BY nombre_banda
ORDER BY cantidad_discos DESC;