define("BaseProductDetailPageV2", ["MoneyModule"],
    function(MoneyModule) {
        return {
            entitySchemaName: "OrderProduct",
            details: /**SCHEMA_DETAILS*/{
                "SharesDetail": {
                    "schemaName": "UsrShareDetail",
                    "entitySchemaName": "UsrShares",
                    "filter": {
                        "detailColumn": "UsrOrderProduct",
                        "masterColumn": "Id"
                    }
                }

            }/**SCHEMA_DETAILS*/,
            attributes: {},
            methods: {},
            diff: /**SCHEMA_DIFF*/[
                  {
                 "operation": "insert",
                 "name": "PriceControlBlock",
                 "values": {
                 "itemType": 15,
                 "caption": "Стоимость",
                 "items": [],
                 "controlConfig": {
                 "collapsed": false
                 }
                 },
                 "parentName": "BaseProductPageGeneralTabContainer",
                 "propertyName": "items",
                 "index": 1
                 },
                 {
                 "operation": "insert",
                 "name": "PriceResultsBlock",
                 "values": {
                 "itemType": 0,
                 "items": []
                 },
                 "parentName": "PriceControlBlock",
                 "propertyName": "items",
                 "index": 1
                 },
                {
                    "operation": "insert",
                    "name": "UsrOriginalPrice",
                    "values": {
                        "bindTo": "UsrOriginalPrice",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 0,
                            "row": 0
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 0
                },
                {
                    "operation": "insert",
                    "name": "UsrPrice",
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "values": {
                        "bindTo": "Price",
                        "layout": {
                            "column": 0,
                            "row": 1,
                            "colSpan": 12
                        }
                    }
                },
                {
                    "operation": "insert",
                    "name": "UsrDiscountedPrice",
                    "values": {
                        "bindTo": "UsrDiscountedPrice",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 0,
                            "row": 2
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 2
                },
                {
                    "operation": "insert",
                    "name": "UsrDiscountAmount",
                    "values": {
                        "bindTo": "DiscountAmount",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 0,
                            "row": 3
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 3
                },
                {
                    "operation": "insert",
                    "name": "UsrAmountPrice",
                    "values": {
                        "bindTo": "UsrAmountPrice",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 12,
                            "row": 0
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 4
                },
                {
                    "operation": "insert",
                    "name": "UsrAmountPriceDiscount",
                    "values": {
                        "bindTo": "UsrAmountPriceDiscount",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 12,
                            "row": 1
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 5
                },
                {
                    "operation": "insert",
                    "name": "UsrInStock",
                    "values": {
                        "bindTo": "UsrInStock",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 12,
                            "row": 2
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 6
                },
                {
                    "operation": "insert",
                    "name": "Quantity",
                    "values": {
                        "bindTo": "Quantity",
                        "enabled": false,
                        "layout": {
                            "colSpan": 12,
                            "rowSpan": 1,
                            "column": 12,
                            "row": 3
                        }
                    },
                    "parentName": "PriceResultsBlock",
                    "propertyName": "items",
                    "index": 7
                },
                {
                    "operation": "remove",
                    "name": "AmountControlGroup"
                },
                {
                    "operation": "insert",
                    "name": "SharesDetail",
                    "values": {
                        "itemType": 2,
                        "markerValue": "added-detail"
                    },
                    "parentName": "BaseProductPageGeneralTabContainer",
                    "propertyName": "items",
                    "index": 2
                }
            ]/**SCHEMA_DIFF*/
        };
    });
