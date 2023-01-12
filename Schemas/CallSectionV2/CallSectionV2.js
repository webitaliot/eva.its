define("CallSectionV2", ["ProcessModuleUtilities", "CallRecordUtilities", "CallSectionV2Resources", "AudioPlayer",
	"CallSectionGridRowViewModel", "css!CallSectionGridRowViewModel"],
	function(ProcessModuleUtilities) {
		return {
			entitySchemaName: "Call",
			mixins: {},
			attributes: {},
			messages: {},
			methods: {
				getActions: function() {
						var actionMenuItems = this.callParent(arguments);
						
						actionMenuItems.addItem(this.getButtonMenuItem({
							Type: "Terrasoft.MenuSeparator",
							Caption: "",
						}));
						actionMenuItems.addItem(this.getButtonMenuItem({
							Caption: {
									"bindTo": "Resources.Strings.StartCallEval"
								},
								"Enabled": true
							}));
						return actionMenuItems;
					},
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	}
);
