SELECT t.nombre AS teleserie, a.nombre AS actor
FROM teleseries t
JOIN reparto_actores r ON t.id_teleserie = r.id_teleserie
JOIN actores a ON r.id_actor = a.id_actor
WHERE r.protagonico = false;