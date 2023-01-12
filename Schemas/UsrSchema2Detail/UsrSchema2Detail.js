define("UsrSchema2Detail", [], function() {
	return {
		entitySchemaName: "UsrProductInTransaction",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[
			 {
                "operation": "remove",
                "name": "AddRecordButton"
            }
            ]/**SCHEMA_DIFF*/,
		methods: {
			getAddRecordButtonVisible: function() {
                return false;
            },
            getAddTypedRecordButtonVisible: function() {
                return false;
            },
            addRecordOperationsMenuItems: Terrasoft.emptyFn
		}
	};
});
