define("UsrCreatingContactFromBusinessProcessPage", [], function() {
	return {
		entitySchemaName: "",
		attributes: {},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("UsrPhoneNumber", this.phoneValidator);
			},
			
			phoneValidator: function(value) {
				var invalidMessage = "";
				var regx = /^38[0-9]{10}.*$/;
				var isValid = true;
				var mobileMumber = value || this.get("UsrPhoneNumber");
				isValid = (Ext.isEmpty(mobileMumber) ||
				regx.test(mobileMumber));
				if (!isValid) {
					invalidMessage = this.get("Resources.Strings.invalidMessage");
				}
				return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
				};
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Button-be6148b819154a0791eaee8f1635d859",
				"values": {
					"enabled": true
				}
			},
			{
				"operation": "insert",
				"name": "STRINGe7108898-c957-4a70-999b-fad55187a143",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrFullName",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRINGbed784de-d5d0-4859-b560-b91a68eaef73",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrPhoneNumber",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "LOOKUPe3b040b1-ff49-4bbc-80a6-14e5afc14450",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrAccount",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "STRINGacb65e08-e990-4bea-8ffa-93453bc111b5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrEmail",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			}
		]/**SCHEMA_DIFF*/
	};
});
