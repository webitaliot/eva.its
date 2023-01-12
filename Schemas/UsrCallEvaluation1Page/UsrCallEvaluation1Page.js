define("UsrCallEvaluation1Page", ["BusinessRuleModule", "UsrCallEvaluation1PageResources", "ConfigurationConstants", "terrasoft", "UsrCallEvaluation1Page"], function(BusinessRuleModule, resources, ConfigurationConstants, Terrasoft) { 
	var curentCallEvalNumber;
	return {
		entitySchemaName: "UsrCallEvaluation",
		details: /**SCHEMA_DETAILS*/{
			"CallDetail2db9bce4": {
				"schemaName": "CallDetail",
				"entitySchemaName": "Call",
				"filter": {
					"detailColumn": "UsrCallEvalInCall", 
					"masterColumn": "Id"
				}
			},
			"CaseDetail488e890c": {
				"schemaName": "CaseDetail",
				"entitySchemaName": "Case",
				"filter": {
					"detailColumn": "UsrCallEvaluationCall",
					"masterColumn": "Id"
				}
			},
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrCallEvaluationFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrCallEvaluation"
				}
			}
		}/**SCHEMA_DETAILS*/,
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName50bef554-2840-472b-9c1a-d94f2af36bcf",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrName",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER7b8f81dd-56ba-42db-8d3e-6add24d071db",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "UsrCallEval",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "STRINGf5e49797-7ff4-4bd6-b7ce-98959116956e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrDialogSubject",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUPbc8cc75b-5fd9-4876-8277-64477942a629",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "UsrDialogType",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUPaf0c37b8-f0c3-4a0b-a6d3-eadf5c582c04",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrEmployee",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "UsrCallDate8979b2a8-5083-40c2-bc75-5d5868198a83",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "UsrCallDate",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "LOOKUP757aaf87-976f-45f2-8a18-93b5633af263",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "UsrAppraiser",
					"enabled": false,
					"contentType": 5
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "CreatedOnb720fd16-d3d1-48dc-806f-b0446bac4515",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "CreatedOn",
					"enabled": false
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Tabdc6cfd4cTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.TabsNameCall"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CallDetail2db9bce4",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabdc6cfd4cTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "CaseDetail488e890c",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "Tabdc6cfd4cTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelTabCaption"
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
				"name": "Tab7e221f91TabLabelGroupe80cac52",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelGroupe80cac52GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7e221f91TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGridLayouta91b276e",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7e221f91TabLabelGroupe80cac52",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER5d2fd19a-0b57-40e5-b77f-12c802dff0d3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7e221f91TabLabelGridLayouta91b276e"
					},
					"bindTo": "UsrBaSkillTotalEval",
					"enabled": false
				},
				"parentName": "Tab7e221f91TabLabelGridLayouta91b276e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRINGe5d75854-c0fa-40db-9ff3-a7e934f22471",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayouta91b276e"
					},
					"bindTo": "UsrBaSkillTotalComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayouta91b276e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGroupbeb875f4",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelGroupbeb875f4GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7e221f91TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGridLayoutebc6bcf3",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7e221f91TabLabelGroupbeb875f4",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER83e9fe76-95bb-4506-b0f3-543c11e3c0c9",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7e221f91TabLabelGridLayoutebc6bcf3"
					},
					"bindTo": "UsrBaSkillEval",
					"enabled": false
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutebc6bcf3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "BOOLEANe0408caf-4f09-47a9-a70c-97ddac2a03e7",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayoutebc6bcf3"
					},
					"bindTo": "UsrBaSkillGretings",
					"enabled": true,
					"labelConfig": {
						"visible": false
					}
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutebc6bcf3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillEvalItemDescription332f5f3b-525c-4766-afac-a7e9094ddb94",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayoutebc6bcf3"
					},
					"bindTo": "UsrBaSkillEvalItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutebc6bcf3",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "STRINGdd8274fd-4b78-4567-bc69-6997034037e8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7e221f91TabLabelGridLayoutebc6bcf3"
					},
					"bindTo": "UsrBaSkillComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.STRINGdd8274fd4b784567bc696997034037e8LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutebc6bcf3",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGroup0efac4d9",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelGroup0efac4d9GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7e221f91TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGridLayout20acac59",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7e221f91TabLabelGroup0efac4d9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLangEval9caaaa8f-1c87-4d2a-b46c-709dabf03a26",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7e221f91TabLabelGridLayout20acac59"
					},
					"bindTo": "UsrLangEval",
					"enabled": false
				},
				"parentName": "Tab7e221f91TabLabelGridLayout20acac59",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillGoodwillVoice5aeb9a22-d773-404d-9e8e-c18e8a68aad1",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayout20acac59"
					},
					"bindTo": "UsrBaSkillGoodwillVoice",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7e221f91TabLabelGridLayout20acac59",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrGettingKnowClientItemDescriptionb71be9c2-5782-489d-97ca-2d297b4f3883",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayout20acac59"
					},
					"bindTo": "UsrGettingKnowClientItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayout20acac59",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment25e2008a2-0e81-4290-9fed-7c0a736281bd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7e221f91TabLabelGridLayout20acac59"
					},
					"bindTo": "UsrBaSkillComment2",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment25e2008a20e8142909fed7c0a736281bdLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayout20acac59",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGroup2f895c1a",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelGroup2f895c1aGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7e221f91TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGridLayout205381fd",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7e221f91TabLabelGroup2f895c1a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPoliteEval3ebae7c1-9d11-4719-b6a9-c4021a7313d6",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7e221f91TabLabelGridLayout205381fd"
					},
					"bindTo": "UsrPoliteEval",
					"enabled": false
				},
				"parentName": "Tab7e221f91TabLabelGridLayout205381fd",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillClarityVoice76392c47-df47-41f2-a487-508d05298cb9",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayout205381fd"
					},
					"bindTo": "UsrBaSkillClarityVoice",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7e221f91TabLabelGridLayout205381fd",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrReferringCustomerNameItemDescriptiona3e9edb4-4d39-484f-a7cf-ece09577cac2",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayout205381fd"
					},
					"bindTo": "UsrReferringCustomerNameItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayout205381fd",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment3e3b96852-aa1c-4070-88ba-06d9cc59bef3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7e221f91TabLabelGridLayout205381fd"
					},
					"bindTo": "UsrBaSkillComment3",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment3e3b96852aa1c407088ba06d9cc59bef3LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayout205381fd",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGroupd33dcdeb",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7e221f91TabLabelGroupd33dcdebGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7e221f91TabLabel",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab7e221f91TabLabelGridLayoutd26bf20a",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7e221f91TabLabelGroupd33dcdeb",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSpeechRateEval4ddb6559-6f93-4160-991e-c40f250c9dc6",
				"values": {
					"layout": {
						"colSpan": 10,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7e221f91TabLabelGridLayoutd26bf20a"
					},
					"bindTo": "UsrSpeechRateEval",
					"enabled": false
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutd26bf20a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillClientAcquaintance93f50dbc-5b92-4abf-b7e8-ad23e0e2a7ae",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayoutd26bf20a"
					},
					"bindTo": "UsrBaSkillClientAcquaintance",
					"enabled": true,
					"labelConfig": {
						"visible": false
					}
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutd26bf20a",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPartingItemDescriptionaa214ce1-bafd-48c3-a7cd-ca0610e793c8",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7e221f91TabLabelGridLayoutd26bf20a"
					},
					"bindTo": "UsrPartingItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutd26bf20a",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment4569c5c83-3105-4922-af77-697111f4343e",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7e221f91TabLabelGridLayoutd26bf20a"
					},
					"bindTo": "UsrBaSkillComment4",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment4569c5c8331054922af77697111f4343eLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7e221f91TabLabelGridLayoutd26bf20a",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabel",
				"values": {
					"caption": "Общение",
					"items": [],
					"order": 2
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGroupa9f687cd",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab1b37a851TabLabelGroupa9f687cdGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab1b37a851TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGridLayout166785d3",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab1b37a851TabLabelGroupa9f687cd",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGERc8f653e0-6fe7-4578-b892-326b5614f893",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab1b37a851TabLabelGridLayout166785d3"
					},
					"bindTo": "UsrComStyleTotalEval",
					"enabled": false
				},
				"parentName": "Tab1b37a851TabLabelGridLayout166785d3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING34a91613-be7a-4409-9cf7-ccf8a5c2e1cf",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayout166785d3"
					},
					"bindTo": "UsrComStyleTotalComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.STRING34a91613be7a44099cf7ccf8a5c2e1cfLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayout166785d3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGroup8fc8ccce",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab1b37a851TabLabelGroup8fc8ccceGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab1b37a851TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGridLayout10ea0d88",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab1b37a851TabLabelGroup8fc8ccce",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLiteracyEvala6111312-df11-4808-bb25-a9718603c22a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab1b37a851TabLabelGridLayout10ea0d88"
					},
					"bindTo": "UsrLiteracyEval",
					"enabled": false
				},
				"parentName": "Tab1b37a851TabLabelGridLayout10ea0d88",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLiteracyLangTroubleUaf6d19fd2-6e05-4c43-a474-1c65038fbf04",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayout10ea0d88"
					},
					"bindTo": "UsrLiteracyLangTroubleUa",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab1b37a851TabLabelGridLayout10ea0d88",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSwitchingOneLanguageClientItemDescription64dc1cf0-8732-4e91-b3f5-1b5c07e4022b",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayout10ea0d88"
					},
					"bindTo": "UsrSwitchingOneLanguageClientItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayout10ea0d88",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrLiteracyComment15b99836f-0b72-4b03-b582-7fe393a28b3b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab1b37a851TabLabelGridLayout10ea0d88"
					},
					"bindTo": "UsrLiteracyComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrLiteracyComment15b99836f0b724b03b5827fe393a28b3bLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayout10ea0d88",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGroup4e3be6c3",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab1b37a851TabLabelGroup4e3be6c3GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab1b37a851TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGridLayoutcd3e0b9a",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab1b37a851TabLabelGroup4e3be6c3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRefEval20cee975-5cf2-4d9a-b956-6c92f6d6d642",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a"
					},
					"bindTo": "UsrRefEval",
					"enabled": false
				},
				"parentName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRefAbsentQuestion237a9e45-bafd-499c-b5bb-503651e62213",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a"
					},
					"bindTo": "UsrRefAbsentQuestion",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrLiteracyCultureSpeechItemDescription8d4d3beb-6019-4397-82c7-7cdf0402e2d9",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a"
					},
					"bindTo": "UsrLiteracyCultureSpeechItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrRefComment11eb81644-1235-4ee0-a0d1-5a1d66b46911",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a"
					},
					"bindTo": "UsrRefComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrRefComment11eb8164412354ee0a0d15a1d66b46911LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayoutcd3e0b9a",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGroup8bfcfb71",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab1b37a851TabLabelGroup8bfcfb71GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab1b37a851TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab1b37a851TabLabelGridLayoute997d1b9",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab1b37a851TabLabelGroup8bfcfb71",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrConvStyleEvalad66dd89-b107-4926-9285-019568183235",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab1b37a851TabLabelGridLayoute997d1b9"
					},
					"bindTo": "UsrConvStyleEval",
					"enabled": false
				},
				"parentName": "Tab1b37a851TabLabelGridLayoute997d1b9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrConvStyleExpertMonologf83b4e3d-0ae0-415b-bfe4-ebdb0d4d13d7",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayoute997d1b9"
					},
					"bindTo": "UsrConvStyleExpertMonolog",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab1b37a851TabLabelGridLayoute997d1b9",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrBusinessSpeechItemDescriptionc213c86a-7ca7-4d62-82ee-2845df3a3398",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab1b37a851TabLabelGridLayoute997d1b9"
					},
					"bindTo": "UsrBusinessSpeechItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab1b37a851TabLabelGridLayoute997d1b9",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrConvStyleComment1796bdd97-1c57-4da4-8a4b-1be1a9687ccf",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab1b37a851TabLabelGridLayoute997d1b9"
					},
					"bindTo": "UsrConvStyleComment1",
					"enabled": true,
					"contentType": 0,
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrConvStyleComment1796bdd971c574da48a4b1be1a9687ccfLabelCaption"
						}
					}
				},
				"parentName": "Tab1b37a851TabLabelGridLayoute997d1b9",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelTabCaption"
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
				"name": "Tab7c541ae2TabLabelGroup824da148",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelGroup824da148GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGridLayout0061054f",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabelGroup824da148",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER7d0b4a6f-cac6-4cab-b4ff-8232cdd9df9f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c541ae2TabLabelGridLayout0061054f"
					},
					"bindTo": "UsrComManageTotalEval",
					"enabled": false
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout0061054f",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING761085e2-49df-4b7c-aba8-c2ef5d858d59",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout0061054f"
					},
					"bindTo": "UsrComManageTotalComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout0061054f",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGroupc79ec059",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelGroupc79ec059GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGridLayout132bbad7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabelGroupc79ec059",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAnswCharactEvalcbc9030f-2e36-4c97-8145-b325ff7567bd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c541ae2TabLabelGridLayout132bbad7"
					},
					"bindTo": "UsrAnswCharactEval",
					"enabled": false
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout132bbad7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAnswCharactUncertain4451747d-f2b1-41bd-836c-d0fdaa13f359",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout132bbad7"
					},
					"bindTo": "UsrAnswCharactUncertain",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout132bbad7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrIntonationItemDescription125158f8-32e3-4117-a2a9-1db173b9a0ca",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout132bbad7"
					},
					"bindTo": "UsrIntonationItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout132bbad7",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrAnswCharactComment1feb5f8cb-3f55-472d-a119-244abf297fe5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7c541ae2TabLabelGridLayout132bbad7"
					},
					"bindTo": "UsrAnswCharactComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrAnswCharactComment1feb5f8cb3f55472da119244abf297fe5LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout132bbad7",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGroup29fae3fa",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelGroup29fae3faGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGridLayout35d369f5",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabelGroup29fae3fa",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrNaturalComEval7c355c5d-84e3-41ea-8aaf-78b12a437850",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c541ae2TabLabelGridLayout35d369f5"
					},
					"bindTo": "UsrNaturalComEval",
					"enabled": false
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout35d369f5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrNaturalComPassphraseAbsentafc299a1-8cbb-414d-b54d-640d1b2e41f6",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout35d369f5"
					},
					"bindTo": "UsrNaturalComPassphraseAbsent",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout35d369f5",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrPolitenessItemDescription4e6dc310-6f08-4d66-9a8c-dc651a664f16",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout35d369f5"
					},
					"bindTo": "UsrPolitenessItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout35d369f5",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrNaturalComComment1e7a49f96-f09f-465a-810d-7b2857e92311",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7c541ae2TabLabelGridLayout35d369f5"
					},
					"bindTo": "UsrNaturalComComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrNaturalComComment1e7a49f96f09f465a810d7b2857e92311LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout35d369f5",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGroup465e6058",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelGroup465e6058GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGridLayoutbef47313",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabelGroup465e6058",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrCorrectnessEval136e816b-82ce-47d7-9164-1c79ba9c7a25",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c541ae2TabLabelGridLayoutbef47313"
					},
					"bindTo": "UsrCorrectnessEval",
					"enabled": false
				},
				"parentName": "Tab7c541ae2TabLabelGridLayoutbef47313",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrCorrectnessNoRigthAnswe167a845-1929-40ec-8315-a34a60ccf741",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayoutbef47313"
					},
					"bindTo": "UsrCorrectnessNoRigthAnsw",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7c541ae2TabLabelGridLayoutbef47313",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrInterruptionItemDescription8e761146-c398-4973-aefc-dd11f01e1df5",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayoutbef47313"
					},
					"bindTo": "UsrInterruptionItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayoutbef47313",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrCorrectnessComment1b2f51c10-f615-45b7-883c-4285f878a9b7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7c541ae2TabLabelGridLayoutbef47313"
					},
					"bindTo": "UsrCorrectnessComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrCorrectnessComment1b2f51c10f61545b7883c4285f878a9b7LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayoutbef47313",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGroup08682ecf",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c541ae2TabLabelGroup08682ecfGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabel",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab7c541ae2TabLabelGridLayout42cebe97",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c541ae2TabLabelGroup08682ecf",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRequiredVolEval4f732248-818b-4c74-ba4d-d214b91965da",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c541ae2TabLabelGridLayout42cebe97"
					},
					"bindTo": "UsrRequiredVolEval",
					"enabled": false
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout42cebe97",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRequiredVolUnnecesaryInfo0c1170ea-b1f5-4d7c-ae22-77190e55b90b",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout42cebe97"
					},
					"bindTo": "UsrRequiredVolUnnecesaryInfo",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout42cebe97",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrClearDictionVoiceConfidenceItemDescription7796a0f9-bf9c-4579-91e6-c1dbcafb5090",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c541ae2TabLabelGridLayout42cebe97"
					},
					"bindTo": "UsrClearDictionVoiceConfidenceItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout42cebe97",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrRequiredVolComment2241783cd-9429-4ba9-b5b3-d26010d7ed91",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7c541ae2TabLabelGridLayout42cebe97"
					},
					"bindTo": "UsrRequiredVolComment2",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrRequiredVolComment2241783cd94294ba9b5b3d26010d7ed91LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c541ae2TabLabelGridLayout42cebe97",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab35708b24TabLabelTabCaption"
					},
					"items": [],
					"order": 4
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGroup9810a25b",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab35708b24TabLabelGroup9810a25bGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab35708b24TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGridLayout6cffb515",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab35708b24TabLabelGroup9810a25b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER2a9b218a-f559-46df-a248-deb56f050d67",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab35708b24TabLabelGridLayout6cffb515"
					},
					"bindTo": "UsrExpertiseTotalEval",
					"enabled": false
				},
				"parentName": "Tab35708b24TabLabelGridLayout6cffb515",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING982934e5-cfb7-44df-821a-891d6a05048a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout6cffb515"
					},
					"bindTo": "UsrExpertiseTotalComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.STRING982934e5cfb744df821a891d6a05048aLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout6cffb515",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGroupe3cf1083",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab35708b24TabLabelGroupe3cf1083GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab35708b24TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGridLayout02491dd2",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab35708b24TabLabelGroupe3cf1083",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrClearExplanEvalccee079f-5cb3-4b3e-9214-e4b1e7fd4ca8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab35708b24TabLabelGridLayout02491dd2"
					},
					"bindTo": "UsrClearExplanEval",
					"enabled": false
				},
				"parentName": "Tab35708b24TabLabelGridLayout02491dd2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrClearExplanConvLinkAbsent2da6a0fb-8a09-47a5-a21e-1fea4f903f6d",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 19,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout02491dd2"
					},
					"bindTo": "UsrClearExplanConvLinkAbsent",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab35708b24TabLabelGridLayout02491dd2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrProactivityItemDescription49167297-82de-4741-863e-cf93cd783f6b",
				"values": {
					"layout": {
						"colSpan": 18,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout02491dd2"
					},
					"bindTo": "UsrProactivityItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout02491dd2",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrClearExplanComment23b0fbc67-e4da-4c29-bc16-2e1326e20cc8",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab35708b24TabLabelGridLayout02491dd2"
					},
					"bindTo": "UsrClearExplanComment2",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrClearExplanComment23b0fbc67e4da4c29bc162e1326e20cc8LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout02491dd2",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGroupc50c044d",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab35708b24TabLabelGroupc50c044dGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab35708b24TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGridLayout2e5e31f3",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab35708b24TabLabelGroupc50c044d",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrProblemSolvEval7d6d3b1b-c3dc-4057-a67e-9f176f8cc0c9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab35708b24TabLabelGridLayout2e5e31f3"
					},
					"bindTo": "UsrProblemSolvEval",
					"enabled": false
				},
				"parentName": "Tab35708b24TabLabelGridLayout2e5e31f3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrProblemSolvIgnorQuestions75ba922f-1640-4dc9-8a20-aee9cc8564d4",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 19,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout2e5e31f3"
					},
					"bindTo": "UsrProblemSolvIgnorQuestions",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab35708b24TabLabelGridLayout2e5e31f3",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrConversationControlItemDescription83df007b-975e-4ab6-baa3-dc2e62781177",
				"values": {
					"layout": {
						"colSpan": 18,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout2e5e31f3"
					},
					"bindTo": "UsrConversationControlItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout2e5e31f3",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrProblemSolvComment19a06f754-05fd-4407-8da6-344f047a5101",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab35708b24TabLabelGridLayout2e5e31f3"
					},
					"bindTo": "UsrProblemSolvComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrProblemSolvComment19a06f75405fd44078da6344f047a5101LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout2e5e31f3",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGroupdee78514",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab35708b24TabLabelGroupdee78514GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab35708b24TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab35708b24TabLabelGridLayout04d8fa74",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab35708b24TabLabelGroupdee78514",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrClientRelatEvalbc00163b-347b-4a87-aa57-c97e68b6589f",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab35708b24TabLabelGridLayout04d8fa74"
					},
					"bindTo": "UsrClientRelatEval",
					"enabled": false
				},
				"parentName": "Tab35708b24TabLabelGridLayout04d8fa74",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrClientRelatAtten8644d266-cba3-4843-8dbc-5bc6c36ec21b",
				"values": {
					"layout": {
						"colSpan": 5,
						"rowSpan": 1,
						"column": 19,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout04d8fa74"
					},
					"bindTo": "UsrClientRelatAtten",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab35708b24TabLabelGridLayout04d8fa74",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrCompletenessInformationItemDescription62a252de-0f89-4ee4-9aeb-c75bca936a03",
				"values": {
					"layout": {
						"colSpan": 18,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab35708b24TabLabelGridLayout04d8fa74"
					},
					"bindTo": "UsrCompletenessInformationItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout04d8fa74",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrClientRelatComment174521250-1708-4c37-8e33-f034ac539e42",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab35708b24TabLabelGridLayout04d8fa74"
					},
					"bindTo": "UsrClientRelatComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrClientRelatComment17452125017084c378e33f034ac539e42LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab35708b24TabLabelGridLayout04d8fa74",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelTabCaption"
					},
					"items": [],
					"order": 5
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroup5eb1984b",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroup5eb1984bGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayout0b267c5a",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroup5eb1984b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGERdb701c66-9088-419f-8453-f420f0dcbcaa",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayout0b267c5a"
					},
					"bindTo": "UsrClientRelatTotalEval",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout0b267c5a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING3990da47-ed59-4953-a2be-718fdd6856e3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout0b267c5a"
					},
					"bindTo": "UsrClientRelatTotalComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout0b267c5a",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroup5a4e2aa3",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroup5a4e2aa3GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayout8ca6b57b",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroup5a4e2aa3",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrHoldEvalf82137bd-7a18-4c4d-bf96-ff06d9a22558",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayout8ca6b57b"
					},
					"bindTo": "UsrHoldEval",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout8ca6b57b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrHoldb6660376-282d-4a58-8478-78b575a5ae2b",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 20,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout8ca6b57b"
					},
					"bindTo": "UsrHold",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout8ca6b57b",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrActiveListeningItemDescription491ea51a-a33f-43ad-bf62-8fa54ba2164b",
				"values": {
					"layout": {
						"colSpan": 19,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout8ca6b57b"
					},
					"bindTo": "UsrActiveListeningItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout8ca6b57b",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrHoldComment4830880d-59a0-4309-8902-eecaa02404f7",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab38b0a31cTabLabelGridLayout8ca6b57b"
					},
					"bindTo": "UsrHoldComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrHoldComment4830880d59a043098902eecaa02404f7LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout8ca6b57b",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroup8673c307",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroup8673c307GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayout3edca6e2",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroup8673c307",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRegAppeal69b9f83b-c620-481a-a550-ead69e865cdd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayout3edca6e2"
					},
					"bindTo": "UsrRegAppeal",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout3edca6e2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRegAppealAbsenta010ceaf-69a3-46d9-ba83-d5a0226de335",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 20,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout3edca6e2"
					},
					"bindTo": "UsrRegAppealAbsent",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout3edca6e2",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrAttentivenessItemDescription15e3cc71-6790-4979-8386-05482832949f",
				"values": {
					"layout": {
						"colSpan": 19,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout3edca6e2"
					},
					"bindTo": "UsrAttentivenessItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout3edca6e2",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrRegAppealComment191bb49c5-a5b6-45ef-b952-7e790d280be3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab38b0a31cTabLabelGridLayout3edca6e2"
					},
					"bindTo": "UsrRegAppealComment1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrRegAppealComment191bb49c5a5b645efb9527e790d280be3LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout3edca6e2",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroupc232446e",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroupc232446eGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayoutf675b685",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroupc232446e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScoreSummaries9029e7c1-c407-40a7-a182-a518d5e22bca",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayoutf675b685"
					},
					"bindTo": "UsrScoreSummaries",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayoutf675b685",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillUnskillfullAcquaintance2d6bbf3e-dbf7-4a36-ab33-37ea85f2c7af",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 20,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayoutf675b685"
					},
					"bindTo": "UsrBaSkillUnskillfullAcquaintance",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab38b0a31cTabLabelGridLayoutf675b685",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSummarizingItemDescriptionfeaf573a-b6df-4f4e-b50e-f33090b925c8",
				"values": {
					"layout": {
						"colSpan": 19,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayoutf675b685"
					},
					"bindTo": "UsrSummarizingItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayoutf675b685",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment585182fce-5074-40b0-8d22-28344a152fbe",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab38b0a31cTabLabelGridLayoutf675b685"
					},
					"bindTo": "UsrBaSkillComment5",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment585182fce507440b08d2228344a152fbeLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayoutf675b685",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroupc8dcbfb0",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroupc8dcbfb0GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayout243f0236",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroupc8dcbfb0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrTransitionalPhrase4e23739d-6def-40bb-9ff2-3d72bdf285de",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayout243f0236"
					},
					"bindTo": "UsrTransitionalPhrase",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout243f0236",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillFarewellNotStandard11a3c5be-6be5-45bd-aaa4-6740a9b4533c",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 20,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout243f0236"
					},
					"bindTo": "UsrBaSkillFarewellNotStandard",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout243f0236",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrTransitionalPhraseItemDescription6fa025d6-105d-4fa3-b01a-7cc9f8149c65",
				"values": {
					"layout": {
						"colSpan": 19,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout243f0236"
					},
					"bindTo": "UsrTransitionalPhraseItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout243f0236",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment6a14d2612-1f2f-45bd-b72e-805d283fd8bd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab38b0a31cTabLabelGridLayout243f0236"
					},
					"bindTo": "UsrBaSkillComment6",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment6a14d26121f2f45bdb72e805d283fd8bdLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout243f0236",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGroupa2c9be38",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab38b0a31cTabLabelGroupa2c9be38GroupCaption"
					},
					"visible":{
						"bindTo": "isDialogueTypeServiceLine"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabel",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "Tab38b0a31cTabLabelGridLayout216591e0",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab38b0a31cTabLabelGroupa2c9be38",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScoreObjectionHandling69729f25-e53e-4a4b-b09c-3d94c6656cda",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab38b0a31cTabLabelGridLayout216591e0"
					},
					"bindTo": "UsrScoreObjectionHandling",
					"enabled": false
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout216591e0",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPoliteFamiliarity003855b5-11ad-4059-af87-6d6fb7fbcb00",
				"values": {
					"layout": {
						"colSpan": 4,
						"rowSpan": 1,
						"column": 20,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout216591e0"
					},
					"bindTo": "UsrPoliteFamiliarity",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout216591e0",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrWorkingWithObjectionsItemDescriptiond971b4ef-65b6-4972-bb4c-b61e42ce4e4e",
				"values": {
					"layout": {
						"colSpan": 19,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab38b0a31cTabLabelGridLayout216591e0"
					},
					"bindTo": "UsrWorkingWithObjectionsItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout216591e0",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPoliteComment1042ef727-2c39-46f8-8e48-a76f3087e985",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab38b0a31cTabLabelGridLayout216591e0"
					},
					"bindTo": "UsrPoliteComment1",
					"enabled": true,
					"contentType": 0,
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrPoliteComment1042ef7272c3946f88e48a76f3087e985LabelCaption"
						}
					}
				},
				"parentName": "Tab38b0a31cTabLabelGridLayout216591e0",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7c9fce08TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c9fce08TabLabelTabCaption"
					},
					"items": [],
					"order": 6
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "Tab7c9fce08TabLabelGroup35d5cfef",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c9fce08TabLabelGroup35d5cfefGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c9fce08TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7c9fce08TabLabelGridLayout5ca1fe96",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c9fce08TabLabelGroup35d5cfef",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrFinalScoreCorrectnessTiming0fafa734-3809-4a5a-b579-e466718c69c0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c9fce08TabLabelGridLayout5ca1fe96"
					},
					"bindTo": "UsrFinalScoreCorrectnessTiming",
					"enabled": false
				},
				"parentName": "Tab7c9fce08TabLabelGridLayout5ca1fe96",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAccuracyTimingFinalComment6b8dd9b0-31bd-4418-873f-c1df72568449",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c9fce08TabLabelGridLayout5ca1fe96"
					},
					"bindTo": "UsrAccuracyTimingFinalComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrAccuracyTimingFinalComment6b8dd9b031bd4418873fc1df72568449LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c9fce08TabLabelGridLayout5ca1fe96",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7c9fce08TabLabelGroup8a053ae9",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7c9fce08TabLabelGroup8a053ae9GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7c9fce08TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7c9fce08TabLabelGridLayoutdc53632b",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7c9fce08TabLabelGroup8a053ae9",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrAssessmentCorrectnessDeadlinee502309a-ba82-49eb-9186-6a1ac2531d93",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7c9fce08TabLabelGridLayoutdc53632b"
					},
					"bindTo": "UsrAssessmentCorrectnessDeadline",
					"enabled": false
				},
				"parentName": "Tab7c9fce08TabLabelGridLayoutdc53632b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillBulkyFarewellb17ac6b2-f48b-49c0-832a-71d199ec0f53",
				"values": {
					"layout": {
						"colSpan": 6,
						"rowSpan": 1,
						"column": 18,
						"row": 1,
						"layoutName": "Tab7c9fce08TabLabelGridLayoutdc53632b"
					},
					"bindTo": "UsrBaSkillBulkyFarewell",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7c9fce08TabLabelGridLayoutdc53632b",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrCorrectnessDeadlineItemDescription149dc83f-d7f2-45ff-a3a5-d81cd30ddc13",
				"values": {
					"layout": {
						"colSpan": 17,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7c9fce08TabLabelGridLayoutdc53632b"
					},
					"bindTo": "UsrCorrectnessDeadlineItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7c9fce08TabLabelGridLayoutdc53632b",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment79480dd67-973c-4806-b730-f570d265bde5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7c9fce08TabLabelGridLayoutdc53632b"
					},
					"bindTo": "UsrBaSkillComment7",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment79480dd67973c4806b730f570d265bde5LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7c9fce08TabLabelGridLayoutdc53632b",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabel",
				"values": {
					"caption": "Процедурная часть",
					"items": [],
					"order": 7
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGroup25ff2dba",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7635c817TabLabelGroup25ff2dbaGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7635c817TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGridLayoutd0aba05e",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7635c817TabLabelGroup25ff2dba",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "INTEGER9fa63e9e-1d3e-4d9d-a655-94704a29b09a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7635c817TabLabelGridLayoutd0aba05e"
					},
					"bindTo": "UsrProcPartTotalEval",
					"enabled": false
				},
				"parentName": "Tab7635c817TabLabelGridLayoutd0aba05e",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING562b64b4-7644-4bc4-b76e-a580ed7b9d32",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayoutd0aba05e"
					},
					"bindTo": "UsrProcPartTotalComment",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayoutd0aba05e",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGroup226325ff",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7635c817TabLabelGroup226325ffGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7635c817TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGridLayoutc835729d",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7635c817TabLabelGroup226325ff",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRatingTelephonye5a0d9a8-0ec7-40cf-b074-d561e4874b1a",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7635c817TabLabelGridLayoutc835729d"
					},
					"bindTo": "UsrRatingTelephony",
					"enabled": false
				},
				"parentName": "Tab7635c817TabLabelGridLayoutc835729d",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillFixPrevAppeal7960b564-8b54-4d70-b5b5-08b3c3b2d42f",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 17,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayoutc835729d"
					},
					"bindTo": "UsrBaSkillFixPrevAppeal",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7635c817TabLabelGridLayoutc835729d",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrDescriptionItemTelephonyItemDescription192885ea-8151-4908-9959-00fcecbc100c",
				"values": {
					"layout": {
						"colSpan": 16,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayoutc835729d"
					},
					"bindTo": "UsrDescriptionItemTelephonyItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayoutc835729d",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrBaSkillComment83c5e0a2e-d364-46de-9f7d-77fc5c8987b0",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7635c817TabLabelGridLayoutc835729d"
					},
					"bindTo": "UsrBaSkillComment8",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBaSkillComment83c5e0a2ed36446de9f7d77fc5c8987b0LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayoutc835729d",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGroup319987f5",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7635c817TabLabelGroup319987f5GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7635c817TabLabel",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGridLayoutda8a8725",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7635c817TabLabelGroup319987f5",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScoreCorrectUseHOLDPAUSEd4a79bf0-762f-40a6-b76a-a1748d8294a3",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7635c817TabLabelGridLayoutda8a8725"
					},
					"bindTo": "UsrScoreCorrectUseHOLDPAUSE",
					"enabled": false
				},
				"parentName": "Tab7635c817TabLabelGridLayoutda8a8725",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLangNoClientLang9d0e4519-822d-46ed-8684-99aa8847155a",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 17,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayoutda8a8725"
					},
					"bindTo": "UsrLangNoClientLang",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7635c817TabLabelGridLayoutda8a8725",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrProperUseHOLDPAUSEItemDescription318a0714-e37e-4023-a644-c1e97a6acbcc",
				"values": {
					"layout": {
						"colSpan": 16,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayoutda8a8725"
					},
					"bindTo": "UsrProperUseHOLDPAUSEItemDescription",
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayoutda8a8725",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrLangComment13f3dc1f4-b7f6-4f71-b75b-7a42bf5075cd",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7635c817TabLabelGridLayoutda8a8725"
					},
					"bindTo": "UsrLangComment1",
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayoutda8a8725",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGroup014dd3e1",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab7635c817TabLabelGroup014dd3e1GroupCaption"
					},
					"visible":{ "bindTo": "isDialogueTypeServiceLine" },
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab7635c817TabLabel",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab7635c817TabLabelGridLayout64b52d29",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab7635c817TabLabelGroup014dd3e1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrScoreFollowingInstructionsProcessingOrdersd6f99fff-875b-4116-9e7b-1afe33ece40b",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab7635c817TabLabelGridLayout64b52d29"
					},
					"bindTo": "UsrScoreFollowingInstructionsProcessingOrders",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrScoreFollowingInstructionsProcessingOrdersd6f99fff875b41169e7b1afe33ece40bLabelCaption"
						}
					},
					"enabled": false
				},
				"parentName": "Tab7635c817TabLabelGridLayout64b52d29",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrPoliteNotEnougfPW3bdccb84-eeca-4272-bd19-4f9bb61550a3",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 17,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayout64b52d29"
					},
					"bindTo": "UsrPoliteNotEnougfPW",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tab7635c817TabLabelGridLayout64b52d29",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrComplianceInstructionsProcessingOrdersItemDescriptionfd9ad0ac-b6e7-4fc7-a1d0-3c2397ef2d59",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab7635c817TabLabelGridLayout64b52d29"
					},
					"bindTo": "UsrComplianceInstructionsProcessingOrdersItemDescription",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrComplianceInstructionsProcessingOrdersItemDescriptionfd9ad0acb6e74fc7a1d03c2397ef2d59LabelCaption"
						}
					},
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab7635c817TabLabelGridLayout64b52d29",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrPoliteComment23d84d50f-ec3a-47b7-9641-93c22994b832",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab7635c817TabLabelGridLayout64b52d29"
					},
					"bindTo": "UsrPoliteComment2",
					"enabled": true,
					"contentType": 0,
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrPoliteComment23d84d50fec3a47b7964193c22994b832LabelCaption"
						}
					}
				},
				"parentName": "Tab7635c817TabLabelGridLayout64b52d29",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tab21d2db8cTabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab21d2db8cTabLabelTabCaption"
					},
					"items": [],
					"order": 8
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 8
			},
			{
				"operation": "insert",
				"name": "Tab21d2db8cTabLabelGroupfb19b8e2",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab21d2db8cTabLabelGroupfb19b8e2GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab21d2db8cTabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tab21d2db8cTabLabelGridLayout0d2a554c",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab21d2db8cTabLabelGroupfb19b8e2",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrFinalScoreBrandPhraseef55ef3a-9d08-4727-a6f3-d94dab61602c",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab21d2db8cTabLabelGridLayout0d2a554c"
					},
					"bindTo": "UsrFinalScoreBrandPhrase",
					"enabled": false
				},
				"parentName": "Tab21d2db8cTabLabelGridLayout0d2a554c",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBrandPhraseFinalCommentdc0030b8-08b8-4ee0-a3f6-f2f172b715f9",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab21d2db8cTabLabelGridLayout0d2a554c"
					},
					"bindTo": "UsrBrandPhraseFinalComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBrandPhraseFinalCommentdc0030b808b84ee0a3f6f2f172b715f9LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab21d2db8cTabLabelGridLayout0d2a554c",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab21d2db8cTabLabelGroup2292963a",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tab21d2db8cTabLabelGroup2292963aGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tab21d2db8cTabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tab21d2db8cTabLabelGridLayoutc24e931b",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tab21d2db8cTabLabelGroup2292963a",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrRatingSpecialOfferBrandPhrasePeriod004f6aad-fdca-4b73-afd6-e7b4b1411fb4",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tab21d2db8cTabLabelGridLayoutc24e931b"
					},
					"bindTo": "UsrRatingSpecialOfferBrandPhrasePeriod",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrRatingSpecialOfferBrandPhrasePeriod004f6aadfdca4b73afd6e7b4b1411fb4LabelCaption"
						}
					},
					"enabled": false
				},
				"parentName": "Tab21d2db8cTabLabelGridLayoutc24e931b",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrLangNoUsePCLang727884a0-510d-4bde-ac9e-a5418743344b",
				"values": {
					"layout": {
						"colSpan": 8,
						"rowSpan": 1,
						"column": 16,
						"row": 1,
						"layoutName": "Tab21d2db8cTabLabelGridLayoutc24e931b"
					},
					"bindTo": "UsrLangNoUsePCLang",
					"labelConfig": {
						"visible": false,
						"caption": {
							"bindTo": "Resources.Strings.UsrLangNoUsePCLang727884a0510d4bdeac9ea5418743344bLabelCaption"
						}
					},
					"enabled": true
				},
				"parentName": "Tab21d2db8cTabLabelGridLayoutc24e931b",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrSpecialOfferBrandPhrasePeriodItemDescriptionb7db2c50-2b75-4195-8e87-036f9c8009fa",
				"values": {
					"layout": {
						"colSpan": 15,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tab21d2db8cTabLabelGridLayoutc24e931b"
					},
					"bindTo": "UsrSpecialOfferBrandPhrasePeriodItemDescription",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrSpecialOfferBrandPhrasePeriodItemDescriptionb7db2c502b7541958e87036f9c8009faLabelCaption"
						}
					},
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tab21d2db8cTabLabelGridLayoutc24e931b",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrLangComment230c48968-45e4-44aa-9bbc-5f57dbfbb255",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tab21d2db8cTabLabelGridLayoutc24e931b"
					},
					"bindTo": "UsrLangComment2",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrLangComment230c4896845e444aa9bbc5f57dbfbb255LabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tab21d2db8cTabLabelGridLayoutc24e931b",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "Tabf29d4bc0TabLabel",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabf29d4bc0TabLabelTabCaption"
					},
					"items": [],
					"order": 9
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 9
			},
			{
				"operation": "insert",
				"name": "Tabf29d4bc0TabLabelGroupb99dd0cc",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabf29d4bc0TabLabelGroupb99dd0ccGroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tabf29d4bc0TabLabel",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Tabf29d4bc0TabLabelGridLayout95cbf9f7",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tabf29d4bc0TabLabelGroupb99dd0cc",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrFinalScoreBonusea8f5b3f-12c4-41d7-ae68-d6c5a3fc3100",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tabf29d4bc0TabLabelGridLayout95cbf9f7"
					},
					"bindTo": "UsrFinalScoreBonus",
					"enabled": false
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayout95cbf9f7",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBonusFinalComment716962d3-b281-456f-9440-28503085cfde",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tabf29d4bc0TabLabelGridLayout95cbf9f7"
					},
					"bindTo": "UsrBonusFinalComment",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBonusFinalComment716962d3b281456f944028503085cfdeLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayout95cbf9f7",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tabf29d4bc0TabLabelGroupc04a6ec1",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.Tabf29d4bc0TabLabelGroupc04a6ec1GroupCaption"
					},
					"itemType": 15,
					"markerValue": "added-group",
					"items": []
				},
				"parentName": "Tabf29d4bc0TabLabel",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Tabf29d4bc0TabLabelGridLayouta5c7e420",
				"values": {
					"itemType": 0,
					"items": []
				},
				"parentName": "Tabf29d4bc0TabLabelGroupc04a6ec1",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrBonusScore73fa15b4-bf9a-4a15-8c0c-04e6ad7307b5",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Tabf29d4bc0TabLabelGridLayouta5c7e420"
					},
					"bindTo": "UsrBonusScore",
					"enabled": false
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayouta5c7e420",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrDisRespectce77d63b-f696-4f71-8fe5-8d745ef465e3",
				"values": {
					"layout": {
						"colSpan": 7,
						"rowSpan": 1,
						"column": 17,
						"row": 1,
						"layoutName": "Tabf29d4bc0TabLabelGridLayouta5c7e420"
					},
					"bindTo": "UsrDisRespect",
					"labelConfig": {
						"visible": false
					},
					"enabled": true
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayouta5c7e420",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "UsrBonusPartMaintenanceServiceItemDescription931fe7d5-f463-4c03-ba76-4aa833369aa4",
				"values": {
					"layout": {
						"colSpan": 16,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Tabf29d4bc0TabLabelGridLayouta5c7e420"
					},
					"bindTo": "UsrBonusPartMaintenanceServiceItemDescription",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrBonusPartMaintenanceServiceItemDescription931fe7d5f4634c03ba764aa833369aa4LabelCaption"
						}
					},
					"enabled": false,
					"contentType": 0
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayouta5c7e420",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "UsrLangComment3bddacb1b-8c8d-4302-8aa9-e56fd53eeace",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Tabf29d4bc0TabLabelGridLayouta5c7e420"
					},
					"bindTo": "UsrLangComment3",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.UsrLangComment3bddacb1b8c8d43028aa9e56fd53eeaceLabelCaption"
						}
					},
					"enabled": true,
					"contentType": 0
				},
				"parentName": "Tabf29d4bc0TabLabelGridLayouta5c7e420",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 10
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 10
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
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
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 11
				}
			}
		]/**SCHEMA_DIFF*/,
		
		methods: {
				onEntityInitialized: function(){
				this.callParent(arguments);
			
				this.callEvalNumber();
				//CHANGE TABS PLACE 
				this.TabsDelete();
				this.TabsAdd();
				//SUM
				//sum 1 UsrBaSkillTotalEval 
				this.setSUMUsrBaSkillTotalEval();
				//sum 2 UsrComStyleTotalEval 
				this.setSumInUsrComManageTotalEval();
				//sum 3 
				this.setSUMUsrComManageTotalEval();
				//sum of FOURTh expression
				this.setSUMUsrExpertiseTotalEval();
				//sum of FIFTH expression
				this.setSUMUUsrClientRelatTotalEval();
				//sum of SIXTH expression
				this.setSUMUsrFinalScoreCorrectnessTiming();
				//sum of SEVEN expression
				this.setSUMUsrProcPartTotalEval();
				//sum of EIGHT expression
				this.setSUMUsrFinalScoreBrandPhrase();
				//sum of NINE expression
				this.setSUMUsrFinalScoreBonus();
				
				//MAIN SUM FOR CALL 
				this.setMainSum();
				
				//CHECK all checkbox
				this.setUsrBaSkillEval0();
				this.setUsrLiteracyEval0();
				this.setUsrAnswCharactEval0();
				this.setUsrClearExplanEval0();
				this.setUsrHoldEval0();
				this.setUsrAssessmentCorrectnessDeadline();
				this.setUsrRatingTelephony();
				this.setUsrRatingSpecialOfferBrandPhrasePeriod();
				this.setUsrBonusScore();
				
				this.on("change:UsrDialogType", this.setUsrAnswCharactEval0, this);
				this.on("change:UsrDialogType", this.setUsrClearExplanEval0, this);
				this.on("change:UsrDialogType", this.setUsrHoldEval0, this);
				this.on("change:UsrDialogType", this.setUsrAssessmentCorrectnessDeadline, this);
				this.on("change:UsrDialogType", this.setUsrRatingTelephony, this);
				this.on("change:UsrDialogType", this.dialogueType, this);
				this.on("change:UsrDialogType", this.setUsrBaSkillEval0, this);
				
				//ON CHANGE
				//setUsrBaSkillEval0
				this.on("change:UsrBaSkillGretings", this.setUsrBaSkillEval0, this);
				this.on("change:UsrBaSkillGoodwillVoice", this.setUsrBaSkillEval0, this);
				this.on("change:UsrBaSkillClarityVoice", this.setUsrBaSkillEval0, this);
				this.on("change:UsrBaSkillClientAcquaintance", this.setUsrBaSkillEval0, this);
				
				//setUsrLiteracyEval0
				this.on("change:UsrLiteracyLangTroubleUa", this.setUsrLiteracyEval0, this);
				this.on("change:UsrRefAbsentQuestion", this.setUsrLiteracyEval0, this);
				this.on("change:UsrConvStyleExpertMonolog", this.setUsrLiteracyEval0, this);
				
				//setUsrAnswCharactEval0
				this.on("change:UsrAnswCharactUncertain", this.setUsrAnswCharactEval0, this);
				this.on("change:UsrNaturalComPassphraseAbsent", this.setUsrAnswCharactEval0, this);
				this.on("change:UsrCorrectnessNoRigthAnsw", this.setUsrAnswCharactEval0, this);
				this.on("change:UsrRequiredVolUnnecesaryInfo", this.setUsrAnswCharactEval0, this);
		
				//setUsrClearExplanEval0
				this.on("change:UsrClearExplanConvLinkAbsent", this.setUsrClearExplanEval0, this);
				this.on("change:UsrProblemSolvIgnorQuestions", this.setUsrClearExplanEval0, this);
				this.on("change:UsrClientRelatAtten", this.setUsrClearExplanEval0, this);
		
				//setUsrHoldEval0
				this.on("change:UsrHold", this.setUsrHoldEval0, this);
				this.on("change:UsrRegAppealAbsent", this.setUsrHoldEval0, this);
				this.on("change:UsrBaSkillUnskillfullAcquaintance", this.setUsrHoldEval0, this);
				this.on("change:UsrBaSkillFarewellNotStandard", this.setUsrHoldEval0, this);
				this.on("change:UsrPoliteFamiliarity", this.setUsrHoldEval0, this);
				
				//setUsrAssessmentCorrectnessDeadline
				this.on("change:UsrBaSkillBulkyFarewell", this.setUsrAssessmentCorrectnessDeadline, this);
				
				//setUsrRatingTelephony
				this.on("change:UsrBaSkillFixPrevAppeal", this.setUsrRatingTelephony, this);
				this.on("change:UsrLangNoClientLang", this.setUsrRatingTelephony, this);
				this.on("change:UsrPoliteNotEnougfPW", this.setUsrRatingTelephony, this);
				
				//setUsrRatingSpecialOfferBrandPhrasePeriod
				this.on("change:UsrLangNoUsePCLang", this.setUsrRatingSpecialOfferBrandPhrasePeriod, this);
				
				//setUsrBonusScore
				this.on("change:UsrDisRespect", this.setUsrBonusScore, this);
				this.on("change:UsrBonusScore", this.setSUMUsrFinalScoreBonus, this);
			}, 
			defaultCheckBoxValues: function(){
				this.set("UsrBaSkillGretings", true);
				this.set("UsrBaSkillGoodwillVoice", true);
				this.set("UsrBaSkillClarityVoice", true);
				this.set("UsrBaSkillClientAcquaintance", true);
				this.set("UsrBaSkillEval", true);
				this.set("UsrLangEval", true);
				this.set("UsrPoliteEval", true);
				this.set("UsrSpeechRateEval", true);
				this.set("UsrLiteracyLangTroubleUa", true);
				this.set("UsrRefAbsentQuestion", true);
				this.set("UsrConvStyleExpertMonolog", true);
				this.set("UsrLiteracyEval", true);
				this.set("UsrRefEval", true);
				this.set("UsrConvStyleEval", true);
				this.set("UsrAnswCharactUncertain", true);
				this.set("UsrNaturalComPassphraseAbsent", true);
				this.set("UsrCorrectnessNoRigthAnsw", true);
				this.set("UsrRequiredVolUnnecesaryInfo", true);
				this.set("UsrAnswCharactEval", true);
				this.set("UsrNaturalComEval", true);
				this.set("UsrCorrectnessEval", true);
				this.set("UsrRequiredVolEval", true);
				this.set("UsrClearExplanConvLinkAbsent", true);
				this.set("UsrProblemSolvIgnorQuestions", true);
				this.set("UsrClientRelatAtten", true);
				this.set("UsrClearExplanEval", true);
				this.set("UsrProblemSolvEval", true);
				this.set("UsrClientRelatEval", true);
				this.set("UsrHold", true);
				this.set("UsrRegAppealAbsent", true);
				this.set("UsrBaSkillUnskillfullAcquaintance", true);
				this.set("UsrBaSkillFarewellNotStandard", true);
				this.set("UsrPoliteFamiliarity", true);
				this.set("UsrHoldEval", true);
				this.set("UsrRegAppeal", true);
				this.set("UsrScoreSummaries", true);
				this.set("UsrTransitionalPhrase", true);
				this.set("UsrScoreObjectionHandling", true);
				this.set("UsrBaSkillFixPrevAppeal", true);
				this.set("UsrLangNoClientLang", true);
				this.set("UsrPoliteNotEnougfPW", true);
				this.set("UsrLangNoUsePCLang", true);
				
				this.set("UsrBaSkillBulkyFarewell", true);

			},
			//Change tabs position 
			TabsDelete: function() {
	          var tabs = this.get("TabsCollection");
                tabs.removeByKey("Tabdc6cfd4cTabLabel");
                tabs.removeByKey("Tab7e221f91TabLabel");
                tabs.removeByKey("Tab1b37a851TabLabel");
                tabs.removeByKey("Tab7c541ae2TabLabel");
                tabs.removeByKey("Tab35708b24TabLabel");
                tabs.removeByKey("Tab38b0a31cTabLabel");
                tabs.removeByKey("Tab7635c817TabLabel");
                tabs.removeByKey("Tab7c9fce08TabLabel");
                tabs.removeByKey("Tab21d2db8cTabLabel");
                tabs.removeByKey("Tabf29d4bc0TabLabel");
                tabs.removeByKey("NotesAndFilesTab");
                tabs.removeByKey("ESNTab");
	      },
	      TabsAdd: function() {
	          var tabs = this.get("TabsCollection");
				tabs.insert(1, "Tabdc6cfd4cTabLabel", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameCall,
	                      Name: "Tabdc6cfd4cTabLabel"
	              	}));
				tabs.insert(1, "ESNTab", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameFeed,
	                      Name: "ESNTab"
	            	}));
	         	tabs.insert(1, "NotesAndFilesTab", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameAN,
	                      Name: "NotesAndFilesTab"
	              	}));
	            tabs.insert(1, "Tabf29d4bc0TabLabel", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameBonus,
	                      Name: "Tabf29d4bc0TabLabel"
	              	}));
	         	tabs.insert(1, "Tab21d2db8cTabLabel", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameBrandPhrase,
	                      Name: "Tab21d2db8cTabLabel"
	              	}));
		     	tabs.insert(1, "Tab7635c817TabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameProceduralPart,
		                      Name: "Tab7635c817TabLabel"
		        	}));
		       	tabs.insert(1, "Tab7c9fce08TabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameCorrectnessTiming,
		                      Name: "Tab7c9fce08TabLabel"
		          	}));
		      	tabs.insert(1, "Tab38b0a31cTabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameDialog,
		                      Name: "Tab38b0a31cTabLabel"
		         	}));
		      	tabs.insert(1, "Tab35708b24TabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameProactivity,
		                      Name: "Tab35708b24TabLabel"
		          	}));
		      	tabs.insert(1, "Tab7c541ae2TabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameTonality,
		                      Name: "Tab7c541ae2TabLabel"
		          	}));
		      	tabs.insert(1, "Tab1b37a851TabLabel", tabs.createItem({
		                      Caption: resources.localizableStrings.TabsNameCommunication,
		                      Name: "Tab1b37a851TabLabel"
		          	}));
		      	tabs.insert(1, "Tab7e221f91TabLabel", tabs.createItem({
	                      Caption: resources.localizableStrings.TabsNameGreetings,
	                      Name: "Tab7e221f91TabLabel"
	      			}));
	      },
	      
	      isDialogueTypeServiceLine: function() {
				var dialogType = this.get("UsrDialogType");
				
				 if(dialogType && dialogType.displayValue == "Линия интернет-магазин")
				 {
				 	return true;
				 }
				 else
				 {
				 	return false;
				 }
			},
			
			callEvalNumber: function() {
				
				Terrasoft.SysSettings.querySysSettingsItem("UsrCurentCallEvalNumber", function(value) {
			            curentCallEvalNumber = value;
			            this.set("curentCallEvalNumber", curentCallEvalNumber);
			    }, this);
			
				return curentCallEvalNumber;
			},
			
			dialogueType: function() {
				
				var dialogType = this.get("UsrDialogType");
				
				var date = new Date();

				var datestring = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
				
				 if(dialogType)
				 {
				 	this.set("UsrName", dialogType.displayValue + ", №: " + curentCallEvalNumber + ", " + datestring);
				 }
				 else
				 {
				 	return "";
				 }
			},
	      
			//First expression FIRST
			setUsrBaSkillEval0: function()
			{
				var dialogType = this.get("UsrDialogType").displayValue;
				
				if(dialogType == "Сервисная линия")
				{
					this.set("UsrBaSkillEvalItemDescription", "'Доброго ранку/ дня/вечора, *ім'я клієнта*, *мене звати*'.\nПриветствие должно быть на украинском языке, независимо от языка клиента указанного в ПК");
					this.set("UsrGettingKnowClientItemDescription", "Если имя есть в карточке - использовать;\nИмени нет - спросить у клиента внести в карточку.\nВ НАЧАЛЕ КОНСУЛЬТАЦИИ КЛИЕНТОВ\nВ случае расхождений данных в ПК, например, зафиксировано мужское имя, а обратилась \nженщина - уточнить имя.\nВ НАЧАЛЕ КОНСУЛЬТАЦИИ КЛИЕНТА");
					this.set("UsrReferringCustomerNameItemDescription", "В диалоге минимум дважды должно прозвучать обращение по имени( в начале + в середине/в конце диалога).");
					this.set("UsrPartingItemDescription", "В прощании прозвучали:\n- Запрос на дополнительные вопросы\n- Благодарность за обращение");
				}
				else
				{
					this.set("UsrBaSkillEvalItemDescription", "'Доброго ранку/ дня/вечора, *ім'я клієнта*, *мене звати*'.\nПриветствие должно быть на украинском языке, независимо от языка клиента указанного в ПК");
					this.set("UsrGettingKnowClientItemDescription", "Если имя есть в карточке - использовать;\nИмени нет - спросить у клиента внести в карточку.\nВ НАЧАЛЕ КОНСУЛЬТАЦИИ КЛИЕНТОВ\nВ случае расхождений данных в ПК, например, зафиксировано мужское имя, а обратилась \nженщина - уточнить имя.\nВ НАЧАЛЕ КОНСУЛЬТАЦИИ КЛИЕНТА");
					this.set("UsrReferringCustomerNameItemDescription", "В диалоге минимум дважды должно прозвучать обращение по имени( в начале + в середине/в конце диалога).");
					this.set("UsrPartingItemDescription", "В прощании должно прозвучать:\n- Запрос на дополнительные вопросы(резюмирование при входящих звонках)\n- Благодарность за уделённое время при исходящих звонках");
				}
				
				var bSG= this.get("UsrBaSkillGretings");
				var bSGV= this.get("UsrBaSkillGoodwillVoice");
				var bSCV= this.get("UsrBaSkillClarityVoice");
				var bSCA= this.get("UsrBaSkillClientAcquaintance");
				
				if(bSG)
				{
					this.set("UsrBaSkillEval", 0);
				}
				else{
					this.set("UsrBaSkillEval", 3);
				}
				if(bSGV)
				{
					this.set("UsrLangEval", 0);
				}
				else{
					this.set("UsrLangEval", 2);
				}
				if(bSCV)
				{
					this.set("UsrPoliteEval", 0);
				}
				else{
					this.set("UsrPoliteEval", 3);
				}
				if(bSCA)
				{
					this.set("UsrSpeechRateEval", 0);
				}
				else
				{
					this.set("UsrSpeechRateEval", 3);
				}
				
				this.setSUMUsrBaSkillTotalEval();
			},
			
			//SUM First expression
			setSUMUsrBaSkillTotalEval: function()
			{
				var baSkillEval = this.get("UsrBaSkillEval");
				var langEvalEval = this.get("UsrLangEval");
				var politeEval = this.get("UsrPoliteEval");
				var speechRateEval = this.get("UsrSpeechRateEval"); 
				
				var sumOfAllField = baSkillEval + langEvalEval + politeEval + speechRateEval;

				this.set("UsrBaSkillTotalEval", sumOfAllField);
				
				this.setMainSum();
			},
			
			//SECOND expression
			setUsrLiteracyEval0: function()
			{
				this.set("UsrSwitchingOneLanguageClientItemDescription", "Если в течение консультации клиент разговаривает на суржике - оператор общается на украинском языке.\nЕсли для клиента не имеет значения язык общения - оператор общается на украинском. Если в течение консультации клиент несколько раз меняет язык общения - оператор может уточнить у клиента на каком языке клиенту удобно общаться.\nКогда клиент выбирает русский или украинский - оператор консультирует соответственно на языке, который выбрал клиент.");
				this.set("UsrLiteracyCultureSpeechItemDescription", "Во время консультации оператор корректно ставит ударения в словах и\nотсутствуют заимствования из другого языка (при консультации на русском -\nнет украинских слов и наоборот)");
				this.set("UsrBusinessSpeechItemDescription", "Отсутствие хезитации (ээээ, аааа, мммм), слов-паразитов (ну, смотрите и т.д.)\nВ разговоре отсутствовало предвзятое отношение к клиенту, поучительный тон(фразы).");
				
				var lLTU = this.get("UsrLiteracyLangTroubleUa");
				var rAQ = this.get("UsrRefAbsentQuestion");
				var cSEM = this.get("UsrConvStyleExpertMonolog");
				
				if(lLTU)
				{
					this.set("UsrLiteracyEval", 0);
				}
				else 
				{
					this.set("UsrLiteracyEval", 3);
				}
				if(rAQ)
				{
					this.set("UsrRefEval", 0);
				}
				else 
				{
					this.set("UsrRefEval", 3);
				}
				if(cSEM)
				{
					this.set("UsrConvStyleEval", 0);
				}
				else 
				{
					this.set("UsrConvStyleEval", 5);
				}
				
				this.setSumInUsrComManageTotalEval();
			},
			
			//SUM SECOND expression
			setSumInUsrComManageTotalEval: function()
			{
				var literacyEval = this.get("UsrLiteracyEval");
				var refEval = this.get("UsrRefEval");
				var convStyleEval = this.get("UsrConvStyleEval");
				
				var sumOfAllField = literacyEval + refEval + convStyleEval;
				
				this.set("UsrComStyleTotalEval", sumOfAllField);
				this.setMainSum();
			},
			
			//THIRD expression
			setUsrAnswCharactEval0: function()
			{
				this.set("UsrIntonationItemDescription", "Разговор должен быть динамичным с доброжелательным тоном и улыбкой в голосе.");
				this.set("UsrPolitenessItemDescription", "Использовать слова 'Дякую/Спасибо', 'Будьте ласкаві/ Будьте добры', 'Будь ласка/Пожалуйста' (не менее 3х раз в разговоре).");
				this.set("UsrInterruptionItemDescription", "Оператор не перебивает клиента.");
				this.set("UsrClearDictionVoiceConfidenceItemDescription", "Чёткая дикция без глотания последних звуков, средний тембр звучания голоса.\nИспользуются паузы во время диалога после окончания каждой мысли.\nОператор предоставляет информацию уверенно, чётко без заминок.");
				
				var dialogType = this.get("UsrDialogType").displayValue;
				
				var aCU = this.get("UsrAnswCharactUncertain");
				var nSPA = this.get("UsrNaturalComPassphraseAbsent");
				var cNRA = this.get("UsrCorrectnessNoRigthAnsw");
				var rVnI = this.get("UsrRequiredVolUnnecesaryInfo");
				
				if(dialogType == "Сервисная линия")
				{
					if(aCU)
					{
						this.set("UsrAnswCharactEval", 0);
					}
					else
					{
						this.set("UsrAnswCharactEval", 7);
					}
					if(nSPA)
					{
						this.set("UsrNaturalComEval", 0);
					}
					else 
					{
						this.set("UsrNaturalComEval", 3);
					}
					if(cNRA)
					{
						this.set("UsrCorrectnessEval", 0);
					}
					else 
					{
						this.set("UsrCorrectnessEval", 4);
					}
					if(rVnI)
					{
						this.set("UsrRequiredVolEval", 0);
					}
					else 
					{
						this.set("UsrRequiredVolEval", 2);
					}
				}
				else
				{
					if(aCU)
					{
						this.set("UsrAnswCharactEval", 0);
					}
					else
					{
						this.set("UsrAnswCharactEval", 5);
					}
					if(nSPA)
					{
						this.set("UsrNaturalComEval", 0);
					}
					else 
					{
						this.set("UsrNaturalComEval", 3);
					}
					if(cNRA)
					{
						this.set("UsrCorrectnessEval", 0);
					}
					else 
					{
						this.set("UsrCorrectnessEval", 4);
					}
					if(rVnI)
					{
						this.set("UsrRequiredVolEval", 0);
					}
					else 
					{
						this.set("UsrRequiredVolEval", 2);
					}
				}
				
				this.setSUMUsrComManageTotalEval();
			},
			
			//SUM method THIRD
			setSUMUsrComManageTotalEval: function()
			{
				var answCharactEval = this.get("UsrAnswCharactEval");
				var naturalComEval = this.get("UsrNaturalComEval");
				var correctnessEval = this.get("UsrCorrectnessEval");
				var requiredVolEval = this.get("UsrRequiredVolEval");
				
				var sumOfAll = answCharactEval + naturalComEval + correctnessEval + requiredVolEval;
				
				this.set("UsrComManageTotalEval", sumOfAll);
				
				this.setMainSum();
			},
			//FOURTH expression 
			setUsrClearExplanEval0: function()
			{
				this.set("UsrProactivityItemDescription", "Оператор инициирует помощь клиенту и предоставление полной информации в решении его вопроса.\nЕсли клиент обратился с жалобой - оператор предложил зафиксировать обращение и уточнил, желает клиент получить обратную связь.");
				this.set("UsrConversationControlItemDescription", "Разговор в режиме диалога, оператор держит инициативу\nв своих руках.\nЕсли монолог клиента затянулся - оператор своевременно возвращает разговор в конструктивное русло.");
				this.set("UsrCompletenessInformationItemDescription", "Оператор решил вопрос клиента во время разговора. Информация по запросу была исчерпывающей, доступной для понимания.");
				
				var cECLB = this.get("UsrClearExplanConvLinkAbsent");
				var pSEQ = this.get("UsrProblemSolvIgnorQuestions");
				var cRA = this.get("UsrClientRelatAtten");
				
				var dialogType = this.get("UsrDialogType").displayValue;
				
				if(dialogType == "Сервисная линия")
				{
					if(cECLB)
					{
						this.set("UsrClearExplanEval", 0);
					}
					else 
					{
						this.set("UsrClearExplanEval", 7);
					}
					if(cRA)
					{
						this.set("UsrClientRelatEval", 0);
					}
					else 
					{
						this.set("UsrClientRelatEval", 7);
					}
					if(pSEQ)
					{
						this.set("UsrProblemSolvEval", 0);
					}
					else 
					{
						this.set("UsrProblemSolvEval", 4);
					}
				}
				else
				{
					if(cECLB)
					{
						this.set("UsrClearExplanEval", 0);
					}
					else
					{
						this.set("UsrClearExplanEval", 5);
					}
					if(cRA)
					{
						this.set("UsrClientRelatEval", 0);
					}
					else 
					{
						this.set("UsrClientRelatEval", 4);
					}
					if(pSEQ)
					{
						this.set("UsrProblemSolvEval", 0);
					}
					else 
					{
						this.set("UsrProblemSolvEval", 4);
					}
				}
				
				this.setSUMUsrExpertiseTotalEval();
			},
			
			//SUM FOURTH
			setSUMUsrExpertiseTotalEval: function()
			{
				var clearExplanEval = this.get("UsrClearExplanEval");
				var problemSolvEval = this.get("UsrProblemSolvEval");
				var clientRelatEval = this.get("UsrClientRelatEval");
				
				var sumOfAllFieald = clearExplanEval + problemSolvEval + clientRelatEval;
			
				this.set("UsrExpertiseTotalEval", sumOfAllFieald);
				
				this.setMainSum();
			},
			
			//FIFTH expression
			setUsrHoldEval0: function()
			{
				this.set("UsrActiveListeningItemDescription", "Оператор комментировал свои действия во время разговора для устранения\nпауз. Клиент всегда ощущал присутствие оператора и вовлеченность в разговор.\nИспользовалось, например хорошо, понятно, да, я сейчас открываю информацию\nВ диалоге допускается пауза длительностью до 10 секунд.");
				this.set("UsrAttentivenessItemDescription", "Оператор внимательно слушает клиента, фиксирует ключевую информацию (это\nпоможет минимизировать количество дополнительных вопросов к клиенту)");
				this.set("UsrSummarizingItemDescription", "Резюмирование вопроса клиента, так и резюмирование консультации оператора.\nРезюмирование клиента: если клиент сумбурно или неоднозначно формулирует вопрос ему нужно помочь наводящим вопросом. Например: «…Правильно ли я Вас понял ...?», «... Вас интересует ...?», «... Вы имеете в виду ...?» «... Вы хотели ...?». После подтверждения клиента - переходите к дальнейшим шагам.\nРезюмирование ответа оператора: если после консультации клиенту необходимо выполнить ряд действий - оператор, завершая консультацию должен резюмировать последовательность действий клиента.");
				this.set("UsrTransitionalPhraseItemDescription", "В диалоге оператор использовал переходную фразу перед началом консультации");
				this.set("UsrWorkingWithObjectionsItemDescription", "Оператор, предоставляет ответы на все вопросы клиента. Оператор должен предоставить исчерпывающее объяснение и при необходимости принести извинения в случае возникновения негативных отзывов или замечаний. Если у оператора нет инструментов или необходимой информации для проработки возражения, а клиент настаивает на получении ответа необходимо зафиксировать обращение с реакцией.");
				
				var hold = this.get("UsrHold");
				var rA = this.get("UsrRegAppealAbsent");
				var bSUA= this.get("UsrBaSkillUnskillfullAcquaintance");
				var bSFNS= this.get("UsrBaSkillFarewellNotStandard");
				var pF = this.get("UsrPoliteFamiliarity");
				
				var dialogType = this.get("UsrDialogType").displayValue;
				
				if(dialogType == "Сервисная линия")
				{
					if(hold)
					{
						this.set("UsrHoldEval", 0);
					}	
					else
					{
						this.set("UsrHoldEval", 4);
					}
					if(rA)
					{
						this.set("UsrRegAppeal", 0);
					}	
					else
					{
						this.set("UsrRegAppeal", 3);
					}
					if(bSUA)
					{
						this.set("UsrScoreSummaries", 0);
					}	
					else
					{
						this.set("UsrScoreSummaries", 3);
					}
					if(bSFNS)
					{
						this.set("UsrTransitionalPhrase", 0);
					}	
					else
					{
						this.set("UsrTransitionalPhrase", 3);
					}
					
					this.set("UsrScoreObjectionHandling", 0);
				}
				else
				{
					if(hold)
					{
						this.set("UsrHoldEval", 0);
					}	
					else
					{
						this.set("UsrHoldEval", 4);
					}
					if(rA)
					{
						this.set("UsrRegAppeal", 0);
					}	
					else
					{
						this.set("UsrRegAppeal", 3);
					}
					if(bSUA)
					{
						this.set("UsrScoreSummaries", 0);
					}	
					else
					{
						this.set("UsrScoreSummaries", 3);
					}
					if(bSFNS)
					{
						this.set("UsrTransitionalPhrase", 0);
					}	
					else
					{
						this.set("UsrTransitionalPhrase", 3);
					}
					if(pF)
					{
						this.set("UsrScoreObjectionHandling", 0);
					}
					else 
					{
						this.set("UsrScoreObjectionHandling", 7);
					}
				}
				
				this.setSUMUUsrClientRelatTotalEval();
			},
			
			//SUM FIFTH
			setSUMUUsrClientRelatTotalEval: function()
			{
				var holdEval = this.get("UsrHoldEval");
				var regAppeal = this.get("UsrRegAppeal");
				var scoreSummaries = this.get("UsrScoreSummaries");
				var transitionalPhrase = this.get("UsrTransitionalPhrase");
				var scoreObjectionHandling = this.get("UsrScoreObjectionHandling");
				
				var sumOfAllFieald = holdEval + regAppeal + scoreSummaries + transitionalPhrase + scoreObjectionHandling;
			
				this.set("UsrClientRelatTotalEval", sumOfAllFieald);
				
				this.setMainSum();
			},
			
			//SIXTH expression
			setUsrAssessmentCorrectnessDeadline: function()
			{
				var baSkillBulkyFarewell = this.get("UsrBaSkillBulkyFarewell");
				
				var dialogType = this.get("UsrDialogType").displayValue;
				
				if(dialogType == "Сервисная линия")
				{
					this.set("UsrCorrectnessDeadlineItemDescription", "Выполнены все обещания, которые оператор озвучил клиенту во время разговора (отправить смс-сообщение, зафиксировать жалобу с реакцией). Если ПО временно не работает - зафиксирована вся необходимая информация и выполнено обещание после возобновления работы ПО. В обращениях, которые требуют время на рассмотрение / обработку / доставку и т.д. - клиента необходимо проинформировать о сроке ожидания.");
					
					if(baSkillBulkyFarewell)
					{
						this.set("UsrAssessmentCorrectnessDeadline", 0);
					}	
					else
					{
						this.set("UsrAssessmentCorrectnessDeadline", 8);
					}
				}
				else
				{
					this.set("UsrCorrectnessDeadlineItemDescription", "Выполнены все обещания, которые оператор озвучил клиенту во время разговора (отправить смс-сообщение, зафиксировать жалобу с реакцией). Если ПО временно не работает - зафиксирована вся необходимая информация и выполнено обещание после возобновления работы ПО. В обращениях, которые требуют время на рассмотрение / обработку / доставку и т.д. - клиента необходимо проинформировать о сроке ожидания.");
					
					if(baSkillBulkyFarewell)
					{
						this.set("UsrAssessmentCorrectnessDeadline", 0);
					}	
					else
					{
						this.set("UsrAssessmentCorrectnessDeadline", 5);
					}
				}
				
				this.setSUMUsrFinalScoreCorrectnessTiming();
			},
			
			//SUM SIXTH
			setSUMUsrFinalScoreCorrectnessTiming: function()
			{
				var assessmentCorrectnessDeadline = this.get("UsrAssessmentCorrectnessDeadline");
			
				this.set("UsrFinalScoreCorrectnessTiming", assessmentCorrectnessDeadline);
				
				this.setMainSum();
			},
			
			//SEVEN expression
			setUsrRatingTelephony: function()
			{
				this.set("UsrDescriptionItemTelephonyItemDescription", "В случаях, когда клиента плохо слышно или невозможно разобрать суть его обращения - завершить разговор предварительно сообщив клиенту, что его плохо слышно и ему сейчас перезвонят. Также, если телефонный разговор прервался - сразу перезвонить клиенту.");
				this.set("UsrProperUseHOLDPAUSEItemDescription", "Выполнено HOLD.\nПри открытии информации требующий дополнительного уточнения. Клиента предупредили о необходимости ожидания, спросив удобно ли остаться на линии. Возвращаясь к клиенту - оператор поблагодарил клиента за ожидание и обратился к клиенту по имени. HOLD может быть до 90 секунд. Если за 90 сек. оператор не смог уточнить всю необходимую информацию (например, из-за зависание ПК) - через 90 сек. вернуться к клиенту и сообщить, что информация все еще загружается и требуеться дополнительное время. Если клиенту удобно - возвращаем в hold. Если не удобно - завершить разговор и перезвонить клиенту после уточнения. Если hold более 90 секунд - вернуться к клиенту, принести извинения за ожидание и сообщить, что вы перезвоните после уточнения всей информации.\nMUTE: при необходимости отключения микрофона не более 5 сек.");
				this.set("UsrComplianceInstructionsProcessingOrdersItemDescription", "Оператор придерживается правил и инструкций по обработке заказов ИМ");
					
				var bSFPA= this.get("UsrBaSkillFixPrevAppeal");
				var lNCL= this.get("UsrLangNoClientLang");
				var pNPW = this.get("UsrPoliteNotEnougfPW");
				
				var dialogType = this.get("UsrDialogType").displayValue;
				
				if(dialogType == "Сервисная линия")
				{
					if(bSFPA)
					{
						this.set("UsrRatingTelephony", 0);
					}	
					else
					{
						this.set("UsrRatingTelephony", 5);
					}
					if(lNCL)
					{
						this.set("UsrScoreCorrectUseHOLDPAUSE", 0);
					}	
					else
					{
						this.set("UsrScoreCorrectUseHOLDPAUSE", 10);
					}
					
					this.set("UsrScoreFollowingInstructionsProcessingOrders", 0);
				}
				else
				{
					if(bSFPA)
					{
						this.set("UsrRatingTelephony", 0);
					}	
					else
					{
						this.set("UsrRatingTelephony", 3);
					}
					if(lNCL)
					{
						this.set("UsrScoreCorrectUseHOLDPAUSE", 0);
					}	
					else
					{
						this.set("UsrScoreCorrectUseHOLDPAUSE", 5);
					}
					if(pNPW)
					{
						this.set("UsrScoreFollowingInstructionsProcessingOrders", 0);
					}	
					else
					{
						this.set("UsrScoreFollowingInstructionsProcessingOrders", 10);
					}
				}
				
				this.setSUMUsrProcPartTotalEval();
			},
			
			//SUM SEVEN
			setSUMUsrProcPartTotalEval: function()
			{
				var ratingTelephony = this.get("UsrRatingTelephony");
				var scoreCorrectUseHOLDPAUSE = this.get("UsrScoreCorrectUseHOLDPAUSE");
				var scoreFollowingInstructionsProcessingOrders = this.get("UsrScoreFollowingInstructionsProcessingOrders");
				
				var sumOfAllFieald = ratingTelephony + scoreCorrectUseHOLDPAUSE + scoreFollowingInstructionsProcessingOrders;
			
				this.set("UsrProcPartTotalEval", sumOfAllFieald);
				
				this.setMainSum();
			},
			
			//EIGHT expression
			setUsrRatingSpecialOfferBrandPhrasePeriod: function()
			{
				this.set("UsrSpecialOfferBrandPhrasePeriodItemDescription", "Обязательно озвучить брендовую фразу периода.\n* Сотрудникам магазина разрешено не озвучивать.\nПри отсутствии брендовой фразы необходимо пожелать клиенту крепкого здоровья.");
				
				var lNUPCL= this.get("UsrLangNoUsePCLang");
				
				if(lNUPCL)
				{
					this.set("UsrRatingSpecialOfferBrandPhrasePeriod", 0);
				}	
				else
				{
					this.set("UsrRatingSpecialOfferBrandPhrasePeriod", 8);
				}
				
				this.setSUMUsrFinalScoreBrandPhrase();
			},
			
			//SUM EIGHT
			setSUMUsrFinalScoreBrandPhrase: function()
			{
				var ratingSpecialOfferBrandPhrasePeriod = this.get("UsrRatingSpecialOfferBrandPhrasePeriod");
			
				this.set("UsrFinalScoreBrandPhrase", ratingSpecialOfferBrandPhrasePeriod);
				
				this.setMainSum();
			},
			
			//NINE expression
			setUsrBonusScore: function()
			{
				this.set("UsrBonusPartMaintenanceServiceItemDescription", "«WOW-эффект»-обслуживание превзошло базовые ожидания клиента. Оператор с помощью нестандартных и креативных действий, не просто решил вопрос клиента, а и установил с ним эмоциональную связь. Например, клиент обращался  с намерением оставить жалобу, но в конце диалога изменил свою точку зрения и остался доволен обслуживанием.");
				
				this.setSUMUsrFinalScoreBonus();
			},
			
			//SUM NINE
			setSUMUsrFinalScoreBonus: function()
			{
				var lD= this.get("UsrDisRespect");
				var bonusScore = this.get("UsrBonusScore");
				
				if(lD)
				{
					this.set("UsrFinalScoreBonus", bonusScore);
				}
				else
				{
					this.set("UsrBonusScore", 0);
					this.set("UsrFinalScoreBonus", 0);
				}
				
				this.setMainSum();
			},
			
			//M A I N SUM OF CALL 
			setMainSum: function()
			{
				var I = this.get("UsrBaSkillTotalEval");
				var T = this.get("UsrComStyleTotalEval");
				var EL = this.get("UsrComManageTotalEval");
				var B = this.get("UsrExpertiseTotalEval");
				var E = this.get("UsrClientRelatTotalEval");
				var finalScoreCorrectnessTiming = this.get("UsrFinalScoreCorrectnessTiming");
				var W = this.get("UsrProcPartTotalEval");
				var finalScoreBrandPhrase = this.get("UsrFinalScoreBrandPhrase");
				var finalScoreBonus = this.get("UsrFinalScoreBonus");
				
				var sumOfAll = I + T + EL + B + E + finalScoreCorrectnessTiming + W + finalScoreBrandPhrase + finalScoreBonus;
				
				this.set("UsrCallEval", sumOfAll);
			}
		},
		// rules: {
	 //       ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
	 //       property: BusinessRuleModule.enums.Property.VISIBLE,
	 //       conditions: [
  //              {
  //                  leftExpression: {
  //                      type: BusinessRuleModule.enums.ValueType.ATTRIBUTE,
  //                      attribute: "UsrDialogType"
  //                  },
  //                  comparisonType: this.Terrasoft.ComparisonType.EQUAL,
  //                  rightExpression: {
  //                      type: BusinessRuleModule.enums.ValueType.CONSTANT,
  //                      value: '3ea26279-7336-40f5-9dc4-80d282858ba9'
  //                  }
  //              }
	 //       ]
		// },
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"UsrBaSkillComment1": {
				"9efefe46-7cae-47ef-8efb-a7a5d047bb5b": {
					"uId": "9efefe46-7cae-47ef-8efb-a7a5d047bb5b",
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
								"attribute": "UsrBaSkillGretings"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment2": {
				"93db4485-61ab-4695-ae2e-04fd2da3fdce": {
					"uId": "93db4485-61ab-4695-ae2e-04fd2da3fdce",
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
								"attribute": "UsrBaSkillGoodwillVoice"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment3": {
				"f2fce0da-3179-43c3-8fdc-04709edd1ac0": {
					"uId": "f2fce0da-3179-43c3-8fdc-04709edd1ac0",
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
								"attribute": "UsrBaSkillClarityVoice"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment4": {
				"2c6092cc-7f1d-46a2-97e1-2af8e6b7be39": {
					"uId": "2c6092cc-7f1d-46a2-97e1-2af8e6b7be39",
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
								"attribute": "UsrBaSkillClientAcquaintance"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment5": {
				"fe176cf2-a239-4b06-ae43-7ee301b74381": {
					"uId": "fe176cf2-a239-4b06-ae43-7ee301b74381",
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
								"attribute": "UsrBaSkillUnskillfullAcquaintance"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment6": {
				"3b406f54-4c4c-406d-a142-d2aa3b1a7e6e": {
					"uId": "3b406f54-4c4c-406d-a142-d2aa3b1a7e6e",
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
								"attribute": "UsrBaSkillFarewellNotStandard"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment7": {
				"5b203187-7228-4612-a512-bfa824e64c64": {
					"uId": "5b203187-7228-4612-a512-bfa824e64c64",
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
								"attribute": "UsrBaSkillBulkyFarewell"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBaSkillComment8": {
				"dc07290d-be11-4f5d-8c3b-5618ff2c2a3c": {
					"uId": "dc07290d-be11-4f5d-8c3b-5618ff2c2a3c",
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
								"attribute": "UsrBaSkillFixPrevAppeal"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLangComment1": {
				"e583daa0-d8b5-4659-80b5-2d5d1bf7cceb": {
					"uId": "e583daa0-d8b5-4659-80b5-2d5d1bf7cceb",
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
								"attribute": "UsrLangNoClientLang"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLangComment2": {
				"6bf16602-60e7-467a-b7ca-c287528f7b2d": {
					"uId": "6bf16602-60e7-467a-b7ca-c287528f7b2d",
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
								"attribute": "UsrLangNoUsePCLang"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLangComment3": {
				"54489d7f-f2b0-49d1-a4c1-36eaa6e7e576": {
					"uId": "54489d7f-f2b0-49d1-a4c1-36eaa6e7e576",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				},
				"b2171146-2630-4d18-8b51-e02ff15ab0ec": {
					"uId": "b2171146-2630-4d18-8b51-e02ff15ab0ec",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 2,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrBonusScore"
							}
						}
					]
				},
				"7e16a219-cc50-4573-af98-847333e4ca86": {
					"uId": "7e16a219-cc50-4573-af98-847333e4ca86",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrPoliteComment1": {
				"28868f22-ecb9-4fc2-bc1f-9a57d4ad6b55": {
					"uId": "28868f22-ecb9-4fc2-bc1f-9a57d4ad6b55",
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
								"attribute": "UsrPoliteFamiliarity"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				},
				"a1c428ea-6fd0-4b4b-b653-939c472f398f": {
					"uId": "a1c428ea-6fd0-4b4b-b653-939c472f398f",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrPoliteComment2": {
				"a9f4ff9c-7f1d-4441-af87-10911c51b57c": {
					"uId": "a9f4ff9c-7f1d-4441-af87-10911c51b57c",
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
								"attribute": "UsrPoliteNotEnougfPW"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				},
				"edc3cd98-daee-45f0-935c-c6b8e73d7664": {
					"uId": "edc3cd98-daee-45f0-935c-c6b8e73d7664",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrPoliteComment3": {
				"017d6097-98f4-48d3-b74e-cf4d611fe8ce": {
					"uId": "017d6097-98f4-48d3-b74e-cf4d611fe8ce",
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
								"attribute": "UsrPoliteNotPolSound"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrPoliteComment4": {
				"18e339e8-b328-4d62-9a1e-01edfb91bd23": {
					"uId": "18e339e8-b328-4d62-9a1e-01edfb91bd23",
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
								"attribute": "UsrInterruptClient"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrPoliteComment5": {
				"8b2627df-8add-4090-b12b-b7df1e020b4b": {
					"uId": "8b2627df-8add-4090-b12b-b7df1e020b4b",
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
								"attribute": "UsrUseTeachingPhrase"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrPoliteComment6": {
				"e2b427cb-7127-4493-9201-b4faf9a44940": {
					"uId": "e2b427cb-7127-4493-9201-b4faf9a44940",
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
								"attribute": "UsrPoliteUseSarcasm"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrPoliteComment7": {
				"fbbcedca-1e1e-4b20-bb07-627fc0b316ef": {
					"uId": "fbbcedca-1e1e-4b20-bb07-627fc0b316ef",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrSpeechRateComment1": {
				"7e424887-d145-416f-92d9-41c1019652dd": {
					"uId": "7e424887-d145-416f-92d9-41c1019652dd",
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
								"attribute": "UsrSpeechRateToFast"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrSpeechRateComment2": {
				"cb2ff847-a09b-4657-8006-fff317d26889": {
					"uId": "cb2ff847-a09b-4657-8006-fff317d26889",
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
								"attribute": "UsrSpeechRateToSlow"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrSpeechRateComment3": {
				"e93c5548-46d1-44b7-bfb8-ec22635c12ff": {
					"uId": "e93c5548-46d1-44b7-bfb8-ec22635c12ff",
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
								"attribute": "UsrSpeechRateSharpRate"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrSpeechRateComment4": {
				"765cb2ef-debf-4b00-9251-cb16cf8a8b40": {
					"uId": "765cb2ef-debf-4b00-9251-cb16cf8a8b40",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment1": {
				"5c0d5617-aa9c-49e4-a23c-a8cb3f7ff200": {
					"uId": "5c0d5617-aa9c-49e4-a23c-a8cb3f7ff200",
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
								"attribute": "UsrLiteracyLangTroubleUa"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment2": {
				"2082bb3e-e73d-4d22-80c6-20cfa7702382": {
					"uId": "2082bb3e-e73d-4d22-80c6-20cfa7702382",
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
								"attribute": "UsrLiteracyLangTroubleRu"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment3": {
				"249789fb-bbb1-4895-8946-24b3fb3e919e": {
					"uId": "249789fb-bbb1-4895-8946-24b3fb3e919e",
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
								"attribute": "UsrLiteracyNoGramar"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment4": {
				"4143e355-58ed-4974-9c51-37bcc768f7ad": {
					"uId": "4143e355-58ed-4974-9c51-37bcc768f7ad",
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
								"attribute": "UsrLiteracyParasiteWords"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment5": {
				"0432d51c-666b-4432-8200-1abb6a30b697": {
					"uId": "0432d51c-666b-4432-8200-1abb6a30b697",
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
								"attribute": "UsrLiteracyBadPronunciation"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment6": {
				"eed2bd5d-5aa4-4c14-b02f-276042d88861": {
					"uId": "eed2bd5d-5aa4-4c14-b02f-276042d88861",
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
								"attribute": "UsrLiteracySpeachDefect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrLiteracyComment7": {
				"9e2c268d-4d44-48c3-be58-2a2fcd5d96d6": {
					"uId": "9e2c268d-4d44-48c3-be58-2a2fcd5d96d6",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment1": {
				"4d581035-c38f-4a7f-95ad-16d0e260bb09": {
					"uId": "4d581035-c38f-4a7f-95ad-16d0e260bb09",
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
								"attribute": "UsrRefAbsentQuestion"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment2": {
				"4074d549-03ad-4d84-8ef7-7792a31cc978": {
					"uId": "4074d549-03ad-4d84-8ef7-7792a31cc978",
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
								"attribute": "UsrRefAbsentComplains"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment3": {
				"17694cbe-da88-4cc0-85ea-185e9e3c708f": {
					"uId": "17694cbe-da88-4cc0-85ea-185e9e3c708f",
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
								"attribute": "UsrRefAbsentNumber"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment4": {
				"3f9f1b07-435f-47cb-88a2-ca0e098e08e0": {
					"uId": "3f9f1b07-435f-47cb-88a2-ca0e098e08e0",
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
								"attribute": "UsrRefIgnorComment"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment5": {
				"bb356343-826b-40ef-8229-62eb4a42d3a6": {
					"uId": "bb356343-826b-40ef-8229-62eb4a42d3a6",
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
								"attribute": "UsrRefUserInfConfirm"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment6": {
				"c6eb0d0f-7ba1-4104-98c8-c42571220458": {
					"uId": "c6eb0d0f-7ba1-4104-98c8-c42571220458",
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
								"attribute": "UsrRefIgnorPrevReques"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment7": {
				"7aefd96f-beab-4c7b-8739-51f78361c5c0": {
					"uId": "7aefd96f-beab-4c7b-8739-51f78361c5c0",
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
								"attribute": "UsrRefUnnesesaryNumbRef"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment8": {
				"b72dee65-f313-41b1-b944-91c884b0fba6": {
					"uId": "b72dee65-f313-41b1-b944-91c884b0fba6",
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
								"attribute": "UsrRefExcessQuestion"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment9": {
				"84ca161f-ce74-41e4-81f1-ab5a323f9315": {
					"uId": "84ca161f-ce74-41e4-81f1-ab5a323f9315",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment1": {
				"b75116ef-f448-498b-a07a-60cf2d1350e1": {
					"uId": "b75116ef-f448-498b-a07a-60cf2d1350e1",
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
								"attribute": "UsrConvStyleExpertMonolog"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment2": {
				"d05b36de-6492-4189-8918-4c9ba1e2a168": {
					"uId": "d05b36de-6492-4189-8918-4c9ba1e2a168",
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
								"attribute": "UsrConvStyleClientMonolog"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment3": {
				"3502b25e-26ac-4304-a0cf-701ce3d334a0": {
					"uId": "3502b25e-26ac-4304-a0cf-701ce3d334a0",
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
								"attribute": "UsrConvStylePasiveExpert"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment4": {
				"c4750fae-510e-4af5-b5d3-ee2451de69e8": {
					"uId": "c4750fae-510e-4af5-b5d3-ee2451de69e8",
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
								"attribute": "UsrConvStyleChaoticAnswer"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment5": {
				"82d32fe3-1a36-4906-b0f6-3e2ccd81eb00": {
					"uId": "82d32fe3-1a36-4906-b0f6-3e2ccd81eb00",
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
								"attribute": "UsrConvStylePasiveListening"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment6": {
				"038e0a94-5301-40d8-8d66-efbfa8d2e57d": {
					"uId": "038e0a94-5301-40d8-8d66-efbfa8d2e57d",
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
								"attribute": "UsrConvStyleNoSummary"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrConvStyleComment7": {
				"c02c325d-c35f-4b7c-bb01-14ff05fde1b7": {
					"uId": "c02c325d-c35f-4b7c-bb01-14ff05fde1b7",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment1": {
				"483397e8-e202-4137-ac53-a0ab62b962c4": {
					"uId": "483397e8-e202-4137-ac53-a0ab62b962c4",
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
								"attribute": "UsrAnswCharactUncertain"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment2": {
				"5690e1a3-3990-4d46-a137-fff6d572fe8c": {
					"uId": "5690e1a3-3990-4d46-a137-fff6d572fe8c",
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
								"attribute": "UsrAnswCharactFirstAnswWrong"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment3": {
				"f82b2162-b4a6-4050-961d-2d338c30e062": {
					"uId": "f82b2162-b4a6-4050-961d-2d338c30e062",
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
								"attribute": "UsrAnswCharactMakePauses"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment4": {
				"eeb4a1f5-eb13-4909-b690-a335b0494ead": {
					"uId": "eeb4a1f5-eb13-4909-b690-a335b0494ead",
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
								"attribute": "UsrAnswCharactLongPauseExpert"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment5": {
				"4f5802f3-69d8-4361-b23b-5e369bd6eb18": {
					"uId": "4f5802f3-69d8-4361-b23b-5e369bd6eb18",
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
								"attribute": "UsrAnswCharactLongPauseSystem"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment6": {
				"6252ce9e-a16b-485e-b06e-07d374cff320": {
					"uId": "6252ce9e-a16b-485e-b06e-07d374cff320",
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
								"attribute": "UsrAnswCharactLackSkillfulCom"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment7": {
				"b4fd32dc-e06d-4ebc-932e-2e4ee3650ce0": {
					"uId": "b4fd32dc-e06d-4ebc-932e-2e4ee3650ce0",
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
								"attribute": "UsrAnswCharactDoMistake"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrAnswCharactComment8": {
				"dc9ad7d6-6024-4d96-96a2-19c7a6223ad9": {
					"uId": "dc9ad7d6-6024-4d96-96a2-19c7a6223ad9",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComPassphraseAbsent": {
				"4b8f8909-3944-41a8-b425-0bd83fd4b884": {
					"uId": "4b8f8909-3944-41a8-b425-0bd83fd4b884",
					"enabled": true,
					"removed": true,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrNaturalComPassphraseAbsent"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComComment1": {
				"49829ff2-09b6-49a6-9ef8-01d8c6312cf6": {
					"uId": "49829ff2-09b6-49a6-9ef8-01d8c6312cf6",
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
								"attribute": "UsrNaturalComPassphraseAbsent"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComComment2": {
				"984b9890-fe7a-44f5-b6d0-5d943ea59782": {
					"uId": "984b9890-fe7a-44f5-b6d0-5d943ea59782",
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
								"attribute": "UsrNaturalComInapPassphase"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComComment3": {
				"d847e995-9f93-4211-a7c0-10149485d8e2": {
					"uId": "d847e995-9f93-4211-a7c0-10149485d8e2",
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
								"attribute": "UsrNaturalComConvStageLinkAbsent"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComComment4": {
				"a688be49-dd26-4fd8-bc3f-663113724670": {
					"uId": "a688be49-dd26-4fd8-bc3f-663113724670",
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
								"attribute": "UsrNaturalComInapConvLink"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrNaturalComComment5": {
				"2ee31a49-e0b4-4ce0-aa8c-f91ab300d9e8": {
					"uId": "2ee31a49-e0b4-4ce0-aa8c-f91ab300d9e8",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrCorrectnessComment1": {
				"9661d6b1-86e0-4a1e-ac75-00141131c403": {
					"uId": "9661d6b1-86e0-4a1e-ac75-00141131c403",
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
								"attribute": "UsrCorrectnessNoRigthAnsw"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrCorrectnessComment2": {
				"9c939db0-903d-463e-885c-074d82891a91": {
					"uId": "9c939db0-903d-463e-885c-074d82891a91",
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
								"attribute": "UsrCorrectnessRulesViolated"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrCorrectnessComment3": {
				"20d4efb3-9a2d-4f31-b8ee-7e0b82166e72": {
					"uId": "20d4efb3-9a2d-4f31-b8ee-7e0b82166e72",
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
								"attribute": "UsrCorrectnessDontFollowInstruction"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrCorrectnessComment4": {
				"8b682451-2279-473d-8fdb-23a02c303685": {
					"uId": "8b682451-2279-473d-8fdb-23a02c303685",
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
								"attribute": "UsrCorrectnessNotUseCheckedInfo"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrCorrectnessComment5": {
				"fc78543e-fe05-4b3f-abae-1e4843604233": {
					"uId": "fc78543e-fe05-4b3f-abae-1e4843604233",
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
								"attribute": "UsrCorrectnessNoncriticalInnacuracy"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment1": {
				"14e168f4-3d43-4b17-8fe8-7af0dd002854": {
					"uId": "14e168f4-3d43-4b17-8fe8-7af0dd002854",
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
								"attribute": "UsrRequiredVolNoRigthAnsw"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment2": {
				"73e101bd-0daf-4e18-9c31-17797817e84d": {
					"uId": "73e101bd-0daf-4e18-9c31-17797817e84d",
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
								"attribute": "UsrRequiredVolUnnecesaryInfo"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment3": {
				"9432170e-d6fb-4f3a-91d5-148ccf44c5dd": {
					"uId": "9432170e-d6fb-4f3a-91d5-148ccf44c5dd",
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
								"attribute": "UsrRequiredVolNotEnoughtInfo"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment4": {
				"3ecf9f80-b6fa-451c-bb2c-965393664e1b": {
					"uId": "3ecf9f80-b6fa-451c-bb2c-965393664e1b",
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
								"attribute": "UsrRequiredVolNotFullAnsw"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment5": {
				"18fcfe81-fbe2-435d-9920-bad6e5218244": {
					"uId": "18fcfe81-fbe2-435d-9920-bad6e5218244",
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
								"attribute": "UsrRequiredVolNotSetDeadlines"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRequiredVolComment6": {
				"0a0f22c4-d1d5-48d8-81e1-11fe6a708bec": {
					"uId": "0a0f22c4-d1d5-48d8-81e1-11fe6a708bec",
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
								"attribute": "UsrRequiredVolNoncriticalUnnecInfo"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment1": {
				"0733aa7a-f3fb-43f0-98d4-e0b31d836236": {
					"uId": "0733aa7a-f3fb-43f0-98d4-e0b31d836236",
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
								"attribute": "UsrClearExplanNoRigthAnsw"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment2": {
				"905cd218-7c32-4d17-8ea8-489dbd5fca2a": {
					"uId": "905cd218-7c32-4d17-8ea8-489dbd5fca2a",
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
								"attribute": "UsrClearExplanConvLinkAbsent"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment3": {
				"7895c948-9183-428d-818b-2b7a95f07894": {
					"uId": "7895c948-9183-428d-818b-2b7a95f07894",
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
								"attribute": "UsrClearExplanStretchesAnsw"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment4": {
				"9981fc11-722c-46dc-86a2-09b668d42d94": {
					"uId": "9981fc11-722c-46dc-86a2-09b668d42d94",
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
								"attribute": "UsrClearExplanExcesiveTerminology"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment5": {
				"d6027cc0-e19f-4b06-af30-1da9a7901cce": {
					"uId": "d6027cc0-e19f-4b06-af30-1da9a7901cce",
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
								"attribute": "UsrClearExplanClientDoesntUnderstand"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClearExplanComment6": {
				"fd0e23eb-7058-44ec-bcec-ece6e0b5a9ba": {
					"uId": "fd0e23eb-7058-44ec-bcec-ece6e0b5a9ba",
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
								"attribute": "UsrClearExplanInapRepeatInfo"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrProblemSolvComment1": {
				"27ed8c32-f057-4975-af08-cbb7f74647f7": {
					"uId": "27ed8c32-f057-4975-af08-cbb7f74647f7",
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
								"attribute": "UsrProblemSolvIgnorQuestions"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrProblemSolvComment2": {
				"ca6cae33-fd1e-4903-b077-1d5a36afc1bd": {
					"uId": "ca6cae33-fd1e-4903-b077-1d5a36afc1bd",
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
								"attribute": "UsrProblemSolvInapArguments"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrProblemSolvComment3": {
				"ef3f7e0c-7542-4dac-9efe-26c1350f345b": {
					"uId": "ef3f7e0c-7542-4dac-9efe-26c1350f345b",
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
								"attribute": "UsrProblemSolvnNotOfferAlternative"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrProblemSolvComment4": {
				"764f58cb-9563-4451-a6ce-130f197a0f63": {
					"uId": "764f58cb-9563-4451-a6ce-130f197a0f63",
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
								"attribute": "UsrProblemSolvInapSolvVariant"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClientRelatComment1": {
				"9ffd43de-4344-45ab-930d-6369d77c6f47": {
					"uId": "9ffd43de-4344-45ab-930d-6369d77c6f47",
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
								"attribute": "UsrClientRelatAtten"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClientRelatComment2": {
				"fa32af40-a98d-4c4c-9ee4-c967b12e12ee": {
					"uId": "fa32af40-a98d-4c4c-9ee4-c967b12e12ee",
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
								"attribute": "UsrClientRelatPositInVoice"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClientRelatComment3": {
				"f67038fa-42cf-4a8d-808c-cbcc5e5f86ca": {
					"uId": "f67038fa-42cf-4a8d-808c-cbcc5e5f86ca",
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
								"attribute": "UsrClientRelatNeutr"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClientRelatComment4": {
				"c29f23c5-e254-4212-8d43-f7c757de1fe5": {
					"uId": "c29f23c5-e254-4212-8d43-f7c757de1fe5",
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
								"attribute": "UsrClientRelatMonotone"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrClientRelatComment5": {
				"84cca741-df20-4648-bfc5-205a37f1e87a": {
					"uId": "84cca741-df20-4648-bfc5-205a37f1e87a",
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
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrHoldComment": {
				"1a58eaa9-7d0b-413a-affe-6ad3f20e3ac4": {
					"uId": "1a58eaa9-7d0b-413a-affe-6ad3f20e3ac4",
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
								"attribute": "UsrHold"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRegAppealComment1": {
				"893eb4d5-c8a5-4883-ab27-ac1d99daf000": {
					"uId": "893eb4d5-c8a5-4883-ab27-ac1d99daf000",
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
								"attribute": "UsrRegAppealAbsent"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRegAppealComment2": {
				"529c730f-94d9-4bce-9b38-2fa382de6ec5": {
					"uId": "529c730f-94d9-4bce-9b38-2fa382de6ec5",
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
								"attribute": "UsrRegAppealIncorrectClient"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRegAppealComment3": {
				"487fa1e3-de08-4014-92f2-889e51064065": {
					"uId": "487fa1e3-de08-4014-92f2-889e51064065",
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
								"attribute": "UsrRegAppealIncorrect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrRefComment10": {
				"c6c7bd15-2a9d-4c95-a803-13069c9b8330": {
					"uId": "c6c7bd15-2a9d-4c95-a803-13069c9b8330",
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
								"attribute": "UsrInattentivelyListen"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrBonusScore": {
				"954f332a-8fc0-4d16-ba72-43c243faa60b": {
					"uId": "954f332a-8fc0-4d16-ba72-43c243faa60b",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "UsrDisRespect"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			},
			"UsrScoreObjectionHandling": {
				"30195a1a-cd1e-48d4-ba24-4d2b7035c1d9": {
					"uId": "30195a1a-cd1e-48d4-ba24-4d2b7035c1d9",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrWorkingWithObjectionsItemDescription": {
				"7e90e213-27c1-4b43-8583-c535b201d241": {
					"uId": "7e90e213-27c1-4b43-8583-c535b201d241",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrPoliteFamiliarity": {
				"e1254387-fb9e-48e0-89e1-9f04bddb2a75": {
					"uId": "e1254387-fb9e-48e0-89e1-9f04bddb2a75",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrScoreFollowingInstructionsProcessingOrders": {
				"ee523c29-53d6-43f7-8152-65fe9f6be541": {
					"uId": "ee523c29-53d6-43f7-8152-65fe9f6be541",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrComplianceInstructionsProcessingOrdersItemDescription": {
				"5f803c00-cc1e-455e-9099-fd94a238e8a0": {
					"uId": "5f803c00-cc1e-455e-9099-fd94a238e8a0",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			},
			"UsrPoliteNotEnougfPW": {
				"030b74fd-fa81-41c3-8cee-169b6b150703": {
					"uId": "030b74fd-fa81-41c3-8cee-169b6b150703",
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
								"attribute": "UsrDialogType"
							},
							"rightExpression": {
								"type": 0,
								"value": "3ea26279-7336-40f5-9dc4-80d282858ba9",
								"dataValueType": 10
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/
	};
});
