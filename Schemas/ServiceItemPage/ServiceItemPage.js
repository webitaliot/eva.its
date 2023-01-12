define("ServiceItemPage", [], function() {
	return {
		entitySchemaName: "ServiceItem",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrMode21370ee3-032d-498e-9203-5816aed3fc22",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrMode"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrNotFiltredfe13bfd6-edc3-4232-bb9d-c0afd5967d48",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrNotFiltred"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "NotesFilesTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "move",
				"name": "ReactionTimeValue",
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_DIFF*/,
		methods: {},
		rules: {},
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/
	};
});
