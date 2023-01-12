define("ProductPageV2", [],
    function() {
        return {
            entitySchemaName: "Product",
            attributes: {},
            details: /**SCHEMA_DETAILS*/{
			"BarcodeDetail": {
				"schemaName": "UsrBarcodeDetail",
				"entitySchemaName": "UsrBarcode",
				"filter": {
					"detailColumn": "UsrProductCode",
					"masterColumn": "Code"
				}
			}
		}/**SCHEMA_DETAILS*/,
            mixins: {},
            methods: {
            },
            modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Name",
				"values": {
					"layout": {
						"colSpan": 20,
						"rowSpan": 1,
						"column": 3,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Type",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Unit",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Code",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "URL",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "IsArchive",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "ProductGeneralInfoTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "Price",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Tax",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "insert",
				"name": "UsrFormatf7521f13-016c-4354-8866-a0fcde1f11dc",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProductPriceBlock"
					},
					"bindTo": "UsrFormat"
				},
				"parentName": "ProductPriceBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "BarcodeDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail",
					"layout": {
						"column": 0,
						"row": 3,
						"colSpan": 24
					}
				},
				"parentName": "ProductGeneralInfoTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ProductFilesTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			}
		]/**SCHEMA_DIFF*/
        };
    });
