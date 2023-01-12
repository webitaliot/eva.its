DECLARE
-- Название схемы создаваемой детали.
@DetailSchemaName NCHAR(100) = 'UsrBarcodeDetail',
-- Заголовок детали.
@DetailCaption NCHAR(100) = 'Бар-коды',
--Название схемы объекта, к которому привязывается деталь.
@EntitySchemaName NCHAR(100) = 'UsrBarcode'

INSERT INTO SysDetail(
    ProcessListeners,
    Caption,
    DetailSchemaUId,
    EntitySchemaUId
)
VALUES (
    0,
    @DetailCaption,
    (SELECT TOP 1 UId
    FROM SysSchema
    WHERE name = @DetailSchemaName),
    (SELECT TOP 1 UId
    FROM SysSchema
    WHERE name = @EntitySchemaName)
)