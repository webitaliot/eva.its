define("CasePage", ["ProcessModuleUtilities", "BaseFiltersGenerateModule", "UsrConstants", "ServiceDeskConstants",
		"BusinessRuleModule", "LookupPageHelper"],
	function(ProcessModuleUtilities, BaseFiltersGenerateModule, UsrConstants, ServiceDeskConstants, BusinessRuleModule) {
		return {
			entitySchemaName: "Case",
			mixins: {},
			details: /**SCHEMA_DETAILS*/{
			"CaseDetailcf019a0c": {
				"schemaName": "CaseDetail",
				"entitySchemaName": "Case",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				}
			}
		}/**SCHEMA_DETAILS*/,
			messages: {},
			modules: /**SCHEMA_MODULES*/{
			"WebPage8437caa1-ca01-4109-b4a9-9b674fe27c34": {
				"moduleId": "WebPage8437caa1-ca01-4109-b4a9-9b674fe27c34",
				"moduleName": "CardWidgetModule",
				"config": {
					"parameters": {
						"viewModelConfig": {
							"widgetKey": "WebPage8437caa1-ca01-4109-b4a9-9b674fe27c34",
							"recordId": "9e93e7e0-e2ad-4616-8a15-9148ffa46c66",
							"primaryColumnValue": {
								"getValueMethod": "getPrimaryColumnValue"
							}
						}
					}
				}
			}
		}/**SCHEMA_MODULES*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
	"Category": {
		"ea509bc8-f0b8-4e76-983b-3d2e69993621": {
			"uId": "ea509bc8-f0b8-4e76-983b-3d2e69993621",
			"enabled": true,
			"removed": false,
			"ruleType": 1,
			"baseAttributePatch": "UsrActive",
			"comparisonType": 3,
			"type": 0,
			"value": true,
			"dataValueType": 12
		}
	},
	"ServiceItem": {
		"ab7023c4-9f8e-4a6f-bd3c-9b9f1c2cb195": {
			"uId": "ab7023c4-9f8e-4a6f-bd3c-9b9f1c2cb195",
			"enabled": true,
			"removed": false,
			"ruleType": 1,
			"baseAttributePatch": "Status",
			"comparisonType": 3,
			"type": 0,
			"value": "9a32e65f-7d52-49ac-aef5-836a9a01f14e",
			"dataValueType": 10
		},
		"BindingServiceItemToOriginalServiceItem": {
			"uId": "3a6feee2-4769-4285-b64a-640cad6a2180",
			"enabled": false,
			"ruleType": 0,
			"property": 1,
			"logical": 0,
			"conditions": [
				{
					"comparisonType": 1,
					"leftExpression": {
						"type": 1,
						"attribute": "OriginalServiceItem"
					}
				}
			]
		},
		"50689508-270f-4c41-ad6c-f55b23ac5b73": {
			"uId": "50689508-270f-4c41-ad6c-f55b23ac5b73",
			"enabled": true,
			"removed": false,
			"ruleType": 0,
			"property": 1,
			"logical": 1,
			"conditions": [
				{
					"comparisonType": 3,
					"leftExpression": {
						"type": 1,
						"attribute": "Status"
					},
					"rightExpression": {
						"type": 0,
						"value": "7e9f1204-f46b-1410-fb9a-0050ba5d6c38",
						"dataValueType": 10
					}
				},
				{
					"comparisonType": 3,
					"leftExpression": {
						"type": 1,
						"attribute": "Status"
					},
					"rightExpression": {
						"type": 0,
						"value": "ae5f2f10-f46b-1410-fd9a-0050ba5d6c38",
						"dataValueType": 10
					}
				},
				{
					"comparisonType": 3,
					"leftExpression": {
						"type": 1,
						"attribute": "Status"
					},
					"rightExpression": {
						"type": 0,
						"value": "f063ebbe-fdc6-4982-8431-d8cfa52fedcf",
						"dataValueType": 10
					}
				}
			]
		}
	}
}/**SCHEMA_BUSINESS_RULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrCaseType",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"contentType": 3,
					"caption": {
						"bindTo": "Resources.Strings.UsrCaseTypeCaption"
					}
				},
				"parentName": "ResolutionGridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "CaseContact",
				"values": {
					"enabled": false,
					"contentType": 5
				}
			},
			{
				"operation": "merge",
				"name": "CaseCategory",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"enabled": {
						"bindTo": "IsCaseCategoryEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "ServiceItem",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
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
				"operation": "insert",
				"name": "UsrCityf2a66148-c2cf-4753-a85d-1f2ac9d789cd",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCity",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrRegione2aed9b4-b60c-4d75-8045-66d15c41bd12",
				"values": {
					"enabled": false,
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrRegion"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrShop",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 7
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrShopCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrComplaintKcExpert",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 8
					},
					"bindTo": "UsrComplaintKcExpert",
					"contentType": 5,
					"caption": {
						"bindTo": "Resources.Strings.UsrComplaintKcExpertCaption"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrMode5ed2005c-bbf7-4d31-9347-4d8d183efaba",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 10,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrMode"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "UsrSalerRegion5dcff80b-3cc2-40d2-8629-3f38d624c182",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 11,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrSalerRegion"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "merge",
				"name": "CaseAssignToMeButton",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 12
					}
				}
			},
			{
				"operation": "merge",
				"name": "NewCaseProfileInfoContainer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 13
					}
				}
			},
			{
				"operation": "insert",
				"name": "UsrCallEvaluationCallc73884f2-3626-48c0-bf8e-757f2f2c534b",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 14,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCallEvaluationCall"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "UsrRudenessb3515fa0-a3fe-4c8c-af56-19549a470dcb",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 15,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrRudeness"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "merge",
				"name": "TabsContainer",
				"values": {
					"className": "Terrasoft.Container"
				}
			},
			{
				"operation": "merge",
				"name": "CaseInformationTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "move",
				"name": "CaseInformationTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Subject",
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
				"operation": "insert",
				"name": "LOOKUPc990f79d-3880-4955-ab84-5db85aae01b9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "UsrNumberOfOrder",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "merge",
				"name": "Origin",
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
				"operation": "insert",
				"name": "UsrWithReaction",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"enabled": false
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrOperatorName",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"bindTo": "UsrOperatorName",
					"contentType": 5,
					"caption": {
						"bindTo": "Resources.Strings.UsrOperatorNameCaption"
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrNotify",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrActiveNumberCardPL",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"enabled": false,
					"caption": {
						"bindTo": "Resources.Strings.UsrActiveNumberCardPLCaption"
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrApplicationAuthor",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3
					}
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "LOOKUPa07fd7bd-9454-4776-8092-778209471669",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "UsrCardType",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "UsrEvaluationBoolec1e4f19-451e-499b-bd6e-6d61b4d1002c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "CaseInformation_gridLayout"
					},
					"bindTo": "UsrEvaluationBool"
				},
				"parentName": "CaseInformation_gridLayout",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "merge",
				"name": "YSCPublicationDatef7845c8b-f56f-46aa-880b-e6005403f374",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "CaseInformation_gridLayout"
					}
				}
			},
			{
				"operation": "merge",
				"name": "YSCAuthorUrl3868e81a-fb60-4d0f-9283-ebf9dede7e28",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5,
						"layoutName": "CaseInformation_gridLayout"
					}
				}
			},
			{
				"operation": "merge",
				"name": "YSCSource1eef062d-aba8-41e8-bddb-417e494f5e27",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "CaseInformation_gridLayout"
					}
				}
			},
			{
				"operation": "insert",
				"name": "AppliedControlGroup",
				"values": {
					"itemType": 15,
					"items": [],
					"caption": "Заявленные данные"
				},
				"parentName": "CaseInformationTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAppliedGridLayout",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "AppliedControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAppliedName",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": false
				},
				"parentName": "UsrAppliedGridLayout",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAppliedPhone",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"enabled": false
				},
				"parentName": "UsrAppliedGridLayout",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAppliedEmail",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"enabled": false
				},
				"parentName": "UsrAppliedGridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrAppliedCardNumber",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"enabled": false
				},
				"parentName": "UsrAppliedGridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrLanguage80d18e13-89a8-4f68-833e-410ebdcefdcf",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "UsrAppliedGridLayout"
					},
					"bindTo": "UsrLanguage"
				},
				"parentName": "UsrAppliedGridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DescriptionControlGroup",
				"values": {
					"itemType": 15,
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.UsrDescriptionGroupCaption"
					}
				},
				"parentName": "CaseInformationTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Symptoms1",
				"values": {
					"bindTo": "Symptoms",
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "DescriptionControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7214c3edTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7214c3edTabLabelTabCaption"
					},
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7214c3edTabLabelGroupd0ab56d5",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7214c3edTabLabelGroupd0ab56d5GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7214c3edTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7214c3edTabLabelGridLayoutfc36fb44",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7214c3edTabLabelGroupd0ab56d5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CaseDetailcf019a0c",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab7214c3edTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7214c3edTabLabelGroup95d51276",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7214c3edTabLabelGroup95d51276GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7214c3edTabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab7214c3edTabLabelGridLayout6e3798b9",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7214c3edTabLabelGroup95d51276",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "WebPage8437caa1-ca01-4109-b4a9-9b674fe27c34",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 10,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7214c3edTabLabelGridLayout6e3798b9",
						"useFixedColumnHeight": true
					},
					"itemType": 4,
					"classes": {
						"wrapClassName": [
							"card-widget-grid-layout-item"
						]
					}
				},
				"parentName": "Tab7214c3edTabLabelGridLayout6e3798b9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "merge",
				"name": "SolutionTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "insert",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrOwnerNameInSD",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrOwnerNameInSDCaption"
					},
					"enabled": false
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrCaseIdToSD",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrCaseIdToSDCaption"
					},
					"enabled": false
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrPlatform6e75f609-621e-4e4e-8a62-5f7ff5d316ba",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "SolutionTab_gridLayout"
					},
					"bindTo": "UsrPlatform"
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrGroup2feae6a5-7325-4c29-9ba7-4834f0210ebe",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "SolutionTab_gridLayout"
					},
					"bindTo": "UsrGroup"
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrDepartmentb396b8a0-e5f6-4430-b753-5c74dfd03432",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "SolutionTab_gridLayout"
					},
					"bindTo": "UsrDepartment"
				},
				"parentName": "SolutionTab_gridLayout",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "SolutionControlGroup",
				"values": {
					"itemType": 15,
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.SolutionControlGroupDescription"
					}
				},
				"parentName": "SolutionTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Solution1",
				"values": {
					"bindTo": "Solution",
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 1,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "SolutionControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "NotesFilesTab",
				"values": {
					"order": 3
				}
			},
			{
				"operation": "merge",
				"name": "TimelineTab",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "remove",
				"name": "CasePriority"
			},
			{
				"operation": "remove",
				"name": "CaseAccount"
			},
			{
				"operation": "remove",
				"name": "CaseGroup"
			},
			{
				"operation": "remove",
				"name": "CaseOwner"
			},
			{
				"operation": "remove",
				"name": "ProcessingTab"
			},
			{
				"operation": "remove",
				"name": "MessageHistoryGroup"
			},
			{
				"operation": "remove",
				"name": "MessageHistoryContainer"
			},
			{
				"operation": "remove",
				"name": "MessageHistory"
			},
			{
				"operation": "remove",
				"name": "ShowSystemMessagesLabel"
			},
			{
				"operation": "remove",
				"name": "HideSystemMessagesLabel"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldContainer"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldLabel_wrap"
			},
			{
				"operation": "remove",
				"name": "SolutionLabelValue"
			},
			{
				"operation": "remove",
				"name": "SolutionFieldControl_wrap"
			},
			{
				"operation": "remove",
				"name": "Solution"
			},
			{
				"operation": "remove",
				"name": "Symptoms"
			},
			{
				"operation": "remove",
				"name": "YSCSocialUrlb94fbd80-b2bb-4e23-8924-80eef9dbed63"
			},
			{
				"operation": "move",
				"name": "Calls",
				"parentName": "CaseInformationTab",
				"propertyName": "items",
				"index": 2
			}
		]/**SCHEMA_DIFF*/,
			attributes: {
				
				"UsrShop": {
				"dataValueType": Terrasoft.DataValueType.LOOKUP,	
				lookupListConfig: {
					columns: ["City", "UsrStoreNumber","Name"],
					searchColumn: "UsrStoreNumber",
					lookupPageName: "UsrStoreFiltrationForCaseBaseLookup"
				}
			},
				"Contact": {
					lookupListConfig: {
						columns: ["Language"]
					}
				},
			"UsrCity": {
				lookupListConfig: {
					columns: ["Region", "UsrSaleRegion", "UsrWeight"],
					filter: function() {
						return this.getScoringObjectFiltersUsrCity();
					},
					orders: [
						{
							columnPath: "UsrWeight",
							direction: Terrasoft.OrderDirection.DESC
						}
					],
					sortedColumns: [{
						name: "UsrWeight",
						orderPosition: 0,
						orderDirection: Terrasoft.OrderDirection.DESC
					}]
				}
			},
				"UsrCaseType": {
				lookupListConfig: {
					columns: ["UsrActive"],
					filter: function() {
						return this.getScoringObjectFiltersUsrCaseType();
					}
				}
			},
				"Status": {
					//dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [{
						columns: ["Status"],
						methodName: "enabledCaseCategory"
					}]
				},
				"Subject": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					dependencies: [{
						columns: ["ServiceItem"],
						methodName: "setSubjectByServiceItem"
					}]
				},
				"ServiceItem": {
					lookupListConfig: {
						columns: ["Status", "UsrMode"],
						filter: function() {
							var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
							var category = this.get("Category");
							// var status = this.get("ServiceItem").Status;
							filterGroup.add("NotFiltredFilter",
							Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "UsrNotFiltred", false));
							if (!category) {
								return filterGroup;
							}
							filterGroup.add("CategoryFilter",
							Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "CaseCategory", category.value));
							// if(!status){
							// 	return filterGroup;
							// }
							// filterGroup.add("ScoringObjectIsInCurrentWorkspace2",
							// 	Terrasoft.createColumnFilterWithParameter(
							// 		Terrasoft.ComparisonType.EQUAL, status.value,
							// 		'9a32e65f-7d52-49ac-aef5-836a9a01f14e', Terrasoft.DataValueType.GUID));
							return filterGroup;
						}
					}
				},
				"UsrOperatorName": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						hideActions: true,
						filter: BaseFiltersGenerateModule.OwnerFilter
					}
				},
				"UsrComplaintKcExpert": {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					lookupListConfig: {
						hideActions: true,
						filter: BaseFiltersGenerateModule.OwnerFilter
					}
				},
				"IsCaseCategoryEnabled": {
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.DataValueType.BOOLEAN
				}
			},
			methods: {
				setSubjectByServiceItem: function() {
					var serviceItem = this.get("ServiceItem");
					if (serviceItem) {
						this.set("Subject", serviceItem.Name);
					}
					else {
						this.set("Subject", null);
					}
				},
				init: function() {
					this.callParent(arguments);
					this.on("change:UsrShop", this.onChangeUsrShop, this);
					this.on("change:ServiceItem", this.onChangeUsrMode, this);
					this.on("change:Contact", this.onChangeContact, this);
					this.on("change:UsrCity", this.onChangeUsrCity, this);
					this.on("change:Category", this.onChangeCaseCategory, this);
				},
				getEmailData: function(callback) {
					this.getHistoryEmailResponse.call(this, function(response) {
						if (response && response.success)
						{
							//var items = response.collection.getItems();
							this.setEmailDataFromProfile(callback);
						}
					}, this);
				},
				onEntityInitialized: function() {
					this.callParent(arguments);
					this.enabledCaseCategory();
					this.SetCardType();
					//this.onChangeContact();
					/*var config = {
						entitySchemaName: "City",
						columns: ["Id"],
						associatedProjectId: this.get("Id"),
						multiSelect: true,
						filters: filterGroup,
						actionsButtonVisible: true,
					//указываем нашу кастомизированную схему
						lookupPageName: "UsrCustomLookupPage"
					};
					this.openLookup(
						config,
						function(selected) {
					//callback обрабатывающий результаты выбора
						},
						this
					);*/
				},
				onChangeCaseCategory: function()
				{
					if(this.get("UsrCaseType")){
						this.checkSymptoms();
					}
					this.set("ServiceItem", null);
				},
				checkSymptoms: function(){
					if(this.get("UsrCaseType").displayValue == "Жалоба"){
						if(this.get("Category").displayValue == "Интернет-магазин"){
							var symptoms = this.get("Symptoms");
							if(!symptoms.includes("Номер заказа")){
								symptoms += "<br>Номер заказа:\n";
							}
							if(!symptoms.includes("ТТН")){
								symptoms += "<br>ТТН:";
							}
							this.set("Symptoms", symptoms);
						}
						else{
							var symptoms = this.get("Symptoms");
							if(!symptoms.includes("Номер чека")){
								symptoms += "<br>Номер чека:\n";
							}
							if(!symptoms.includes("Номер кассы")){
								symptoms += "<br>Номер кассы:\n";
							}
							if(!symptoms.includes("Дата и время покупки")){
								symptoms += "<br>Дата и время покупки:\n";
							}
							if(!symptoms.includes("Сумма чека")){
								symptoms += "<br>Сумма чека:\n";
							}
							if(!symptoms.includes("Номер магазина")){
								symptoms += "<br>Номер магазина:\n";
							}
							this.set("Symptoms", symptoms);
						}
					}
				},
				getActions: function() {
						var actionMenuItems = this.callParent(arguments);
						
						actionMenuItems.addItem(this.getButtonMenuItem({
							Type: "Terrasoft.MenuSeparator",
							Caption: "",
							Click: {bindTo: "callCreateActivityAcquaintanceBP"}
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							Caption: {
									"bindTo": "Resources.Strings.StartCallEval"
								},
								"Tag": "startBPCallEvalFromCase",
								"Enabled": true
							}));
						return actionMenuItems;
					},
				startBPCallEvalFromCase: function() {
				// Получение идентификатора основного контакта контрагента.
					 var id = this.get("Id");
					// Объект, который будет передан в качестве аргумента в метод executeProcess.
					var args = {
						// Имя процесса, который необходимо запустить.
						sysProcessName: "UsrCallEvalFromCase",
						// Объект со значением входящего параметра ContactParameter для процесса CustomProcess.
						parameters: {
							CaseId: id
						}
					};
					// Запуск пользовательского бизнес-процесса.
					ProcessModuleUtilities.executeProcess(args);
				},
				onChangeUsrMode: function()
				{
					if(this.get("ServiceItem")){
						var mode = this.get("ServiceItem").UsrMode;
						//var mode1 = this.get("UsrMode");
						if(mode)
						{
							this.set("UsrMode", mode);
						}
					}
				},
				onChangeUsrShop: function()
				{
					if(this.get("UsrShop")){
						var city = this.get("UsrShop").City;
						if(city)
						{
							this.set("UsrCity", city);
						}
						else
						{
							this.set("UsrCity", null);
						}
					}
					else
					{
						this.set("UsrCity", null);
					}
				},
				
				onChangeContact: function()
				{
					if(this.get("Contact")){
						var language = this.get("Contact").Language;
						if(language)
						{
							this.set("UsrLanguage", language);
						}
						else
						{
							this.set("UsrLanguage", null);
						}
					}
					else
					{
						this.set("UsrLanguage", null);
					}
				},
				onChangeUsrCity: function()
				{
					if(this.get("UsrCity")){
						var region = this.get("UsrCity").Region;
						var sale = this.get("UsrCity").UsrSaleRegion;
						if(region)
						{
							this.set("UsrRegion", region);
						}
						else
						{
							this.set("UsrRegion", null);
						}
						if(sale)
						{
							this.set("UsrSalerRegion", sale);
						}
						else
						{
							this.set("UsrSalerRegion", null);
						}
					}
					else
					{
						this.set("UsrRegion", null);
						this.set("UsrSalerRegion", null);
					}
				},
				
				initEvents: function() {
					var self = this;
					this.on("change:Status", function() {
						self.enabledCaseCategory();
						var currentContactUser = Terrasoft.SysValue.CURRENT_USER_CONTACT;
						var currentOperator = self.get("UsrOperatorName");
						var currentStatus = self.get("Status");
						if (currentStatus && currentStatus.value === UsrConstants.Case.Status.InWork.value) {
							if (!currentOperator) {
								self.getEmployeeIdAndSetIntoUsrOperatorName(self, currentContactUser.value);
							}
							if (currentOperator && currentOperator.Contact && currentOperator.Contact.value !== currentContactUser.value) {
								self.getEmployeeIdAndSetIntoUsrOperatorName(self, currentContactUser.value);
							}
						}
					});
				},
				getScoringObjectFiltersUsrCaseType: function() {
			var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
			filterGroup.add("ScoringObjectIsInUsrCaseType",
					Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "UsrActive",
							true , Terrasoft.DataValueType.BOOLEAN));
			return filterGroup;
		},
		
		getScoringObjectFiltersUsrCity: function() {
			var filterGroup = Ext.create("Terrasoft.FilterGroup", {
								sortProperty: "UsrWeight"
							});
			filterGroup.add("ScoringObjectIsInUsrCaseType",
					Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL, "UsrActive",
							true , Terrasoft.DataValueType.BOOLEAN));
			return filterGroup;
		},
		

				enabledCaseCategory: function() {
					var self = this;
					var currentStatus = self.get("Status").value;
					if (currentStatus === undefined) {
						return;
					}
					if (currentStatus === UsrConstants.Case.Status.Resolved.value ||
							currentStatus === UsrConstants.Case.Status.WaitingResponse.value) {
						self.set("IsCaseCategoryEnabled", false);
					} else {
						self.set("IsCaseCategoryEnabled", true);
					}
				},

				getEmployeeIdAndSetIntoUsrOperatorName: function(scope, contactId) {
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Employee"
					});
					esq.addColumn("Name");
					esq.filters.add("contactFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Contact", contactId));
					esq.getEntityCollection(function(response) {
						if (response && response.success && response.collection.getCount() > 0) {
							var employee = {value: response.collection.collection.items[0].values.Id,
								displayValue: response.collection.collection.items[0].values.Name};
							scope.set("UsrOperatorName", employee);
						}
					});
				},
				
				
				SetCardType: function(){
					var self = this;
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Contact" });
					esq.addColumn("UsrCardType", "UsrCardType");
					esq.filters.add("ClientFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("Contact").value));
						
					esq.getEntityCollection(function(response) {
						if(response && response.success && response.collection.getCount() > 0) {
							var CardType = response.collection.collection.items[0].get("UsrCardType");
							if(self.get("UsrCardType").value != CardType.value){
								self.set("UsrCardType", CardType);
								self.save();
							}
						//var clNewORDCount = response.collection.getCount();
						//self.set("UsrCardType");
						}
					});
				},
				
				autochangeOwner: function() {
					var status = this.get("Status");
					var previousStatus = this.get("PreviousStatus");
					if ((status.value === ServiceDeskConstants.CaseState.Reopened) &&
						(status.value !== previousStatus.value)) {
						this.set("UsrOperatorName", null);
					} else if (status.value === ServiceDeskConstants.CaseState.InProgress &&
						(status.value !== previousStatus.value)) {
						var owner = this.get("UsrOperatorName");
						var contact = this.Terrasoft.SysValue.CURRENT_USER_CONTACT;
						if (!owner) {
							this.set("UsrOperatorName", contact);
						}
					}
				}
			},
			rules: {
				"UsrComplaintKcExpert": {
					"BindUsrComplaintKcExpertToServiceItem": {
						"ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
						"property": BusinessRuleModule.enums.Property.REQUIRED,
						"conditions": [
							{
								"leftExpression": {
									"type": BusinessRuleModule.enums.ValueType.ATTRIBUTE,
									"attribute": "ServiceItem"
								},
								"comparisonType": Terrasoft.ComparisonType.EQUAL,
								"rightExpression": {
									"type": BusinessRuleModule.enums.ValueType.CONSTANT,
									"value": UsrConstants.Case.ServiceItem.OnExpertKC.value
								}
							}
						]
					}
				}
			}
		};
	}
);
