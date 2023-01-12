define("UsrCallsMessagePublisherPage", ["ProcessModuleUtilities"],
	function(ProcessModuleUtilities) {
		return {
			entitySchemaName: "UsrSMSPanel",
			attributes: {
				"UsrSMSTemplate": {
				lookupListConfig: {
					columns: ["Description"]

				}
			},
			},
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			methods: {
				init: function()
				{
					this.callParent(arguments);
					this.on("change:UsrSMSTemplate", this.setDescription, this);
					
					var config = this.getListenerRecordData();
					if (!config) {
						return;
					}
					if(config.relationColumnName=="Case"){
						var additionalInfo = config.additionalInfo;
						var contact = this.getContactLookupValue(additionalInfo && additionalInfo.contact);
						this.set("UsrContact", contact);
					}
					if(config.relationColumnName=="Contact"){
						var contactId = config.relationSchemaRecordId;
						var name = config.additionalInfo.contact.displayValue;
						this.set("UsrContact", {value: contactId, displayValue: name});
					}
				},
				setValidationConfig: function ()
				{
					this.callParent(arguments);
					this.addColumnValidator("Description", this.DescriptionValidator);
				},
				SendSMS: function()
				{
					var config = this.getListenerRecordData();
					if (!config) {
						return;
					}
					if(config.relationColumnName=="Case"){
						var relationSchemaRecordId = config.relationSchemaRecordId;
						var text = this.get("Description");
						var contactId = this.get("UsrContact");
						var args = {
							sysProcessName: "UsrSendSMSFromSectionDashboard",
							parameters: {
								CaseId: relationSchemaRecordId, 
								Template: text,
								ContactId: contactId.value
							}
						};
						ProcessModuleUtilities.executeProcess(args);
					}
					if(config.relationColumnName=="Contact"){
						var text = this.get("Description");
						var contactId = this.get("UsrContact");
						var args = {
							sysProcessName: "UsrSendSMSFromSectionDashboard",
							parameters: {
								Template: text,
								ContactId: contactId.value
							}
						};
						ProcessModuleUtilities.executeProcess(args);
					}
				},
				getContactLookupValue: function(config) {
					var result = this.Ext.isObject(config) ? {
						Account: config.Account,
						displayValue: config.displayValue,
						value: config.value
					} : null;
					return result;
				},
				DescriptionValidator: function ()
				{
					var invalidMessage = "";
					if(this.get("Description")){
						if (this.get("Description").length > 70 ) {
							invalidMessage = "В тексте больше 70 знаков";
					}
					}
					return {
					fullInvalidMessage: invalidMessage,
					invalidMessage: invalidMessage
					};
				},
				setDescription: function ()
				{
					if(this.get("UsrSMSTemplate"))
					{
						this.set("Description", this.get("UsrSMSTemplate").Description);
					}
				}
			},
			rules: {},
			diff: /**SCHEMA_DIFF*/[
				{
					"operation": "merge",
					"name": "PublishButton",
					"values": {
						"caption": "Отправить",
						"click": {"bindTo": "SendSMS"}
					}
				},
				{
					"operation": "insert",
					"propertyName": "items",
					"parentName": "LayoutContainer",
					"name": "MainGridLayout",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.GRID_LAYOUT,
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "UsrContact",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 10
						},
						"bindTo": "UsrContact"
					}
				},
				{
					"operation": "insert",
					"name": "UsrSMSTemplate",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"layout": {
							"column": 10,
							"row": 0,
							"colSpan": 10
						},
						"bindTo": "UsrSMSTemplate"
					}
				},
				{
					"operation": "insert",
					"name": "Description",
					"parentName": "MainGridLayout",
					"propertyName": "items",
					"values": {
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 20,
							"rowSpan": 2
						},
						"bindTo": "Description"
					}
				},
				]/**SCHEMA_DIFF*/
		};
	});


 