define("UsrBarcodePage", [], function() {
    return {
        entitySchemaName: "UsrBarcode",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        methods: {},
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "UsrProductCode",
                "parentName": "Header",
                "propertyName": "items",
                "values": {
                    "bindTo": "UsrProductCode",
                    "layout": {"column": 0, "row": 0, "colSpan": 12},
                    "enabled": false
                }
            },
            {
                "operation": "insert",
                "name": "UsrCode",
                "parentName": "Header",
                "propertyName": "items",
                "values": {
                    "bindTo": "UsrCode",
                    "layout": {"column": 0, "row": 1, "colSpan": 12},
                }
            },
        ]/**SCHEMA_DIFF*/
    };
});