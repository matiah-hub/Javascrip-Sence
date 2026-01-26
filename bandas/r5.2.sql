SELECT bd.anio_disco, COUNT(DISTINCT bd.nombre_banda) AS cantidad_bandas
FROM bandas_discos bd
GROUP BY bd.anio_disco
ORDER BY cantidad_bandas DESC, bd.anio_disco DESC;