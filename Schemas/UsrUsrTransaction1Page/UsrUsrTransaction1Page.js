define("UsrUsrTransaction1Page", [], function() {
	return {
		entitySchemaName: "UsrTransaction",
		details: /**SCHEMA_DETAILS*/{
	"UsrSchema2Detail": {
		"schemaName": "UsrSchema2Detail",
		"entitySchemaName": "UsrTransaction",
		"filter": {
			"detailColumn": "UsrTransaction",
			"masterColumn": "Id"
		}
	},
	"UsrSchema2Detail28727097": {
		"schemaName": "UsrSchema2Detail",
		"entitySchemaName": "UsrProductInTransaction",
		"filter": {
			"detailColumn": "UsrTransaction",
			"masterColumn": "Id"
		}
	}
}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
	{
		"operation": "insert",
		"name": "Name1f49defa-e6e8-4697-8bba-7626da117b55",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 0,
				"layoutName": "Header"
			},
			"bindTo": "Name",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrDate563041c3-c457-47ac-b62c-a2b8af52f391",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 12,
				"row": 0,
				"layoutName": "Header"
			},
			"bindTo": "UsrDate",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 1
	},
	{
		"operation": "insert",
		"name": "UsrType2d14d34c-ddd0-4938-aacf-1bbd9a298a21",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 1,
				"layoutName": "Header"
			},
			"bindTo": "UsrType",
			"enabled": false,
			"contentType": 5
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "insert",
		"name": "UsrAmountTotal076c3501-54e5-4534-bb49-9ba211ed82c6",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 12,
				"row": 1,
				"layoutName": "Header"
			},
			"bindTo": "UsrAmountTotal",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 3
	},
	{
		"operation": "insert",
		"name": "UsrAmounte42e9629-d5e6-4eb4-a550-46ffc84a2e7f",
		"values": {
			"layout": {
				"colSpan": 6,
				"rowSpan": 1,
				"column": 0,
				"row": 2,
				"layoutName": "Header"
			},
			"bindTo": "UsrAmount",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "insert",
		"name": "UsrAmountCharge2ea7dc37-3110-459c-8cad-57cb20cd93b2",
		"values": {
			"layout": {
				"colSpan": 6,
				"rowSpan": 1,
				"column": 6,
				"row": 2,
				"layoutName": "Header"
			},
			"bindTo": "UsrAmountCharge",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 5
	},
	{
		"operation": "insert",
		"name": "UsrAmountBonusb0d10639-7e93-4ad9-9810-de3248f4eb4b",
		"values": {
			"layout": {
				"colSpan": 6,
				"rowSpan": 1,
				"column": 12,
				"row": 2,
				"layoutName": "Header"
			},
			"bindTo": "UsrAmountBonus",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 6
	},
	{
		"operation": "insert",
		"name": "UsrAmountDiscount7ca9b2b8-9231-4e2a-9343-134df9398dbb",
		"values": {
			"layout": {
				"colSpan": 6,
				"rowSpan": 1,
				"column": 18,
				"row": 2,
				"layoutName": "Header"
			},
			"bindTo": "UsrAmountDiscount",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 7
	},
	{
		"operation": "insert",
		"name": "Taba25eef0aTabLabel",
		"values": {
			"caption": {
				"bindTo": "Resources.Strings.Taba25eef0aTabLabelTabCaption"
			},
			"items": []
		},
		"parentName": "Tabs",
		"propertyName": "tabs",
		"index": 0
	},
	{
		"operation": "insert",
		"name": "UsrSchema2Detail28727097",
		"values": {
			"itemType": 2,
			"markerValue": "added-detail"
		},
		"parentName": "Taba25eef0aTabLabel",
		"propertyName": "items",
		"index": 0
	}
]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
