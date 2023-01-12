define("CallDetail", ["ProcessModuleUtilities", "RightUtilities", "CallRecordUtilities", "AudioPlayer",
"GridUtilitiesV2", "UsrCallSectionGridRowViewModelNew", 
"css!UsrCallSectionGridRowViewModelNew"], 
function(ProcessModuleUtilities, RightUtilities, GridUtilities, UsrCallSectionGridRowViewModelNew) {
    return {
        entitySchemaName: "Call",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        attributes:{
        	"CanCallEval":{
        		dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
        	}	
        },
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "remove",
                "name": "ToolsButton"
            },
			{
				"operation": "merge",
				"name": "DataGrid",
				"values": {
					"unSelectRow": {"bindTo": "onGridUnSelectRow"},
					"selectRow": {"bindTo": "onRowSelected"},
					"rowDataItemMarkerColumnName": "CallerId",
					"activeRowAction": {"bindTo": "onActiveRowAction"},
					"className": "Terrasoft.AudioGrid"
				}
			},
            {
                "operation": "insert",
                "name": "DataGridActiveRowSomeButton",
                "parentName": "DataGrid",
                "propertyName": "activeRowActions",
                "values": {
                    "className": "Terrasoft.Button",
                    "style": Terrasoft.controls.ButtonEnums.style.GREEN,
                    "caption": "Оценить звонок",
                    "visible": {"bindTo": "CanEvalCall"},
                    "tag": "startCallEval",
                }
            }
        ]/**SCHEMA_DIFF*/,
        methods: {
        	init: function(){
        		this.callParent(arguments);
        	},
        	
        	initData: function() {
				this.callParent(arguments);
			},
        	
        	/*getGridRowViewModelClassName: function() {
				return "Terrasoft.UsrCallSectionGridRowViewModelNew";
			},*/
			getGridRowViewModelClassName: function() {
				return "Terrasoft.UsrCallSectionGridRowViewModelNew";
			},
			
			getAddRecordButtonVisible: function() {
			   return false;
			},
			getAddTypedRecordButtonVisible: function() {
			   return false;
			},
			startBPCallEvalFromCall: function() {
                var id = this.get("ActiveRow");
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
			onActiveRowAction: function (buttonTag, primaryColumnValue) {
                    switch (buttonTag) {
                        case "startCallEval":
                            this.startBPCallEvalFromCall();
                            break;
                        default:
                            this.callParent(buttonTag, primaryColumnValue);
                    }
			},
            addRecordOperationsMenuItems: Terrasoft.emptyFn
        }
    };
});