SELECT DISTINCT b.nombre, b.pais, bd.nombre_disco, bd.anio_disco
FROM bandas b
JOIN bandas_discos bd ON b.nombre = bd.nombre_banda
WHERE b.pais = 'Alemania' 
  AND (b.nombre LIKE '%K%' OR b.nombre LIKE '%k%')
  AND bd.anio_disco >= 1999;