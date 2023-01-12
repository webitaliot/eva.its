define("UsrShareDetailPage", [], function() {
    return {
        // Название схемы объекта детали.
        entitySchemaName: "UsrShares",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        // Массив модификаций.
        diff: /**SCHEMA_DIFF*/[
            // Метаданные для добавления поля [Заказ].
            {
                "operation": "insert",
                //Название поля.
                "name": "UsrRuleId",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 1,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrRuleId"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
            // Метаданные для добавления поля [Контакт].
            {
                "operation": "insert",
                //Название поля.
                "name": "UsrRuleName",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 2,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Contact] схемы объекта.
                    "bindTo": "UsrRuleName"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 1
            },
             {
                "operation": "insert",
                //Название поля.
                "name": "UsrDiscountPercent",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 3,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrDiscountPercent"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
            {
                "operation": "insert",
                //Название поля.
                "name": "UsrDiscountAmount",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 4,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrDiscountAmount"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            }, 
            {
                "operation": "insert",
                //Название поля.
                "name": "UsrPriceDiscounted",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 5,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrPriceDiscounted"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
             {
                "operation": "insert",
                //Название поля.
                "name": "UsrRuleSetId",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 6,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrRuleSetId"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
             {
                "operation": "insert",
                //Название поля.
                "name": "UsrProductShares",
                "values": {
                    // Настройка расположения поля на странице редактирования.
                    "layout": {
                        "colSpan": 12,
                        "rowSpan": 1,
                        "column": 0,
                        "row": 0,
                        "layoutName": "Header"
                    },
                    // Привязка к колонке [Order] схемы объекта.
                    "bindTo": "UsrProductShares"
                },
                "parentName": "Header",
                "propertyName": "items",
                "index": 0
            },
        ]/**SCHEMA_DIFF*/,
        methods: {},
        rules: {}
    };
});