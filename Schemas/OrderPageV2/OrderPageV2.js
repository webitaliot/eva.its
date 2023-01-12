define("OrderPageV2", ["UsrConstants", "ProcessModuleUtilities","ConfigurationConstants",
	"RecommendationModuleUtilities", "css!RecommendationModule"],
	function(UsrConstants, ProcessModuleUtilities, ConfigurationConstants) {
	return {
		entitySchemaName: "Order",
		attributes: {
			"Status": {
				lookupListConfig: {
					columns:["UsrEditeble"],
					filter: function() {
						return this.getScoringObjectFilters();
					}
				}
			},
			"IsRecomendationVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			"AddDaysButtonEnable":{
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			"AddDaysButtonVisible":{
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			},
			"CanEditField": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		mixins:{
			RecommendationModuleUtilities: "Terrasoft.RecommendationModuleUtilities"
		},
		messages: {
			"GetOrderStatusInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			"SetRecomendationVisible":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},
		},
		details: /**SCHEMA_DETAILS*/{
			"ActivitySMS": {
				"schemaName": "UsrSMSActivity",
				"entitySchemaName": "Activity",
				"filterMethod": "MessageActivityFilter",
				"filter": {
					"detailColumn": "Order",
					"masterColumn": "Id"
				}
			},
			"SharesDetail": {
				"schemaName": "UsrShareDetail",
				"entitySchemaName": "UsrShares",
				"filter": {
					"detailColumn": "UsrOrderShares",
					"masterColumn": "Id"
				}
			},
			"Order": {
				"schemaName": "UsrDependentOrders",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrParent"
				}
			},
			"OrderDetailV2c521b3f0": {
				"schemaName": "OrderDetailV2",
				"entitySchemaName": "Order",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				}
			},
			"CallDetailb4ff53c8": {
				"schemaName": "CallDetail",
				"entitySchemaName": "Call",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				}
			},
			"EmailDetailV25ae567ec": {
				"schemaName": "EmailDetailV2",
				"entitySchemaName": "Activity",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				},
				"filterMethod": "changeEmailDetailFilter"
			},
			"UsrSchema5Detail072ad0fe": {
				"schemaName": "UsrSchema5Detail",
				"entitySchemaName": "OrderStatus",
				"filter": {
					"detailColumn": "Name",
					"masterColumn": "Status"
				}
			},
			"CaseDetail164bc28a": {
				"schemaName": "CaseDetail",
				"entitySchemaName": "Case",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				}
			},
			"ContactCommunicationDetailc957b7e8": {
				"schemaName": "ContactCommunicationDetail",
				"entitySchemaName": "ContactCommunication",
				"filter": {
					"detailColumn": "Contact",
					"masterColumn": "Contact"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrOrderFailureReason": {
				"0febdd9b-5a11-488c-bfe8-dd56482775f9": {
					"uId": "0febdd9b-5a11-488c-bfe8-dd56482775f9",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "e06b968e-b596-47e6-80f6-9fb2f391d3e3",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrNoAnswer": {
				"7397033e-f256-4649-b16a-5c1187c28a6f": {
					"uId": "7397033e-f256-4649-b16a-5c1187c28a6f",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
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
								"value": "29fa66e3-ef69-4feb-a5af-ec1de125a614",
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
								"value": "4a2ca622-119e-4968-b0f1-b18d79972b9c",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrOrderCancelReason": {
				"1300a08f-382a-4c6f-8e69-8320d7e9d040": {
					"uId": "1300a08f-382a-4c6f-8e69-8320d7e9d040",
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
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "e06b968e-b596-47e6-80f6-9fb2f391d3e3",
								"dataValueType": 10
							}
						}
					]
				},
				"00c09ff2-b744-4d1f-a01d-f2870b62230c": {
					"uId": "00c09ff2-b744-4d1f-a01d-f2870b62230c",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Status"
							},
							"rightExpression": {
								"type": 0,
								"value": "e06b968e-b596-47e6-80f6-9fb2f391d3e3",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrOrderFailureDetailedReason": {
				"121d718f-85c5-4b35-8c03-8f425ab90c47": {
					"uId": "121d718f-85c5-4b35-8c03-8f425ab90c47",
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
								"attribute": "UsrOrderCancelReason"
							},
							"rightExpression": {
								"type": 0,
								"value": "7c7ad9ff-6a9b-4cd3-bbba-69a4ea748b08",
								"dataValueType": 10
							}
						}
					]
				},
				"3590e466-299f-4b1d-88cb-7ccb7a6a4e5c": {
					"uId": "3590e466-299f-4b1d-88cb-7ccb7a6a4e5c",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrOrderCancelReason"
							},
							"rightExpression": {
								"type": 0,
								"value": "7c7ad9ff-6a9b-4cd3-bbba-69a4ea748b08",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrStoreDeliveryDate": {
				"8196c07c-9624-4203-a6e0-87ed380f2987": {
					"uId": "8196c07c-9624-4203-a6e0-87ed380f2987",
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
								"attribute": "DeliveryType"
							},
							"rightExpression": {
								"type": 0,
								"value": "43b4f6b9-1122-4460-a5fb-15b60a81e3ad",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrShelfLife": {
				"4e405fe6-e8fc-4ffc-b83c-523eef0d9c4e": {
					"uId": "4e405fe6-e8fc-4ffc-b83c-523eef0d9c4e",
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
								"attribute": "DeliveryType"
							},
							"rightExpression": {
								"type": 0,
								"value": "43b4f6b9-1122-4460-a5fb-15b60a81e3ad",
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
				"operation": "merge",
				"name": "RecommendationModuleContainer",
				"values": {
					"items": [
						{
							"id": "RecommendationLabel",
							"itemType": 6,
							"classes": {
								"labelClass": [
									"information",
									"recommendation"
								]
							},
							"markerValue": {
								"bindTo": "Resources.Strings.RecomendationCaption"
							},
							"selectors": {
								"wrapEl": "#TestLabel"
							},
							"caption": {
								"bindTo": "Resources.Strings.RecomendationCaption"
							},
							"tag": "RecommendationLabel",
							"visible": {
								"bindTo": "IsRecomendationVisible"
							}
						}
					]
				}
			},
			{
				"operation": "merge",
				"name": "Client",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "move",
				"name": "Client",
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "Amount",
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
				"name": "UsrParent",
				"values": {
					"enabled": false,
					"bindTo": "UsrParent",
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUP033bb688-bde3-4212-b428-38de7fd74e5b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrCardType",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "Status",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					},
					"enabled": {
						"bindTo": "StatusEdit"
					}
				}
			},
			{
				"operation": "insert",
				"name": "Owner",
				"values": {
					"bindTo": "Owner",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					},
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrTTN",
				"values": {
					"enabled": false,
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrTTN"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "UsrCall9ab26b1c-679c-459e-a879-87787f049031",
				"values": {
					"enabled": false,
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrCall"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "UsrNotificationNumber",
				"values": {
					"enabled": false,
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrNotificationNumber"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "UsrCustomerAgreement",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5
					},
					"visible": {
						"bindTo": "UsrCustomerAgreementVisible"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "UsrFigureCount",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					},
					"enabled": false,
					"visible": {
						"bindTo": "UsrFigureVisible"
					}
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 11
			},
			{
				"operation": "insert",
				"name": "INTEGERd0759912-bf15-4578-9432-a404593167de",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 8,
						"layoutName": "Header"
					},
					"bindTo": "UsrClientNewORDCount",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 12
			},
			{
				"operation": "insert",
				"name": "UsrLastCallDate8ba2e28f-c2bd-4482-9fde-739c20ac226d",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "UsrLastCallDate",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 13
			},
			{
				"operation": "insert",
				"name": "UsrCallCountada29690-f6eb-44a4-8fbb-0936258e36d1",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 8,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "UsrCallCount",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 14
			},
			{
				"operation": "insert",
				"name": "UsrNoAnswerb68d7843-3f6b-4e24-abfe-7485a1037b8b",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 16,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "UsrNoAnswer"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 15
			},
			{
				"operation": "insert",
				"name": "UsrOrderCancelReason8f06b89d-7d3f-4fbf-975e-892b48911f32",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 7,
						"layoutName": "Header"
					},
					"bindTo": "UsrOrderCancelReason",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 16
			},
			{
				"operation": "insert",
				"name": "UsrOrderFailureDetailedReason0b9a5037-f9bb-4570-873d-861b9670e876",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 7,
						"layoutName": "Header"
					},
					"bindTo": "UsrOrderFailureDetailedReason"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 17
			},
			{
				"operation": "insert",
				"name": "STRING5bd40f33-fc26-4db1-a163-b0107237c00e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "UsrStock",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 18
			},
			{
				"operation": "merge",
				"name": "OrderProductTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "insert",
				"name": "UsrSharesTab",
				"values": {
					"caption": "Акции по продуктам",
					"items": [],
					"order": 1
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "SharesDetail",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "UsrSharesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Order",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "UsrSharesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrMagentoTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.UsrMagentoTabCaption"
					},
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrMagentoContainer",
				"values": {
					"itemType": 7,
					"afterrender": {
						"bindTo": "onDrawContainer"
					}
				},
				"parentName": "UsrMagentoTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrMessageTab",
				"values": {
					"caption": "СМС",
					"items": [],
					"order": 4
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ActivitySMS",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "UsrMessageTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrActivityOnOrderTab",
				"values": {
					"caption": "АКТИВНОСТИ ПО ЗАКАЗУ",
					"items": [],
					"order": 5
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Activities",
				"values": {
					"itemType": 2
				},
				"parentName": "UsrActivityOnOrderTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 9
				}
			},
			{
				"operation": "merge",
				"name": "OrderDeliveryTab",
				"values": {
					"order": 3
				}
			},
			{
				"operation": "merge",
				"name": "DeliveryType",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"name": "UsrTTNOrder",
				"values": {
					"enabled": false,
					"bindTo": "UsrTTN",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrCostDelivery",
				"values": {
					"enabled": false,
					"bindTo": "UsrCostDelivery",
					"dataValueType": 6,
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrDeliveryDepartment",
				"values": {
					"enabled": false,
					"bindTo": "UsrDeliveryDepartment",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ButtonAdd3Days",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					},
					"itemType": 5,
					"caption": {
						"bindTo": "Resources.Strings.ButtonAdd3Days"
					},
					"style": "green",
					"click": {
						"bindTo": "AddTreeDays"
					},
					"enabled": {
						"bindTo": "AddDaysButtonEnable"
					},
					"visible": {
						"bindTo": "AddDaysButtonVisible"
					}
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "DATE6b237a67-32a0-442a-a425-285c70f97cb0",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "OrderDeliveryInformationBlock"
					},
					"bindTo": "UsrStoreDeliveryDate",
					"enabled": false
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "DATEed2a8f8d-4782-4ea1-ab8b-14dd3f222d62",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 6,
						"row": 2,
						"layoutName": "OrderDeliveryInformationBlock"
					},
					"bindTo": "UsrShelfLife",
					"enabled": false
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "UsrDeliveryService",
				"values": {
					"bindTo": "UsrDeliveryService",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					},
					"enabled": false
				},
				"parentName": "OrderDeliveryInformationBlock",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "OrderDeliveryTabGroupb350a0ed",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.OrderDeliveryTabGroupb350a0edGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "OrderDeliveryTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "OrderDeliveryTabGridLayoutfb083c74",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "OrderDeliveryTabGroupb350a0ed",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPaymentMethod6505a1a8-013a-4756-97ee-c0297173879b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "OrderDeliveryTabGridLayoutfb083c74"
					},
					"bindTo": "UsrPaymentMethod",
					"enabled": false
				},
				"parentName": "OrderDeliveryTabGridLayoutfb083c74",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "PaymentStatusf96d8962-616f-4ff3-a5f1-7d2c35788841",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "OrderDeliveryTabGridLayoutfb083c74"
					},
					"bindTo": "PaymentStatus",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "OrderDeliveryTabGridLayoutfb083c74",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrInvoice4ac3a8e2-abbf-4035-b9d6-b15f8ac4f0aa",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "OrderDeliveryTabGridLayoutfb083c74"
					},
					"bindTo": "UsrInvoice",
					"enabled": false
				},
				"parentName": "OrderDeliveryTabGridLayoutfb083c74",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrInvoiceExpireDate3ba72110-1d31-4ee9-8b89-5c7cefe83f90",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "OrderDeliveryTabGridLayoutfb083c74"
					},
					"bindTo": "UsrInvoiceExpireDate",
					"enabled": false
				},
				"parentName": "OrderDeliveryTabGridLayoutfb083c74",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "ContactNumber",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "ReceiverName",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "Comment",
				"values": {
					"enabled": true
				}
			},
			{
				"operation": "insert",
				"name": "OrderDeliveryAddressControlBlock",
				"values": {
					"itemType": 15,
					"caption": "Адрес доставки",
					"items": [],
					"controlConfig": {
						"collapsed": false
					}
				},
				"parentName": "OrderDeliveryTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "OrderDeliveryAddressResultsBlock",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "OrderDeliveryAddressControlBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrCountry",
				"values": {
					"enabled": false,
					"bindTo": "UsrCountry",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrCity",
				"values": {
					"enabled": false,
					"bindTo": "UsrCity",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAddress",
				"values": {
					"enabled": {
						"bindTo": "CanEditField"
					},
					"bindTo": "UsrAddress",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrHouse",
				"values": {
					"enabled": false,
					"bindTo": "UsrHouse",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "UsrApartment",
				"values": {
					"enabled": false,
					"bindTo": "UsrApartment",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrCorps",
				"values": {
					"enabled": true,
					"bindTo": "UsrCorps",
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					}
				},
				"parentName": "OrderDeliveryAddressResultsBlock",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Tabf5d16bc4TabLabel",
				"values": {
					"caption": "История клиента",
					"items": [],
					"order": 7
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "OrderDetailV2c521b3f0",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf5d16bc4TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CallDetailb4ff53c8",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf5d16bc4TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "EmailDetailV25ae567ec",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf5d16bc4TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "CaseDetail164bc28a",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf5d16bc4TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "ContactCommunicationDetailc957b7e8",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabf5d16bc4TabLabel",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "merge",
				"name": "OrderResultsTab",
				"values": {
					"order": 6
				}
			},
			{
				"operation": "merge",
				"name": "DeliveryTypeResult",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "PaymentTypeResult",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "ContactNumberResultsBlock",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "ReceiverNameResultsBlock",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "CommentResultsBlock",
				"values": {
					"enabled": false
				}
			},
			{
				"operation": "merge",
				"name": "OrderHistoryTab",
				"values": {
					"order": 8
				}
			},
			{
				"operation": "insert",
				"name": "UsrSchema5Detail072ad0fe",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "OrderHistoryTab",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "remove",
				"name": "PaymentAmount"
			},
			{
				"operation": "remove",
				"name": "PaymentType"
			},
			{
				"operation": "remove",
				"name": "DeliveryAddressDetail"
			},
			{
				"operation": "remove",
				"name": "Activities"
			},
			{
				"operation": "remove",
				"name": "Document"
			},
			{
				"operation": "remove",
				"name": "OrderGeneralInformationTab"
			},
			{
				"operation": "remove",
				"name": "OrderPageGeneralInformationBlock"
			},
			{
				"operation": "remove",
				"name": "Number"
			},
			{
				"operation": "remove",
				"name": "Date"
			},
			{
				"operation": "remove",
				"name": "SourceOrder"
			},
			{
				"operation": "remove",
				"name": "DueDate"
			},
			{
				"operation": "remove",
				"name": "ActualDate"
			},
			{
				"operation": "remove",
				"name": "PaymentStatus"
			},
			{
				"operation": "remove",
				"name": "DeliveryStatus"
			},
			{
				"operation": "remove",
				"name": "Owner"
			},
			{
				"operation": "remove",
				"name": "OrderVisaTab"
			},
			{
				"operation": "remove",
				"name": "OrderPageVisaTabContainer"
			},
			{
				"operation": "remove",
				"name": "OrderPageVisaBlock"
			},
			{
				"operation": "remove",
				"name": "Visa"
			},
			{
				"operation": "remove",
				"name": "FileNotesTab"
			},
			{
				"operation": "remove",
				"name": "Files"
			},
			{
				"operation": "remove",
				"name": "NotesControlGroup"
			},
			{
				"operation": "remove",
				"name": "Notes"
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			onEntityInitialized: function(){
				this.callParent(arguments);
				this.onStatusChanged();
				this.amountChangeVisible();
				//Set Client New Order Count 
				this.getClientNewORDCount();
				//this.changeFigureCount();
				this.on("change:Amount",this.amountChangeVisible, this);
				this.on("change:UsrCustomerAgreement", this.changeFigureCount, this);
				this.on("change:Status", this.changeLastStatus, this);
				this.ButtonAddThreeDaysEnabled();
				this.GetAddThreeDaysButtonVisible();
				this.SetCardType();
			},
			
			changeLastStatus: function()
			{
				var dateTime = new Date();
				this.set("UsrStatusFieldChanges", dateTime);
			},

			changeFigureCount: function()
			{
				var agree = this.get("UsrCustomerAgreement");
				var result = parseInt(this.get("UsrCostDelivery"));
				var result2= parseInt((parseInt(this.get("Amount"))-result)/150);
				if(agree==true)
				{
					this.set("UsrFigureCount", result2);
				}
				else
				{
					this.set("UsrFigureCount", 0);	
				}
			},
			changeEmailDetailFilter: function() {
				var filterGroup = new this.Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				filterGroup.add(
					"ContactFilter",
					this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL,
						"[ActivityParticipant:Activity].Participant.Id",
						this.get("Contact").value
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
			amountChangeVisible: function()
			{
				var amount = this.get("Amount");
			
				this.set("UsrFigureVisible", false);
				this.set("UsrCustomerAgreementVisible", false);
			},
			subscribeForEvents: function () {
				this.sandbox.subscribe("SetRecomendationVisible", function(){
					this.set("IsRecomendationVisible", true);
				}, this);
				this.sandbox.subscribe("GetOrderStatusInfo", function () {
					return this.get("Status");
				}, this);
			},
			init: function () {
				this.callParent(arguments);
				this.removeOrderPassportTab();
				this.isEditebleType();
				this.subscribeForEvents();
				this.GetIsCanEditFields();
				this.on("change:Status", this.onStatusChanged, this);
			},
			
			GetIsCanEditFields: function(){
				var that = this;
				var serviceData = {
					AUName: "Изменения по заказу",
					UserId: Terrasoft.SysValue.CURRENT_USER.value
				};
				var ServiceHelper = require(['ServiceHelper'], function (serviceHelper) {serviceHelper.callService("UsrUserInRole",
					"CheckUserInAU",
						function (response) {
							that.set("CanEditField", response);
					}, serviceData, this);
				});
			},
			
			onStatusChanged: function() {
				var self = this;
				var valueStatus = this.get("Status") != undefined ? this.get("Status").UsrEditeble : null;
				if(valueStatus==true){
					this.set("StatusEdit",true);
				}
				else{
					this.set("StatusEdit",false);
				}
				this.isStatusAssembled();
			},
			getClientNewORDCount: function(){
				var self = this;
				var ordClient = this.get("Client").value;
				if (ordClient){
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Order" });
				
				esq.filters.add("ClientFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Contact", ordClient));
					
				esq.filters.add("StatusFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Status", "29FA66E3-EF69-4FEB-A5AF-EC1DE125A614"));
					
				esq.getEntityCollection(function(response) {
					if(response && response.success && response.collection.getCount() > 0) {
					var clNewORDCount = response.collection.getCount();
					self.set("UsrClientNewORDCount",clNewORDCount);
					}
				});
				}
			},
			isStatusAssembled: function () {
				var self = this;
				var orderId = this.get("Id");
				var statusId = this.get("Status").value != undefined ? this.get("Status").value : null;
				if(statusId == "81E1838B-9A0B-4D37-B6E9-5C7FA17A7821")
				{
					var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "OrderProduct"
					});
					esq.addColumn("Product", "Product");
					esq.addColumn("Quantity", "Quantity");
					esq.filters.add("filterLead", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
					esq.getEntityCollection(function(result) {
						var productCollection = [];
						if (result.success) {
							result.collection.each(function(item) {
								productCollection.push({
									productId: item.get("Product").value,
									quantity: item.get("Quantity")
								});
							});
							self.updateOrderProduct(productCollection);
						}
					}, this);
				}
			},
			updateOrderProduct: function (data) {
				if(data.length > 0){
					var batchQuery = Ext.create("Terrasoft.BatchQuery");
					for(var i = 0; i < data.length; i++){
						var productId = data[i].productId != undefined ? data[i].productId : "";
						var quantity = data[i].quantity != undefined ? data[i].quantity : "";
						var update = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "OrderProduct"
						});
						update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Product", productId));
						update.setParameterValue("UsrInStock", quantity, this.Terrasoft.DataValueType.FLOAT);
						batchQuery.add(update);
					}
					batchQuery.execute();
				}
			},
			getScoringObjectFilters: function() {
				var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
				filterGroup.add("ScoringObjectIsInCurrentWorkspace",
						Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "UsrAccessToOpetator",
								true, Terrasoft.DataValueType.BOOLEAN));

				return filterGroup;
			},
			removeOrderPassportTab: function() {
				var tabs = this.get('TabsCollection');
				if(tabs) {
					tabs.removeByKey("OrderPassportTab");
				}
			},
			isEditebleType: function(){
			  if(this.isEditMode()){
				  this.set("editeble",false);
			  }
				else{
				  this.set("editeble",true);
			  }
			},
			activeTabChange: function(activeTab) {
				this.callParent(arguments);
				if(activeTab.$Name == "UsrMagentoTab"){
					this.openNewWindow();
				}
				this.onDrawContainer();
			},
			openNewWindow: function(){
				this.Terrasoft.SysSettings.querySysSettingsItem("UsrEvaPromoIframeUri", function(iframeUri) {
					if (iframeUri) {
						var orderId = this.get("UsrId");
						if(!orderId) {
							return;
						}
						var magentouri = iframeUri.replace("{0}", orderId);
						window.open(magentouri);
					}
				}, this);
			},
			onDrawContainer: function() {
				this.Terrasoft.SysSettings.querySysSettingsItem("UsrEvaPromoIframeUri", function(iframeUri) {
					if (iframeUri) {
						var orderId = this.get("UsrId");
						if(!orderId) {
							return;
						}
						var iframe = document.createElement('iframe');
						iframe.src = iframeUri.replace("{0}", orderId);
						iframe.width = '100%';
						iframe.height = '530';
						var container = document.getElementById('OrderPageV2UsrMagentoContainerContainer');
						if(!container) {
							return;
						}
						container.innerHTML = '';
						container.appendChild(iframe);
					}
				}, this);
			},
			MessageActivityFilter: function() {
						var recordId = this.get("Id");
						var filterGroup = new this.Terrasoft.createFilterGroup();
						filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
						filterGroup.add("ActivityCategoryFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "ActivityCategory", "62BF294D-A3AA-40FC-8AB3-02E2FB0A4E73"));
								filterGroup.add("OrderFilter", this.Terrasoft.createColumnFilterWithParameter(
								this.Terrasoft.ComparisonType.EQUAL, "Order", recordId));
						return filterGroup;
					},
			DependentOrdersFilter: function() {
				var dOrderId = this.get("UsrId");
				var recordId = this.get("Id");
				var filterOrderGroup = new this.Terrasoft.createFilterGroup();
				filterOrderGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				filterOrderGroup.add("ActivityCategoryFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "ActivityCategory", "62BF294D-A3AA-40FC-8AB3-02E2FB0A4E73"));
				filterOrderGroup.add("OrderFilter", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Order", recordId));
				return filterOrderGroup;
			},
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					Type: "Terrasoft.MenuSeparator",
					Caption: ""
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Переотправка заказа в ERP",
					"Tag": "resendOrderInERP"
				}));
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Caption": "Вернуть заказ в очередь на выгрузка на FTP",
					"Tag": "runProccessUploadOrder",
					"Enabled": true
				}));
				return actionMenuItems;
			},
			runProccessUploadOrder: function()
			{
				var orderId= this.get("Id");
				var args = {
						sysProcessName: "UsrUploadCurrentOrderOnFtp",
						parameters: {
								OrderId: orderId
						}
				};
				ProcessModuleUtilities.executeProcess(args);
			},
			resendOrderInERP: function () {
				var orderId = this.get("Id");
				ProcessModuleUtilities.executeProcess({
					"sysProcessName": "UsrResendOrderInERP",
					"parameters": {
						"UsrOrder": orderId
					}
				});
			},
			
			AddTreeDays: function(){
				var that = this;
				var ShelfLife = this.get("UsrShelfLife");
				ShelfLife.setDate(ShelfLife.getDate()+3);
				/*var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "Order"
				});
				update.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Id", this.get("Id")));
					
				update.setParameterValue("UsrShelfLife", ShelfLife, this.Terrasoft.DataValueType.DATE_TIME);
				update.setParameterValue("UsrIsDaysAdded", true, this.Terrasoft.DataValueType.BOOLEAN);
				
				update.execute(function(result){
					if(result && result.success){
						this.set("AddDaysButtonEnable", false);
						that.set("UsrShelfLife", ShelfLife);
					}
				},this);*/
				this.set("AddDaysButtonEnable", false);
				that.set("UsrIsDaysAdded", true);
				that.set("UsrShelfLife");
				that.set("UsrShelfLife", ShelfLife);
			},
			ButtonAddThreeDaysEnabled: function(){
				var that = this;
				setTimeout(function() {
					var isAdded = that.get("UsrIsDaysAdded");
					if(!isAdded){
						that.set("AddDaysButtonEnable", true);
					}
					else{
						that.set("AddDaysButtonEnable", false);
					}
				}, 1000);
			},
			
			GetAddThreeDaysButtonVisible: function(){
				if(this.get("DeliveryType").displayValue == "Самовывоз Ева"){
					this.set("AddDaysButtonVisible", true);
				}
				else{
					this.set("AddDaysButtonVisible", false);
				}
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
			
			/**
			 * Handles "Discard" button click.
			 * @public
			 * @param {String} [callback] Callback function.
			 * @param {Terrasoft.BaseViewModel} [scope] Callback scope.
			 */
			onDiscardChangesClick: function(callback, scope) {
				if (this.isNew) {
					this._closePage();
					return;
				}
				this.set("IsEntityInitialized", false);
				this.loadEntity(this.getPrimaryColumnValue(), function() {
					this.updateButtonsVisibility(false, {
						force: true
					});
					this.initMultiLookup();
					this.set("IsEntityInitialized", true);
					this.discardDetailChange();
					this.updatePageHeaderCaption();
					this.Ext.callback(callback, scope);
				}, this);
				if (this.get("ForceUpdate")) {
					this.set("ForceUpdate", false);
				}
				this.ButtonAddThreeDaysEnabled();
				this.SetCardType();
			},

		},
		rules: {
			
		}
	};
});