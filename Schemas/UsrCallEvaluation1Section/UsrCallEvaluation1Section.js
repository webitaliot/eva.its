define("UsrCallEvaluation1Section", ["ProcessModuleUtilities", "BaseFiltersGenerateModule"],
function(ProcessModuleUtilities, BaseFiltersGenerateModule) {
	return {
		entitySchemaName: "UsrCallEvaluation",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		attributes: {
			"IsCanEvaluateAllCalls": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: false
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "remove",
				"name": "SeparateModeAddRecordButton"
			},
			{
				"operation": "remove",
				"name": "CombinedModeAddRecordButton"
			}
		]/**SCHEMA_DIFF*/,
		methods: {
			init: function(){
				this.GetIsCanEvaluateAllCalls();
				this.callParent(arguments);
			},
			
			onEntityInitialized: function()
			{
				this.callParent(arguments);
			},
			
			GetIsCanEvaluateAllCalls: function(){
				var that = this;
				var serviceData = {
					AUName: "Оценивание звонков",
					UserId: Terrasoft.SysValue.CURRENT_USER.value
				};
				var ServiceHelper = require(['ServiceHelper'], function (serviceHelper) {serviceHelper.callService("UsrUserInRole",
					"CheckUserInAU",
						function (response) {
							that.set("IsCanEvaluateAllCalls",response);
					}, serviceData, this);
				});
			},
			
			getFilters: function() {
				var user = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT;
				var filters = this.callParent(arguments);
				
				if (!this.get("IsCanEvaluateAllCalls"))
				{
					//filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
					filters.add("FilterEmployee", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "UsrEmployee", user.value));
					// filters.add("FilterStatus", this.Terrasoft.createColumnFilterWithParameter(
					// 	this.Terrasoft.ComparisonType.EQUAL, "UsrAppraiser", user.value));
					return filters;
				}
				else
				{
					return filters;
				}
			
			},
			getSectionActions: function() {
					var actionMenuItems = this.callParent(arguments);
					
					actionMenuItems.addItem(this.getButtonMenuItem({
						Type: "Terrasoft.MenuSeparator",
						Caption: ""
						// Click: {bindTo: "callCreateActivityAcquaintanceBP"}
					}));
					actionMenuItems.addItem(this.getButtonMenuItem({
						Caption: {
								"bindTo": "Resources.Strings.formReport"
							},
							"Click": {"bindTo": "startBPUsrGeneralTableWithRatings"},
							"Enabled": true
						}));
					return actionMenuItems;
				},
			startBPUsrGeneralTableWithRatings: function() {
				var id = this.get("Id");
				var args = {
					sysProcessName: "UsrGeneralTableWithRatings",
					parameters: {
						DocumentId: id
					}
				};
				ProcessModuleUtilities.executeProcess(args);
			}
		}
	};
});
