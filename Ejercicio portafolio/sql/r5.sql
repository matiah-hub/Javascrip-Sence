WITH ranking_usuarios AS (
  SELECT id_usuario, COUNT(*) AS cantidad_ordenes
  FROM ordenes
  WHERE fecha BETWEEN '2022-01-01' AND '2022-12-31'
  GROUP BY id_usuario
)
SELECT u.nombre, r.cantidad_ordenes
FROM ranking_usuarios r
JOIN usuarios u ON r.id_usuario = u.id_usuario
ORDER BY cantidad_ordenes DESC
LIMIT 1;