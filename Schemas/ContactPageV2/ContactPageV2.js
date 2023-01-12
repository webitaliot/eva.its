define("ContactPageV2", ["ProcessModuleUtilities", "ConfigurationConstants"],
	function(ProcessModuleUtilities, ConfigurationConstants) {
		return {
			entitySchemaName: "Contact",
			attributes: {
				"IsEnabled": {
				   dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				   value: true
				},
			},
			mixins: {},
			details: /**SCHEMA_DETAILS*/{
			"UsrInactiveCard": {
				"schemaName": "UsrContactInactiveCardDetail",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrContact"
				}
			},
			"UsrSchema1Detailf1f121d5": {
				"schemaName": "UsrSchema1Detail",
				"entitySchemaName": "UsrTransaction",
				"filter": {
					"detailColumn": "UsrContactId",
					"masterColumn": "Id"
				}
			},
			"UsrSchema3Detail25e9c8d9": {
				"schemaName": "UsrSchema3Detail",
				"entitySchemaName": "UsrContactBalance",
				"filter": {
					"detailColumn": "UsrContact",
					"masterColumn": "Id"
				}
			},
			"EmailDetailV2be8d6e3e": {
				"schemaName": "EmailDetailV2",
				"entitySchemaName": "Activity",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Id"
				},
				"filterMethod": "changeEmailDetailFilter"
			},
			"CaseDetail02ed3bda": {
				"schemaName": "CaseDetail",
				"entitySchemaName": "Case",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/ ,
			modules: /**SCHEMA_MODULES*/{
			"WebPage3cfab1a6-9652-4959-b15b-3e28d1ab2ecd": {
				"moduleId": "WebPage3cfab1a6-9652-4959-b15b-3e28d1ab2ecd",
				"moduleName": "CardWidgetModule",
				"config": {
					"parameters": {
						"viewModelConfig": {
							"widgetKey": "WebPage3cfab1a6-9652-4959-b15b-3e28d1ab2ecd",
							"recordId": "898ad2ab-7184-4b44-b140-1a10c60a28f5",
							"primaryColumnValue": {
								"getValueMethod": "getPrimaryColumnValue"
							}
						}
					}
				}
			}
		}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Surname": {
				"19ae47e8-9bc4-417b-8e11-29f8c477271d": {
					"uId": "19ae47e8-9bc4-417b-8e11-29f8c477271d",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrUserInRole"
							},
							"rightExpression": {
								"type": 0,
								"value": false,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"GivenName": {
				"8212b1d3-1152-4574-94d2-47122cae7947": {
					"uId": "8212b1d3-1152-4574-94d2-47122cae7947",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrUserInRole"
							},
							"rightExpression": {
								"type": 0,
								"value": false,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"MiddleName": {
				"74ed2a4a-9b1f-447e-b7ca-cafe9b627cba": {
					"uId": "74ed2a4a-9b1f-447e-b7ca-cafe9b627cba",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Gender": {
				"ca3879fa-7928-470e-b204-ff1fc8413f0d": {
					"uId": "ca3879fa-7928-470e-b204-ff1fc8413f0d",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"BirthDate": {
				"571fbb67-9737-4c9f-8c6b-26f0c2778cf6": {
					"uId": "571fbb67-9737-4c9f-8c6b-26f0c2778cf6",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"MobilePhone": {
				"b2f697a1-1583-4441-a07a-ea28887b756c": {
					"uId": "b2f697a1-1583-4441-a07a-ea28887b756c",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"City": {
				"7558c07d-0d16-4076-b84a-c08d8b3ae13f": {
					"uId": "7558c07d-0d16-4076-b84a-c08d8b3ae13f",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrUserInRole"
							},
							"rightExpression": {
								"type": 0,
								"value": false,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"Address": {
				"77bea61a-201a-4225-85d2-836cf9910bbe": {
					"uId": "77bea61a-201a-4225-85d2-836cf9910bbe",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrHouse": {
				"61ba68cd-15be-44b6-9c90-dc79db0fcde3": {
					"uId": "61ba68cd-15be-44b6-9c90-dc79db0fcde3",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrApartment": {
				"51dca35f-849f-49f5-98b4-360cc84a4da4": {
					"uId": "51dca35f-849f-49f5-98b4-360cc84a4da4",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrNumberActiveCard": {
				"d2a086c8-239f-4ef5-b509-c6c4700dbf49": {
					"uId": "d2a086c8-239f-4ef5-b509-c6c4700dbf49",
					"enabled": false,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 4,
							"leftExpression": {
								"type": 3,
								"value": "CurrentUser",
								"dataValueType": 10
							},
							"rightExpression": {
								"type": 0,
								"value": "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"Name": {
				"39671e52-1e3e-41b7-b352-d17ac12a5719": {
					"uId": "39671e52-1e3e-41b7-b352-d17ac12a5719",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 1,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNumberActiveCard"
							}
						},
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrUserInRole"
							},
							"rightExpression": {
								"type": 0,
								"value": false,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "merge",
				"name": "PhotoTimeZoneContainer",
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
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Type",
				"values": {
					"contentType": 3,
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrNumberActiveCard",
				"values": {
					"contentType": 3,
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrNumberActiveCardCaption"
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "AccountMobilePhone",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				}
			},
			{
				"operation": "merge",
				"name": "AccountEmail",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					}
				}
			},
			{
				"operation": "insert",
				"name": "UsrPassportSeries958f5344-7e43-4b96-98b7-341a0383a880",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPassportSeries"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "Gender",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"enabled": {
						"bindTo": "IsEnabled"
					}
				}
			},
			{
				"operation": "insert",
				"name": "BirthDate",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"enabled": {
						"bindTo": "IsEnabled"
					},
					"tip": {
						"content": {
							"bindTo": "Resources.Strings.OwnerTip"
						}
					}
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrReliability",
				"values": {
					"bindTo": "UsrReliability",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "Age",
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
				"name": "Language",
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
				"operation": "insert",
				"name": "UsrAcceptanceSendingGroup",
				"values": {
					"itemType": 15,
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.UsrAcceptanceSendingCaption"
					}
				},
				"parentName": "GeneralInfoTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrAcceptanceSendingBlock",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "UsrAcceptanceSendingGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAcceptanceSMSPl",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					"contentType": 3
				},
				"parentName": "UsrAcceptanceSendingBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAcceptanceEmailPl",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"contentType": 3
				},
				"parentName": "UsrAcceptanceSendingBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAcceptanceSMSKm",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"contentType": 3
				},
				"parentName": "UsrAcceptanceSendingBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrAcceptanceEmailKm",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"contentType": 3
				},
				"parentName": "UsrAcceptanceSendingBlock",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab68395e0fTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab68395e0fTabLabelTabCaption"
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
				"name": "CaseDetail02ed3bda",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab68395e0fTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "move",
				"name": "HistoryTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "HistoryTabGroup4906a678",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.HistoryTabGroup4906a678GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "HistoryTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "HistoryTabGridLayout0d913974",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "HistoryTabGroup4906a678",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "WebPage3cfab1a6-9652-4959-b15b-3e28d1ab2ecd",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 16,
						"column": 0,
						"row": 0,
						"layoutName": "HistoryTabGridLayout0d913974",
						"useFixedColumnHeight": true
					},
					"itemType": 4,
					"classes": {
						"wrapClassName": [
							"card-widget-grid-layout-item"
						]
					}
				},
				"parentName": "HistoryTabGridLayout0d913974",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLoyaltyProgramTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.LoyaltyProgramTabCaption"
					},
					"items": [],
					"order": 3
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrBasicDataGroup",
				"values": {
					"itemType": 15,
					"items": [],
					"caption": {
						"bindTo": "Resources.Strings.UsrBasicDataCaption"
					}
				},
				"parentName": "UsrLoyaltyProgramTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBasicDataBlock",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "UsrBasicDataGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBalanceTrade",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrBalanceTradeCaption"
					},
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrStatusCard",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrStatusCardCaption"
					},
					"contentType": 3,
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrWalletBalance",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrWalletBalanceCaption"
					},
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrStatusWriteoffBonuses",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrStatusWriteoffBonusesCaption"
					},
					"contentType": 3,
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrDateRegistrationCard",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrDateRegistrationCardCaption"
					},
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrSymptomParticipationClub",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrSymptomParticipationClubCaption"
					},
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "UsrCardType",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3
					},
					"caption": {
						"bindTo": "Resources.Strings.UsrCardTypeCaption"
					},
					"enabled": false
				},
				"parentName": "UsrBasicDataBlock",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrInactiveCard",
				"values": {
					"itemType": 2
				},
				"parentName": "UsrLoyaltyProgramTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSchema1Detailf1f121d5",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "UsrLoyaltyProgramTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrSchema3Detail25e9c8d9",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "UsrLoyaltyProgramTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "move",
				"name": "ESNTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab15d426f7TabLabel",
				"values": {
					"caption": "Email история",
					"items": [],
					"order": 7
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "EmailDetailV2be8d6e3e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tab15d426f7TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "JobTabContainer",
				"values": {
					"order": 6
				}
			},
			{
				"operation": "merge",
				"name": "Job",
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
				"name": "JobTitle",
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
				"name": "Department",
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
				"name": "DecisionRole",
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
				"name": "NotesAndFilesTab",
				"values": {
					"order": 8
				}
			},
			{
				"operation": "merge",
				"name": "TimelineTab",
				"values": {
					"order": 5
				}
			},
			{
				"operation": "remove",
				"name": "JobTitleProfile"
			},
			{
				"operation": "remove",
				"name": "AccountPhone"
			},
			{
				"operation": "remove",
				"name": "Type"
			},
			{
				"operation": "remove",
				"name": "Owner"
			},
			{
				"operation": "remove",
				"name": "SalutationType"
			},
			{
				"operation": "remove",
				"name": "EmailDetailV2"
			},
			{
				"operation": "remove",
				"name": "Invoice"
			}
		]/**SCHEMA_DIFF*/ ,
			methods: {
				
				onEntityInitialized: function() {
                	var id = this.get("Id");
					this.getUserRole();
					var args = {
						sysProcessName: "UsrInegrationPrcess",
						parameters:
						{
							ContactId: id
						}
					};
					ProcessModuleUtilities.executeProcess(args);
					this.callParent(arguments);
            	},
				
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("MobilePhone", this.phoneValidator);
				},
				
			
			getUserRole: function(){
				// Формирование запроса.
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
				    rootSchemaName: "SysUserInRole"
				});

				esq.addColumn("SysRole");
				esq.addColumn("SysUser");
				
				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"SysUser", Terrasoft.core.enums.SysValue.CURRENT_USER.value);
				var esqSecondFilter  = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
					"SysRole", "f1edefb1-0ec5-4fd2-ab73-3ed76cf24c3a");
			
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);

					
				esq.getEntityCollection(function (result){
					if(result.success){
						var ActiveCard = this.get("UsrNumberActiveCard");
						var collection = result.collection;
						if(collection.getCount() > 0 && ActiveCard){
							this.set("IsEnabled", false);
						}
						else{
							this.set("IsEnabled", true);
						}
					}
					//var role = this.get("UsrUserInRole");
				}, this);
			},
				
				phoneValidator: function(value) {
					var invalidMessage = "";
					var regx = /^38[0-9]{10}.*$/;
					var isValid = true;
					var mobileMumber = value || this.get("MobilePhone");
					isValid = (Ext.isEmpty(mobileMumber) ||
					regx.test(mobileMumber));
					if (!isValid) {
						invalidMessage = this.get("Resources.Strings.invalidMessage");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				},
				changeEmailDetailFilter: function() {
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filterGroup.add(
								"ContactFilter",
								this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL,
										"[ActivityParticipant:Activity].Participant.Id",
										this.get("Id")
								)
						);
						filterGroup.add(
								"EmailFilter",
								this.Terrasoft.createColumnFilterWithParameter(
										this.Terrasoft.ComparisonType.EQUAL,
										"Type",
										ConfigurationConstants.Activity.Type.Email
								)
						);
						return filterGroup;
					},

			}
		};
	}
);
