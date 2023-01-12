DECLARE
-- Название схемы страницы детали.
@CardSchemaName NCHAR(100) = 'UsrBarcodePage',
-- Название схемы объекта, к которому привязывается деталь.
@EntitySchemaName NCHAR(100) = 'UsrBarcode',
-- Заголовок страницы детали.
@PageCaption NCHAR(100) = 'Страница "Бар-код"',
-- Пустая строка.
@Blank NCHAR(100) = ''

-- Добавление записи в таблицу SysModuleEntity.
INSERT INTO SysModuleEntity(
    ProcessListeners,
    SysEntitySchemaUId
)
VALUES(
    0,
    (SELECT TOP 1 UId
    FROM SysSchema
    WHERE Name = @EntitySchemaName
    )
)

-- Добавление записи в таблицу SysModuleEdit
INSERT INTO SysModuleEdit(
    SysModuleEntityId,
    UseModuleDetails,
    Position,
    HelpContextId,
    ProcessListeners,
    CardSchemaUId,
    ActionKindCaption,
    ActionKindName,
    PageCaption
)
VALUES (
    (SELECT TOP 1 Id
    FROM SysModuleEntity
    WHERE SysEntitySchemaUId = (
        SELECT TOP 1 UId
        FROM SysSchema
        WHERE Name = @EntitySchemaName
        )
    ),
    1,
    0,
    @Blank,
    0,
    (SELECT TOP 1 UId
     FROM SysSchema
     WHERE name = @CardSchemaName
    ),
    @Blank,
    @Blank,
    @PageCaption
)