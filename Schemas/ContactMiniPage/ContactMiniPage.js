define("ContactMiniPage", ["ContactMiniPageResources", "MiniPageResourceUtilities", "EmailHelper", "TimezoneGenerator",
		"TimezoneMixin", "css!ContactMiniPageCSS"],
	function(resources, miniPageResources, EmailHelper) {
		return {
			entitySchemaName: "Contact",
			details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
			attributes: {},
			mixins: {},
			methods: {
				setValidationConfig: function() {
					this.callParent(arguments);
					this.addColumnValidator("MobilePhone", this.phoneValidator);
				},
				
				phoneValidator: function(value) {
					var invalidMessage = "";
					var regx = /^38[0-9]{10}.*$/;
					var isValid = true;
					var mobileMumber = value || this.get("MobilePhone");
					isValid = (Ext.isEmpty(mobileMumber) ||
					regx.test(mobileMumber));
					if (!isValid) {
						invalidMessage = "Номер телефона указан неверно";
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				}
			},
			diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
		};
	});
