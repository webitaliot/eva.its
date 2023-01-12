define("CaseSection", ["ProcessModuleUtilities"], function(processModuleUtilities) {
	return {
		entitySchemaName: "Case",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "CombinedModeAddRecordButton"
			},
			{
                "operation": "insert",
                "name": "MyButton",
                "parentName": "DataGrid",
                "propertyName": "activeRowActions",
                "values": {
                    "className": "Terrasoft.Button",
                    "style": Terrasoft.controls.ButtonEnums.style.GREEN,
                    "caption": 'Обработка обращения',
                    "tag": 'startProcessCaseInWorkFromOperator'
                }
            },
		]/**SCHEMA_DIFF*/,
		methods: {
			getSectionActions: function() {
                var actionMenuItems = this.callParent(arguments);
                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": "Сгенерировать отчет",
                    "Click": {"bindTo": "generateReport"},
                }));
                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": "Отправка обращений на ServiceDesk",
                    "Click": {bindTo: "startProcessSendToSD"},
                    "Enabled": {bindTo: "isSendToSDActionEnabled"},
                    "IsEnabledForSelectedAll": true
                }));
                return actionMenuItems;
			},
			generateReport: function() {
				if(Terrasoft && Terrasoft.MiniPageListener) {
                    Terrasoft.MiniPageListener.open({
                        parameters: {
                            entitySchemaName: "UsrCaseReportOptions",
                            primaryColumnValue: undefined
                        },
                        miniPageSchemaName: "UsrCaseReportOptionsMiniPage",
                        floatTo: undefined,
                        operation: "add",
                        valuePairs: [],
                        isFixed: undefined,
                        showDelay: false,
                        moduleId: undefined
                    });
                }
			},
			isSendToSDActionEnabled: function() {
                var selectedRows = this.get("SelectedRows");
                return selectedRows ? (selectedRows.length > 0) : false;
            },
            onActiveRowAction: function(buttonTag, caseId) {
                this.callParent(arguments);
                switch (buttonTag) {
                    case 'startProcessCaseInWorkFromOperator':
                        this.startProcessCaseInWorkFromOperator(caseId);
                        break;
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
            startProcessCaseInWorkFromOperator: function (caseId) {
                processModuleUtilities.executeProcess({
                    sysProcessName: "UsrSetCaseInWorkFromOperatorSingleWindowProcess2",
                    parameters: {CaseId: caseId}
                });
            },
            startProcessSendToSD: function(){
            	var selectedRows = this.get("SelectedRows");
            	selectedRows.forEach(function(selectedRowId) {
	            	processModuleUtilities.executeProcess({
	                    sysProcessName: "UsrSendCaseOnServiceDeskITS1",
	                    parameters: {caseId: selectedRowId}
	                });
            	});
            }
		}
	};
});
