SELECT bd.nombre_disco, bd.nombre_banda, bd.anio_disco, b.pais
FROM bandas_discos bd
JOIN bandas b ON bd.nombre_banda = b.nombre
WHERE b.pais <> 'Alemania' 
  AND bd.anio_disco >= 2000;