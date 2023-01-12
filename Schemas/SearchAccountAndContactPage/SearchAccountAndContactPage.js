define("SearchAccountAndContactPage", ["terrasoft", "CustomProcessPageV2Utilities"],
    function(Terrasoft) {
        return {
            entitySchemaName: "Case",
            mixins: {
                CustomProcessPageV2Utilities: "Terrasoft.CustomProcessPageV2Utilities"
            },
            details: /**SCHEMA_DETAILS*/{
            }/**SCHEMA_DETAILS*/,
            messages: {},
            attributes: {
                "UsrNumberActiveCard": {
                    dataValueType: this.Terrasoft.DataValueType.TEXT,
                    type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
                "ContactName": {
                    isRequired: true
                },
                "PhoneNumber": {
                    isRequired: true
                }
            },
            diff: [
                {
                    "operation": "remove",
                    "name": "AccountName",
                    "values": {
                        "layout": {
                            "column": 0,
                            "row": 4,
                            "colSpan": 10,
                            "rowSpan": 1
                        },
                        "bindTo": "AccountName",
                        "caption": {
                            "bindTo": "Resources.Strings.AccountNameCaption"
                        },
                        "contentType": this.Terrasoft.ContentType.SHORT_TEXT,
                        "labelConfig": {
                            "visible": true
                        },
                        "controlConfig" : {
                            "keyup": {
                                bindTo: "searchKeyPress"
                            }
                        }
                    },
                    "parentName": "Header",
                    "propertyName": "items",
                    "index": 3
                },
                {
                    "operation": "remove",
                    "name": "Account",
                    "values": {
                        "itemType": this.Terrasoft.ViewItemType.DETAIL
                    },
                    "parentName": "SearchResultContainer",
                    "propertyName": "items",
                    "index": 1
                },
                {
                    "operation": "insert",
                    "name": "UsrNumberActiveCard",
                    "values": {
                        "layout": {
                            "column": 0,
                            "row": 4,
                            "colSpan": 10,
                            "rowSpan": 1
                        },
                        "bindTo": "UsrNumberActiveCard",
                        "caption": {
                            "bindTo": "Resources.Strings.UsrCardNumberCaption"
                        },
                        "contentType": this.Terrasoft.ContentType.SHORT_TEXT,
                        "labelConfig": {
                            "visible": true
                        },
                        "controlConfig" : {
                            "keyup": {
                                bindTo: "searchKeyPress"
                            }
                        }
                    },
                    "parentName": "Header",
                    "propertyName": "items",
                    "index": 3
                },
            ],
            methods: {
                getContactSearchConfig: function() {
                    return {
                        "Name": this.get("ContactName"),
                        "Phone": this.get("PhoneNumber"),
                        "Email": this.get("Email"),
                        "Account": this.get("AccountName"),
                        "Case": this.get("CaseNumber"),
                        "UsrNumberActiveCard": this.get("UsrNumberActiveCard")
                    };
                },
                onClearClick: function() {
                    this.set("ContactName", "");
                    this.set("PhoneNumber", "");
                    this.set("Email", "");
                    this.set("AccountName", "");
                    this.set("UsrNumberActiveCard", "");
                },
                onCreateContactButton: function() {
                    this.set("ResultCode", "ContactNew");
                    this.set("ContactName", this.get("ContactName"));
                    this.set("PhoneNumber", this.get("PhoneNumber"));
                    this.set("Email", this.get("Email"));
                    this.set("AccountName", this.get("AccountName"));
                    this.set("UsrNumberActiveCard", this.get("UsrNumberActiveCard"));
                    this.acceptProcessElement();
                },
            }
        };
    });