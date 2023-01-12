define("PortalCasePage", [], function() {
	return {
		entitySchemaName: "Case",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrApplicationAuthor": {
				"1731cf9d-09c6-4ab3-b324-8ab5533af1d8": {
					"uId": "1731cf9d-09c6-4ab3-b324-8ab5533af1d8",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrApplicationAuthor"
							},
							"rightExpression": {
								"type": 0,
								"value": "YouScan",
								"dataValueType": 1
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "ProcessingTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "SatisfactionLevelComment",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "move",
				"name": "ServiceItem",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "move",
				"name": "CaseCategory",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "move",
				"name": "ResponseCaptionProfile",
				"parentName": "ResponseGridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "move",
				"name": "SolutionCaptionProfile",
				"parentName": "SolutionGridLayout",
				"propertyName": "items",
				"index": 0
			}
		]/**SCHEMA_DIFF*/
	};
});
