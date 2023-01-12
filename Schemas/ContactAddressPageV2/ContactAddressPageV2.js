define("ContactAddressPageV2", ["BusinessRuleModule", "UsrConstants"], function(BusinessRuleModule, UsrConstants) {
    return {
        entitySchemaName: "ContactAddress",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        rules: {},
        attributes: {
			"IsEnabled": {
			   dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
			   value: true
			},
		},
        methods: {
            onEntityInitialized: function(){
                this.callParent(arguments);
                this.getIsEnable();
                this.defaultCountry();
            },
            defaultCountry: function(){
                this.loadLookupDisplayValue("Country", UsrConstants.County.Ukraine);
            },
            
            getIsEnable: function(){
            	var esqContact = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				    rootSchemaName: "Contact"
				});

				esqContact.addColumn("UsrNumberActiveCard");
				
				esqContact.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var esqFirstFilter = esqContact.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"Id", this.get("Contact").value);
			
				esqContact.filters.add("esqFirstFilter", esqFirstFilter);

					
				esqContact.getEntityCollection(function (result){
					if(result.success){
						var collection = result.collection;
						if(collection.getCount() > 0){
							var UsrNumberActiveCard = collection.getItems()[0].values.UsrNumberActiveCard;
							if(UsrNumberActiveCard){
								var esqUserInRole = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								    rootSchemaName: "SysUserInRole"
								});
				
								esqUserInRole.addColumn("SysRole");
								esqUserInRole.addColumn("SysUser");
								
								esqUserInRole.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
								var esqFirstFilter = esqUserInRole.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"SysUser", Terrasoft.core.enums.SysValue.CURRENT_USER.value);
								var esqSecondFilter  = esqUserInRole.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
									"SysRole", "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a");
							
								esqUserInRole.filters.add("esqFirstFilter", esqFirstFilter);
								esqUserInRole.filters.add("esqSecondFilter", esqSecondFilter);
								esqUserInRole.getEntityCollection(function (res){
									if(res.success){
										var curcollection = res.collection;
										if(curcollection.getCount() > 0 && UsrNumberActiveCard){
											this.set("IsEnabled", false);
										}
										else{
											this.set("IsEnabled", true);
										}
									}
								}, this);
							}
						}
					}
					//var role = this.get("UsrUserInRole");
				}, this);
            }
        },
        modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "Country",
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
				"name": "AddressType",
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
				"name": "UsrHouse",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrHouseCaption"
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrApartment",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrApartmentCaption"
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "City",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				}
			},
			{
				"operation": "move",
				"name": "City",
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "Primary",
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
				"operation": "move",
				"name": "Primary",
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "Region",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"caption": "Область"
				}
			},
			{
				"operation": "merge",
				"name": "Zip",
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
				"operation": "insert",
				"name": "UsrStreet",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "merge",
				"name": "Address",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					},
					"enabled": "IsEnabled"
				}
			}
		]/**SCHEMA_DIFF*/
    };
});