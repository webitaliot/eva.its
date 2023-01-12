define("CallPageV2", ["ProcessModuleUtilities", "CallRecordUtilities", "AudioPlayer",
        "CallSectionGridRowViewModel"],
    function(ProcessModuleUtilities) {
        return {
            entitySchemaName: "Call",
           /* mixins: {
                CallRecordUtilities: "Terrasoft.CallRecordUtilities"
            },
            attributes: {
                "CanDownloadAudioFile": {
                    "dataValueType": Terrasoft.DataValueType.BOOLEAN,
                    "value": false
                }
            },
            messages: {
                "GetCallRecords": {
                    mode: Terrasoft.MessageMode.PTP,
                    direction: Terrasoft.MessageDirectionType.PUBLISH
                }
            },*/
            details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
            modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		diff: /**SCHEMA_DIFF*/[
	{
		"operation": "merge",
		"name": "CallerId",
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
		"name": "CalledId",
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
		"name": "Direction",
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
		"name": "CreatedBy",
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
		"operation": "insert",
		"name": "UsrEvalInCalled728ad8-225b-403e-8cbc-403e702074cb",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 2,
				"layoutName": "Header"
			},
			"bindTo": "UsrEvalInCall",
			"enabled": false
		},
		"parentName": "Header",
		"propertyName": "items",
		"index": 4
	},
	{
		"operation": "merge",
		"name": "StartDate",
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
		"name": "EndDate",
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
		"name": "UsrCallEvalInCalld0b1e870-45e6-4146-bbf6-e18ed53215a4",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 0,
				"row": 1,
				"layoutName": "CallPageGeneralBlock"
			},
			"bindTo": "UsrCallEvalInCall",
			"enabled": false,
			"contentType": 5
		},
		"parentName": "CallPageGeneralBlock",
		"propertyName": "items",
		"index": 2
	},
	{
		"operation": "merge",
		"name": "Duration",
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
		"name": "BeforeConnectionTime",
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
		"name": "TalkTime",
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
		"name": "HoldTime",
		"values": {
			"layout": {
				"colSpan": 12,
				"rowSpan": 1,
				"column": 12,
				"row": 1
			}
		}
	}
]/**SCHEMA_DIFF*/,
            methods: {
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
								"Tag": "startBPCallEvalFromCall",
								"Enabled": true
							}));
						return actionMenuItems;
					},
					startBPCallEvalFromCall: function() {
                var id = this.get("Id");
                // Объект, который будет передан в качестве аргумента в метод executeProcess.
                var args = {
                    // Имя процесса, который необходимо запустить.
                    sysProcessName: "UsrCallEvalFromCall",
                    // Объект со значением входящего параметра ContactParameter для процесса CustomProcess.
                    parameters: {
                        CallEvalId: id
                    }
                };
                // Запуск пользовательского бизнес-процесса.
                ProcessModuleUtilities.executeProcess(args);
            },
                /*init: function() {
                    this.callParent(arguments);
                    this.mixins.CallRecordUtilities.init.call(this);
                },


                initContextHelp: function() {
                    this.set("ContextHelpId", 1024);
                    this.callParent(arguments);
                },


               /* getGridRowViewModelConfig: function() {
                    var gridRowViewModelConfig = this.callParent(arguments);
                    this.Ext.apply(gridRowViewModelConfig, {
                        Ext: this.Ext,
                        Terrasoft: this.Terrasoft,
                        sandbox: this.sandbox
                    });
                    return gridRowViewModelConfig;
                },


                getGridRowViewModelClassName: function() {
                    return "Terrasoft.CallSectionGridRowViewModel";
                },


                initQueryColumns: function(entitySchemaQuery) {
                    this.callParent(arguments);
                    if (!entitySchemaQuery.columns.contains("IntegrationId")) {
                        entitySchemaQuery.addColumn("IntegrationId");
                    }
                },


                getIsDownloadAudioFileMenuItemEnabled: function() {
                    return this.isSingleSelected() && !this.get("MultiSelect") && this.get("CanDownloadAudioFile");
                },


                /*onCardVisibleChanged: function() {
                    this.callParent(arguments);
                    this.stopPlaying();
                },*/


               /* onGridDataLoaded: function() {
                    this.callParent(arguments);
                    this.set("CanDownloadAudioFile", false);
                    this.prepareRowCallRecord(null, false, function(canGetCallRecords, callRecords) {
                        this.set("CanDownloadAudioFile",
                            canGetCallRecords && Ext.isArray(callRecords) && (callRecords.length > 0));
                    }.bind(this));
                },*/


                /*rowSelected: function(primaryColumnValue) {
                    this.callParent([primaryColumnValue]);
                    this.stopPlaying();
                    this.set("CanDownloadAudioFile", false);
                    this.prepareRowCallRecord(primaryColumnValue, false, function(canGetCallRecords, callRecords) {
                        this.set("CanDownloadAudioFile",
                            canGetCallRecords && Ext.isArray(callRecords) && (callRecords.length > 0));
                    }.bind(this));
                },*/


               /* changeDataView: function() {
                    this.callParent(arguments);
                    this.stopPlaying();
                },


                onGridUnSelectRow: function(id) {
                    this.stopPlaying(id);
                },*/


                /*onSaveToFileMenuItemClick: function() {
                    this.requestAndDownloadCallRecord();
                }*/
            }
        };
    }
);
