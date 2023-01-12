define("OrderProductPageV2", ["BusinessRuleModule", "OrderUtilities"],
    function(BusinessRuleModule) {
        return {
            entitySchemaName: "OrderProduct",
            methods: {},
            diff: /**SCHEMA_DIFF*/[

            ]/**SCHEMA_DIFF*/,
            rules: {
                "Product": {
                    "BindParameterEnabledCurrencyRate": {
                        "ruleType": BusinessRuleModule.enums.RuleType.BINDPARAMETER,
                        "property": BusinessRuleModule.enums.Property.ENABLED,
                        "conditions": [{
                            "leftExpression": {
                                "type": BusinessRuleModule.enums.ValueType.CONST,
                                "value": true
                            },
                            "comparisonType": this.Terrasoft.core.enums.ComparisonType.NOT_EQUAL,
                            "rightExpression": {
                                "type": BusinessRuleModule.enums.ValueType.CONST,
                                "value": true
                            }
                        }]
                    }
                }
            }
        };
    }
);
