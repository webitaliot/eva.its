define("UsrDependentOrders", [], function() {
    return {
        entitySchemaName: "Order",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        methods: {
            getAddRecordButtonVisible: function() {

                return false;
            }

        }
    };
});
