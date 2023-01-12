define("UsrSMSActivity", ["terrasoft", "ConfigurationEnums", "ProcessModuleUtilities", "ConfigurationConstants"],
		function(Terrasoft, enums, ProcessModuleUtilities, ConfigurationConstants) {
			return {
				
				entitySchemaName: "Activity",

				messages: {
					
					"ProcessExecDataChanged": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.PUBLISH
					}
				},
				attributes: {
				},
				methods: {
					openCard: function(operation, typeColumnValue, recordId) {
							var config = this.getOpenCardConfig(operation, typeColumnValue, recordId);
							var index = config.defaultValues.indexOf({name: "ActivityCategory", value: "F51C4643-58E6-DF11-971B-001D60E938C6"});
							config.defaultValues.splice(index, 1);//displayValue:"Сообщение",
							config.defaultValues.push({name:"ActivityCategory", value: "62BF294D-A3AA-40FC-8AB3-02E2FB0A4E73"});
							if (operation === enums.CardStateV2.ADD && this.hasAddMiniPage(typeColumnValue)) {
								this.openAddMiniPage({
									entitySchemaName: this.entitySchemaName,
									valuePairs: config.defaultValues,
									moduleId: this.getMiniPageSandboxId(typeColumnValue)
								});
							} else {
								this.sandbox.publish("OpenCard", config, [this.sandbox.id]);
							}
						},
				},

				diff: /**SCHEMA_DIFF*/[
				
				]/**SCHEMA_DIFF*/
			};
		}
);
