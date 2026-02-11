SELECT bd.nombre_banda, bd.nombre_disco, MAX(bd.anio_disco) AS anio_reciente
FROM bandas_discos bd
JOIN bandas b ON bd.nombre_banda = b.nombre
WHERE b.pais = 'UK' 
  AND bd.nombre_banda LIKE '%s'
GROUP BY bd.nombre_banda, bd.nombre_disco
ORDER BY anio_reciente DESC;