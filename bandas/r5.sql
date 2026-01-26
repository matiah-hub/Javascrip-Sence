SELECT bd.anio_disco
FROM bandas_discos bd
GROUP BY bd.anio_disco
HAVING COUNT(DISTINCT bd.nombre_banda) = (SELECT COUNT(*) FROM bandas)
ORDER BY bd.anio_disco;