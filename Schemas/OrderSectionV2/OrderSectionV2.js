define("OrderSectionV2", [], function() {
	return {
		entitySchemaName: "Order",
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
		]/**SCHEMA_DIFF*/,
		methods: {}
	};
});
