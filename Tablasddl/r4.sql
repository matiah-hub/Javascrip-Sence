UPDATE facturas SET fecha = '2026-01-10' WHERE id = 1;
UPDATE facturas SET fecha = '2026-01-15' WHERE id = 2;
UPDATE facturas SET fecha = '2026-01-20' WHERE id = 3;
UPDATE facturas SET fecha = '2026-01-25' WHERE id = 4;
UPDATE facturas SET fecha = '2026-01-28' WHERE id = 5;

ALTER TABLE existencias 
DROP COLUMN pesokg;