define("AccountPageV2", [],
    function() {
        return {
            entitySchemaName: "Account",
            details: /**SCHEMA_DETAILS*/{
			"UsrSchedule": {
				"schemaName": "UsrAccountScheduleDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrAccount"
				}
			}
		}/**SCHEMA_DETAILS*/,
            modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "AccountPhotoContainer",
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
				"name": "AccountName",
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
				"operation": "merge",
				"name": "AccountPhone",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "remove",
				"name": "AccountPhone",
				"properties": [
					"className",
					"showValueAsLink",
					"href",
					"linkclick"
				]
			},
			{
				"operation": "move",
				"name": "AccountPhone",
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "AccountOwner",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				}
			},
			{
				"operation": "insert",
				"name": "UsrRegion",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrRegionCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrFilial",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrFilialCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "merge",
				"name": "AccountPageGeneralTabContainer",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "insert",
				"name": "UsrExceptionsShop",
				"values": {
					"enabled": false,
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrExceptionsShopCaption"
					}
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Code",
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
				"name": "UsrNote",
				"values": {
					"enabled": false,
					"contentType": 0,
					"layout": {
						"colSpan": 24,
						"rowSpan": 2,
						"column": 0,
						"row": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrNoteCaption"
					}
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrComment1a51cdde8-9c6c-44cc-a025-8a12db69fbab",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "AccountPageGeneralInfoBlock"
					},
					"bindTo": "UsrComment1"
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrComment21163c570-be37-49f5-953f-33409a487fbb",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "AccountPageGeneralInfoBlock"
					},
					"bindTo": "UsrComment2"
				},
				"parentName": "AccountPageGeneralInfoBlock",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrSchedule",
				"values": {
					"itemType": 2
				},
				"parentName": "AccountPageGeneralTabContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "ContactsAndStructureTabContainer",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "merge",
				"name": "RelationshipTabContainer",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTabContainer",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "merge",
				"name": "NotesTabContainer",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 6
				}
			},
			{
				"operation": "remove",
				"name": "AccountType"
			},
			{
				"operation": "remove",
				"name": "AccountWeb"
			},
			{
				"operation": "remove",
				"name": "NewAccountCategory"
			},
			{
				"operation": "remove",
				"name": "AccountIndustry"
			},
			{
				"operation": "remove",
				"name": "AlternativeName"
			},
			{
				"operation": "remove",
				"name": "CategoriesControlGroup"
			},
			{
				"operation": "remove",
				"name": "CategoriesControlGroupContainer"
			},
			{
				"operation": "remove",
				"name": "EmployeesNumber"
			},
			{
				"operation": "remove",
				"name": "Ownership"
			},
			{
				"operation": "remove",
				"name": "AnnualRevenue"
			},
			{
				"operation": "remove",
				"name": "AccountBillingInfo"
			},
			{
				"operation": "remove",
				"name": "AccountAnniversary"
			},
			{
				"operation": "remove",
				"name": "PortalUserInOrganization"
			}
		]/**SCHEMA_DIFF*/,
            messages: {},
            methods: {}
        };
    });
