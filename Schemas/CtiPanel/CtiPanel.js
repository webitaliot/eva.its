define("CtiPanel", ["terrasoft", "ProcessModuleUtilities", "CtiProviderInitializer", "CtiBaseHelper", "CtiPanelResources", "CtiConstants",
        "CtiPanelModelUtilities", "CtiPanelUtils", "CtiPanelIdentificationUtilities", "CtiContainerListGenerator",
        "CtiContainerList", "SearchEdit", "CtiPanelCommunicationHistoryUtilities", "css!UsrCtiPanelCSS"],
    function(Terrasoft, ProcessModuleUtilities, CtiProviderInitializer, CtiBaseHelper, resources, ctiConstants, CtiPanelModelUtilities,CtiPanelUtils, CtiPanelIdentificationUtilities ) {
        return {
            diff: [
        		{
					"operation": "insert",
					"name": "AgentStatusContainer",
					"parentName": "ctiPanelMainContainer",
					"index": 0,
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "AgentCaptionVisible"},
						"items": [
							{
								"id":"AgentStatusCaption",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["label-caption"]},
								"caption": "Статус: ",
							},
							{
								"id":"AgentStatusValue",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["label-caption"]},
								"caption": {"bindTo": "AgentCaption"},
							},
						]
					}
				},
				
            	{
		            "operation": "insert",
		            "index": 3,
		            "name": "BlindTransferButton",
		            "parentName": "ButtonsPanel",
		            "propertyName": "items",
		            "values": {
		              "id": "BlindTransferButton",
		              "itemType": Terrasoft.ViewItemType.BUTTON,
		              "click": { "bindTo": "completeBlindTransferCall" },
		              "visible": { "bindTo": "getCanCompleteBlindTransfer" },
		              "imageConfig": { "bindTo": "Resources.Images.BlindTransferButtonIcon" },
		              "classes": {
		                "wrapperClass": ["call-blind-transfer-button",
		                  "t-btn-style-call-button-middle"]
		              },
		              "selectors": { "wrapEl": "#BlindTransferButton" },
		              "style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
		              "hint": { "bindTo": "Resources.Strings.BlindTransferTip" },
		              "markerValue": "BlindTransferButton",
		              "tag": "BlindTransferButton"
		            }
		          },
            	{
					"operation": "insert",
					"name": "IVRlang",
					"parentName": "IdentificationPanelRight",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"id":"IVRlang1",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["label-caption"]},
								"caption": "Язык",
								"visible": {"bindTo": "langVisible"}
							},
							{
								"id":"IVRlang2",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["subscriber-info"]},
								"markerValue": {"bindTo": "IVRlang"},
								"caption": {"bindTo": "IVRlang"},
								"visible": {"bindTo": "langVisible"}
							}
						]
					}
				},
				{
                    "operation": "insert",
                    "name": "Reliability",
                    "parentName": "IdentificationPanelRight",
                    "propertyName": "items",
                    "values": {
                    		"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [
							{
								"id":"Reliability1",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["label-caption"]},
								"caption": { "bindTo": "Resources.Strings.Reliability" },
								"visible": {"bindTo": "isContactReliabilityVisible"}
							},
							{
								"id":"Reliability",
								"itemType": Terrasoft.ViewItemType.LABEL,
								"classes": {"labelClass": ["subscriber-info"]},
								"markerValue": {"bindTo": "ContactReliability"},
								"caption": {"bindTo": "ContactReliability"},
								"visible": {"bindTo": "isContactReliabilityVisible"}
							}
						]
                    }
                },
               /* {
                    "operation": "insert",
                    "name": "IVRlang",
                    "parentName": "IdentificationPanelRight",
                    "propertyName": "items",
                    "values": {
                        "bindTo": "IVRlang",
                        "caption": '',
                        "contentType": this.Terrasoft.ContentType.SHORT_TEXT,
                        "enabled": false,
                        "layout": {"column": 0, "row": 1, "colSpan": 12},
                        "visible": {"bindTo": "langVisible"}
                    }
                },*/
                {
                    "operation": "insert",
                    "name": "MainMenuAction",
                    "parentName": "IdentificationPanelRight",
                    "propertyName": "items",
                    "values": {
                        "visible": { "bindTo": "mainMenuActionVisible" },
                        "bindTo": "MainMenuAction",
                        "styles": {
							"font-size": "9px"
						},
                        "caption": " ",
                        "contentType": this.Terrasoft.ContentType.LONG_TEXT,
                        "enabled": false,
                        "layout": {"column": 0, "row": 0, "colSpan": 12}
                    }
                },

                {
                    "operation": "merge",
                    "name": "ButtonsPanelWrapper",
                    "parentName": "ctiPanelMainContainer",
                    "index": 5,
                    "propertyName": "items",
                    "values": {
                        "markerValue": "ButtonsPanelWrapper",
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "visible": {"bindTo": "getIsCallExists"},
                    }
                },

                {
                    "operation": "insert",
                    "name": "TalkScriptPanelWrapper",
                    "parentName": "ctiPanelMainContainer",
                    "index": 4,
                    "propertyName": "items",
                    "values": {
                        "markerValue": "ButtonsPanelWrapper",
                        "itemType": Terrasoft.ViewItemType.CONTAINER,
                        "visible": {"bindTo": "getCanDrop"},
                        "items": []
                    }
                },

                {
                    "operation": "insert",
                    "name": "TalkScriptText",
                    "parentName": "TalkScriptPanelWrapper",
                    "propertyName": "items",
                    "values": {
                        "bindTo": "TalkScriptText",
                        "caption": '',
                        "styles": {
							"font-size": "9px"
						},
                        "contentType": this.Terrasoft.ContentType.LONG_TEXT,
                        "enabled": false,
                        "layout": {"column": 0, "row": 0, "colSpan": 24},
                    }
                },
                

                
                //////////////////////
                {
					"operation": "insert",
					"name": "TransferCommentContainer",
					"parentName": "ctiPanelMainContainer",
					"index": 4,
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "getIsCallExists"},
						"items": []
					}
				},
				
				{
					"operation": "insert",
					"name": "TransferComment",
					"parentName": "TransferCommentContainer",
					"propertyName": "items",
					"values": {
						"bindTo": "TransferComment",
						"caption": { "bindTo": "Resources.Strings.TransferCommentCaption" },
						"styles": {
							"font-size": "9px"
						},
						"visible": {"bindTo": "isTransferCommentVisible"},
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"enabled": false,
						"layout": {"column": 0, "row": 0, "colSpan": 24},
					},
					"index": 4,
				},
				
				{
					"operation": "insert",
					"name": "CommentContainer",
					"parentName": "ctiPanelMainContainer",
					"index": 7,
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {"bindTo": "IsTransferPrepared"},
						"styles": {
							"margin-right": "5px;",
    						"margin-bottom": "10px;"
						},
						"items": []
					}
				},
				
				{
					"operation": "insert",
					"parentName": "CommentContainer",
					"propertyName": "items",
					"name": "DCommentFroSend",
					"values": {
						"contentType": this.Terrasoft.ContentType.LONG_TEXT,
						"bindTo": "CommentFroSend",
						"controlConfig": {
							"maxlength": 500,
							"placeholder": { "bindTo": "Resources.Strings.PlaceholderComment" },
							"classes": ["placeholderOpacity"]
						},
						"labelConfig": {
							"visible": false
						}
					},
					"index": 0
				}

            ],
            attributes: {
            	"AgentCaption": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},
            	"AgentCaptionVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
                "IVRlang": {
                    "dataValueType": Terrasoft.DataValueType.TEXT,
                    "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
                "MainMenuAction":{
                    "dataValueType": Terrasoft.DataValueType.TEXT,
                    "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
                "TalkScriptText":{
                    "dataValueType": Terrasoft.DataValueType.TEXT,
                    "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
                "TalkScriptName":{
                    "dataValueType": Terrasoft.DataValueType.TEXT,
                    "type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
				"LastCallId":{
					dataValueType: Terrasoft.DataValueType.TEXT,
				},
				"TransferComment":{
					dataValueType: Terrasoft.DataValueType.TEXT,
				},
				"CommentFroSend":{
					dataValueType: Terrasoft.DataValueType.TEXT,
				},
				"isTransferCommentVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},
				"ContactReliability": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				},
				"isContactReliabilityVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				}
            },
            methods: {
            		init: function() {
					this.callParent(arguments);
					this.on("change:AgentState", this.setAgentCaption, this);
					this.on("change:AgentStateReason", this.setAgentCaption, this);
				},
            	setAgentCaption: function() {
					switch(this.$AgentState){
						case "ONBREAK":
							this.set("AgentCaption", "Перерыв");
							this.$AgentCaptionVisible = true;
							break;
						case "ONHOOK":
							this.set("AgentCaption", "Готов");
							this.$AgentCaptionVisible = true;
							break;
						case "DND":
							this.set("AgentCaption", "Не беспокоить");
							this.$AgentCaptionVisible = true;
							break;
						default: 
							this.$AgentCaptionVisible = false;
							break;
					}
            	},
            	completeBlindTransferCall: function() {
            		var consultCall = this.findConsultCall();
            		if (Ext.isEmpty(consultCall)) {
              			throw new Terrasoft.InvalidOperationException({
                		message: Terrasoft.Resources.Telephony.Exception.ConsultCallNotExistsException
              			});
            		}
            		consultCall.drop();
            //		this.blindTransferCall(consultCall.calledId);
            		
            		let ob = JSON.stringify({ targetAddress: consultCall.calledId, comment: this.get("CommentFroSend") });
            		this.blindTransferCall(ob);
            		this.set("CommentFroSend", "");
          		},
          		getCanCompleteBlindTransfer: function() {
            		var result = this.get("IsConsulting");
            		return result;
          		},
                addProcessAction: function(entity, actions) {
                    var actionId = entity.get("Id");
                    var action = Ext.create("Terrasoft.BaseViewModel", {
                        values: {
                            "Id": actionId,
                            "Name": entity.get("Name"),
                            "ProcessName": entity.get("ProcessSchemaName")
                        },
                        methods: {
                            onProcessActionClick: function() {
                                var processName = this.get("ProcessName");
                                var parameters = this.getActionProcessParameters(processName);
                                if(processName == "UsrRegisterCaseByCall1") parameters.CallId = Terrasoft.CtiModel.changedValues.LastCall.databaseUId;
                                ProcessModuleUtilities.runProcess(processName, parameters);
                            },
                            getActionProcessParameters: this.getActionProcessParameters.bind(this)
                        }
                    });
                    action.sandbox = this.sandbox;
                    actions.add(actionId, action);
                    this.set("IsProcessActionExists", true);
                },
                subscribeEvents: function() {
                    var ctiPanelEvents = [
                        {
                            eventName: "connected",
                            eventHandler: this.onConnected
                        },
                        {
                            eventName: "commutationStarted",
                            eventHandler: this.onCommutationStarted
                        },
                        {
                            eventName: "change:CurrentCallNumber",
                            eventHandler: this.onChangeCurrentCallNumber
                        },
                        {
                            eventName: "change:CurrentCall",
                            eventHandler: this.onChangeCurrentCall
                        },
                        {
                            eventName: "change:CallDuration",
                            eventHandler: this.onChangeCallDuration
                        },
                        {
                            eventName: "change:ConsultCallNumber",
                            eventHandler: this.onChangeConsultCallNumber
                        },
                        {
                            eventName: "change:IsConsulting",
                            eventHandler: this.onChangeIsConsulting
                        },
                        {
                            eventName: "change:AgentState",
                            eventHandler: this.onAgentStateCodeChanged
                        },
                        {
                            eventName: "change:IdentifiedSubscriberKey",
                            eventHandler: this.onIdentifiedSubscriberKeyChanged
                        },
                        {
                            eventName: "change:IdentifiedConsultSubscriberKey",
                            eventHandler: this.onIdentifiedConsultSubscriberKeyChanged
                        },
                        {
                            eventName: "callSaved",
                            eventHandler: this.onCallSavedEvent
                        },
                        {
                            eventName: "dtmfEntered",
                            eventHandler: this.onDtmfEntered
                        },
                        {
                            eventName: "webRtcStarted",
                            eventHandler: this.onWebRtcStarted
                        },
                        {
                            eventName: "webRtcVideoStarted",
                            eventHandler: this.onWebRtcVideoStarted
                        },
                        {
                            eventName: "webRtcDestroyed",
                            eventHandler: this.onWebRtcDestroyed
                        },
                        {
                            eventName: "change:IsVideoHidden",
                            eventHandler: this.onVideoHidden
                        },
                        {
                            eventName: "callStarted",
                            eventHandler: this.onCallStarted
                        },
                        {
                            eventName: "updateData",
                            eventHandler: this.onUpdateData
                        },
                        {
                            eventName: "callFinished",
                            eventHandler: this.onCallEnded
                        },
                    ];
                    Terrasoft.each(ctiPanelEvents, function(item) {
                        this.on(item.eventName, item.eventHandler, this);
                    }, this);
                    this.set("SubscribedEvents", ctiPanelEvents);
                    this.sandbox.subscribe("CallCustomer", this.onCallCustomer.bind(this));
                    this.sandbox.subscribe("GetCallRecords", this.onGetCallRecords.bind(this),
                        [ctiConstants.CallRecordsContextMessageId]);
                    this.activeCalls.on("clear", this.onCtiPanelActiveCallsEmpty, this);
                    this.activeCalls.on("remove", this.onCtiPanelActiveCallRemoved, this);
                },
                onCallStarted: function(call) {
                	this.set("IVRlang", "");
                	this.set("MainMenuAction", "");
                	this.set("langVisible", false);
                	this.set("mainMenuActionVisible", false);
                    if(!call) {
                        return;
                    }
                    this.set("TransferComment", call.transfer_comment);
                    this.set("isTransferCommentVisible", !!call.transfer_comment);

                    var mainMenuAction = call.mainMenuAction;
                    
                    if(typeof call.lang21 == "string") {
                        this.set('IVRlang',call.lang21);
                        this.set('langVisible',true);
                    }
                    if(typeof call.mainMenuAction == "string") {
                        this.set('MainMenuAction',call.mainMenuAction);
                        this.set('mainMenuActionVisible',true);
                    }
                    
                    this.set("ContactReliability", "");
                    if(call.direction == Terrasoft.CallDirection.IN){
                    	this.set("isContactReliabilityVisible", true);
                    	this.setContactReliablility(call.callerId);
                    	this.setContactLanguage(call.callerId);
                    } else {
                    	this.set("isContactReliabilityVisible", false);
                    	this.setContactLanguage(call.calledId);
                    }
                    
                   
                    
                    var contactName = this.get("TalkScriptName");
                    if(contactName!=undefined)
                    {
                    	this.reloadTalkScript(contactName);
                    }
                    else
                    {
                    	this.reloadTalkScriptWithoutContact();
                    }
                },
                setContactLanguage: function(webitelNum){
                	var that = this;
					this.identifySubscriber(webitelNum, "", "", function(queryResultSubscribers, collectionName, subscriberKeyName){
						if (queryResultSubscribers.length > 0) {
							var contactId = queryResultSubscribers[0].SubscriberId;
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "Contact"
							});
							esq.addColumn("Language.Code", "Language");
							esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Id", contactId
							));
							esq.getEntityCollection(function(result) {
								if (!result.success ||  result.collection.getCount() > 0) {
									var language =  result.collection.getItems()[0].values.Language;
									if( that.get('IVRlang') == '') {
				                        that.set('IVRlang',language);
				                        that.set('langVisible',true);
					                }
								}
							}, this);
						} else {
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "WSysAccount"
							});
							esq.addColumn("Contact");
							esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Login", webitelNum
							));
							esq.getEntityCollection(function(result)  {
							if (!result.success ||  result.collection.getCount() > 0) {
								var contactId = result.collection.getItems()[0].values.Contact.value;
								var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
									rootSchemaName: "Contact"
								});
								esq.addColumn("Language.Code", "Language");
								esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Id", contactId
								));
								esq.getEntityCollection(function(result) {
									if (!result.success ||  result.collection.getCount() > 0) {
										var language =  result.collection.getItems()[0].values.Language;
										if( that.get('IVRlang') == '') {
					                        that.set('IVRlang',language);
					                        that.set('langVisible',true);
					                    }
										
									}
								}, this);
							}
							}, this);	
						}
						
					}, this);
                },
                setContactReliablility: function(webitelNum){
                	var that = this;
					this.identifySubscriber(webitelNum, "", "", function(queryResultSubscribers, collectionName, subscriberKeyName){
						if (queryResultSubscribers.length > 0) {
							var contactId = queryResultSubscribers[0].SubscriberId;
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "Contact"
							});
							esq.addColumn("UsrReliability");
							esq.addColumn("Language.Code", "Language");
							esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Id", contactId
							));
							esq.getEntityCollection(function(result) {
								if (!result.success ||  result.collection.getCount() > 0) {
									var responsibleDisplayName = result.collection.getItems()[0].values.UsrReliability.displayValue;
									var language =  result.collection.getItems()[0].values.Language;
									that.set("ContactReliability", responsibleDisplayName);
									if(language == '' &&  this.get('IVRlang') != '') {
				                        this.set('IVRlang',language);
				                        this.set('langVisible',true);
					                }
								}
							}, this);
						} else {
							var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
								rootSchemaName: "WSysAccount"
							});
							esq.addColumn("Contact");
							esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
								Terrasoft.ComparisonType.EQUAL, "Login", webitelNum
							));
							esq.getEntityCollection(function(result)  {
							if (!result.success ||  result.collection.getCount() > 0) {
								var contactId = result.collection.getItems()[0].values.Contact.value;
								var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
									rootSchemaName: "Contact"
								});
								esq.addColumn("UsrReliability");
								esq.addColumn("Language.Code", "Language");
								esq.filters.add("UserFilter", Terrasoft.createColumnFilterWithParameter(
									Terrasoft.ComparisonType.EQUAL, "Id", contactId
								));
								esq.getEntityCollection(function(result) {
									if (!result.success ||  result.collection.getCount() > 0) {
										var responsibleDisplayName = result.collection.getItems()[0].values.UsrReliability.displayValue;
										var language =  result.collection.getItems()[0].values.Language;
										that.set("ContactReliability", responsibleDisplayName);
										if(language == '' &&  this.get('IVRlang') != '') {
					                        this.set('IVRlang',language);
					                        this.set('langVisible',true);
					                    }
										
									}
								}, this);
							}
							}, this);	
						}
						
					}, this);
                },
                onUpdateData: function(lang) {
                    if(!lang) {
                        return;
                    }
                    this.set('langVisible',false);
                    if(typeof lang == "string") {
                        this.set('IVRlang',lang);
                        this.set('langVisible',true);
                    }
                },
                reloadTalkScript: function(name) {
                var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                    rootSchemaName: "UsrTalkScript"
                });
                esq.addColumn("UsrStartTime");
                esq.addColumn("UsrEndTime");
                esq.addColumn("UsrUaText");
                esq.addColumn("UsrRuText");
                esq.getEntityCollection(function(response) {
                    if(response && response.success && response.collection.getCount() > 0) {
                        var collection = response.collection.collection;
                        Terrasoft.each(collection.items, function(item) {
                            var today = new Date();
                            var startFilter = new Date(item.get("UsrStartTime"));
                            var endFilter = new Date(item.get("UsrEndTime"));
                            if(today >= startFilter && today <= endFilter) {
                                var ivrLang = this.get("IVRlang");
                                var scriptText = "";
                                switch(ivrLang) {
                                    case "rus":
                                        scriptText = item.get("UsrRuText");
                                        break;
                                    case "ukr":
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                    default:
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                }
                                scriptText = scriptText.replace("{0}", name);
                                scriptText = scriptText.replace("{1}", Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue);
                                this.set("TalkScriptText", scriptText);
                                this.set("isIdentificated", true);
                            }
                        }, this);
                    }
                    else {
                        this.console.log("can not find talk script in db");
                    }
                }, this);
            },
				reloadTalkScriptWithoutContact: function() {
                var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                    rootSchemaName: "UsrTalkScript"
                });
                esq.addColumn("UsrStartTime");
                esq.addColumn("UsrEndTime");
                esq.addColumn("UsrUaText");
                esq.addColumn("UsrRuText");
                esq.getEntityCollection(function(response) {
                    if(response && response.success && response.collection.getCount() > 0) {
                        var collection = response.collection.collection;
                        Terrasoft.each(collection.items, function(item) {
                            var today = new Date();
                            var startFilter = new Date(item.get("UsrStartTime"));
                            var endFilter = new Date(item.get("UsrEndTime"));
                            if(today >= startFilter && today <= endFilter) {
                                var ivrLang = this.get("IVRlang");
                                var scriptText = "";
                                switch(ivrLang) {
                                    case "rus":
                                        scriptText = item.get("UsrRuText");
                                        break;
                                    case "ukr":
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                    default:
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                }
                                scriptText = scriptText.replace("{1}", Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue);
                                scriptText = scriptText.replace(" {0}!","!");
                                this.set("TalkScriptText", scriptText);
                                this.set("isIdentificated", true);
                            }
                        }, this);
                    }
                    else {
                        this.console.log("can not find talk script in db");
                    }
                }, this);
            },
				onCommutationStarted: function(call){
					this.callParent(arguments);
					//this.createCaseByCall(call);
				},
				getIsNewCall: function(call){
					if(call.id == this.get("LastCallId")){
						return false;
					}
					else{
						this.set("LastCallId", call.id);
						return true;
					}
				},
				
				createCaseByCall: function(call){
					if(call.direction != "1d96a65f-2131-4916-8825-2d142b1000b2"){
						return;
					}
					if(!this.getIsNewCall(call)){
						return;
					}
					//this.set("isCommunicationStarted", true);
			      	var userNumber = call.direction == "1d96a65f-2131-4916-8825-2d142b1000b2" ? call.callerId : call.calledId;
			      	//var strDirection = this.activeCall.direction == Terrasoft.CallDirection.OUT ? "outbound" : "inbound";
			      	
			      	var parameters = this.getActionProcessParameters();
			      	
			      	parameters.PhoneNumber = userNumber;
			      	
					var args = {
						sysProcessName: "UsrRegisterCaseByCallWithProcessingI_Changed",
					};
					args.parameters = parameters;
					ProcessModuleUtilities.executeProcess(args);
      			},
            }
        };
    }
);