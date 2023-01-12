define("ContactCareerPageInContactV2", [], function() {
	return {
		entitySchemaName: "ContactCareer",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrINN": {
				"1b4ef585-4f72-4536-bcd6-d82d01d0852c": {
					"uId": "1b4ef585-4f72-4536-bcd6-d82d01d0852c",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Contact",
								"attributePath": "Type"
							},
							"rightExpression": {
								"type": 0,
								"value": "60733efc-f36b-1410-a883-16d83cab0980",
								"dataValueType": 10
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
				"name": "Contact",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Primary",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Current",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Account",
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
				"operation": "move",
				"name": "Account",
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "Job",
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
				"name": "JobTitle",
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
				"name": "Department",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				}
			},
			{
				"operation": "merge",
				"name": "DecisionRole",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3
					}
				}
			},
			{
				"operation": "merge",
				"name": "StartDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "DueDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "JobChangeReason",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					}
				}
			},
			{
				"operation": "merge",
				"name": "Description",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6
					}
				}
			},
			{
				"operation": "insert",
				"name": "STRING69b77b01-9944-4aa6-b97e-e0b209b7b7ef",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5,
						"layoutName": "Header"
					},
					"bindTo": "UsrINN",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 12
			}
		]/**SCHEMA_DIFF*/
	};
});
