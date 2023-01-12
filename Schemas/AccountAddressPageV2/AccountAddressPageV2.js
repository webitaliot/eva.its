define("AccountAddressPageV2", ["BusinessRuleModule", "UsrConstants"], function(BusinessRuleModule, UsrConstants) {
    return {
        entitySchemaName: "AccountAddress",
        attributes: {},
        messages: {},
        methods: {
            onEntityInitialized: function(){
                this.callParent(arguments);
                this.defaultCountry();
            },
            defaultCountry: function(){
                this.loadLookupDisplayValue("Country", UsrConstants.County.Ukraine);
            }
        },
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        rules: {},
        diff: /**SCHEMA_DIFF*/[
            {
                "operation": "insert",
                "name": "UsrAddress2",
                "parentName": "Header",
                "propertyName": "items",
                "values": {
                    "layout": {column: 12, row: 3, colSpan: 12},
                    "caption": {"bindTo": "Resources.Strings.UsrAddressCaption"}
                }
            },
        ]/**SCHEMA_DIFF*/
    };
});
