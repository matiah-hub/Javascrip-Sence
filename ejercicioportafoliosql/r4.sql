DROP TABLE IF EXISTS reparto_actores CASCADE;
DROP TABLE IF EXISTS actores CASCADE;
DROP TABLE IF EXISTS teleseries CASCADE;


CREATE TABLE actores (
    id_actor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE teleseries (
    id_teleserie SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE
);
CREATE TABLE reparto_actores (
    id_actor INT REFERENCES actores(id_actor),
    id_teleserie INT REFERENCES teleseries(id_teleserie),
    sueldo INTEGER,
    protagonico BOOLEAN,
    PRIMARY KEY (id_actor, id_teleserie)
	);