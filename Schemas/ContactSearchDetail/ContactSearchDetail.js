define("ContactSearchDetail", ["ContactSearchDetailGridRowViewModel"],
    function() {
        return {

            entitySchemaName: "Contact",
            messages: {

                "IsCaseIncluded": {
                    mode: this.Terrasoft.MessageMode.BROADCAST,
                    direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
                },

                "GetSelectButtonCaption": {
                    mode: this.Terrasoft.MessageMode.BROADCAST,
                    direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
                }
            },
            attributes: {
                "IsCaseIncluded": {
                    dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
                    type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                },
                "SelectButtonCaption": {
                    dataValueType: this.Terrasoft.DataValueType.TEXT,
                    type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
                }
            },
            methods: {

                refreshRecords: function(config, isReloadAll) {
                    var filters = this.Ext.create("Terrasoft.FilterGroup");
                    var filterGroup = this.Ext.create("Terrasoft.FilterGroup");
                    filterGroup.logicalOperation = this.Terrasoft.LogicalOperatorType.AND;
                    var isArguments = false;
                    if (config) {
                        for (var item in config) {
                            if (!this.Ext.isEmpty(config[item])) {
                                isArguments = true;
                                switch (item) {
                                    case "Case":
                                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                                            this.Terrasoft.ComparisonType.CONTAIN,
                                            "[Case:Contact:Id].Number", config[item]));
                                        break;
                                    case "Account":
                                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                                            this.Terrasoft.ComparisonType.CONTAIN,
                                            "[Account:Id:AccountId].Name", config[item]));
                                        break;
                                    case "Phone":
                                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                                            this.Terrasoft.ComparisonType.CONTAIN,
                                            "[ContactCommunication:Contact:Id].Number", config[item]));
                                        break;
                                    case "UsrNumberActiveCard":
                                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                                            this.Terrasoft.ComparisonType.CONTAIN,
                                            "UsrNumberActiveCard", config[item]));
                                        break;
                                    default:
                                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                                            this.Terrasoft.ComparisonType.CONTAIN,
                                            item, config[item]));
                                }
                            }
                        }
                    }
                    if (!isArguments) {
                        filterGroup.addItem(this.Terrasoft.createColumnFilterWithParameter(
                            this.Terrasoft.ComparisonType.EQUAL,
                            "Id", this.Terrasoft.GUID_EMPTY));
                    }
                    filters.addItem(filterGroup);
                    this.set("detailFilter", filters);
                    if (isReloadAll) {
                        this.updateDetail({reloadAll: true});
                    }
                },

                init: function() {
                    this.callParent(arguments);
                    this.refreshRecords(null, false);
                },

                subscribeSandboxEvents: function() {
                    this.sandbox.subscribe("UpdateDetail",
                        function(config) {
                            this.refreshRecords(config, true);
                        },
                        this, [this.sandbox.id]);
                    this.sandbox.subscribe("IsCaseIncluded",
                        function(config) {
                            this.set("IsCaseIncluded", config);
                        },
                        this);
                    this.sandbox.subscribe("GetSelectButtonCaption",
                        function(config) {
                            this.set("SelectButtonCaption", config);
                        },
                        this);
                },

                getFilters: function() {
                    return this.get("detailFilter");
                },

                addRecordOperationsMenuItems : this.Terrasoft.emptyFn,

                addDetailWizardMenuItems: this.Terrasoft.emptyFn,

                getSwitchGridModeMenuItem : this.Terrasoft.emptyFn,

                getIsLinkColumn: function() {
                    return false;
                },

                onActiveRowAction: function() {
                    this.sandbox.publish("DetailChanged", this.get("ActiveRow"), [this.sandbox.id]);
                },

                getGridRowViewModelClassName: function() {
                    return "Terrasoft.ContactSearchDetailGridRowViewModel";
                },

                getGridRowViewModelConfig: function() {
                    var gridRowViewModelConfig = this.callParent(arguments);
                    gridRowViewModelConfig.values.CaseVisibility = this.get("IsCaseIncluded");
                    gridRowViewModelConfig.values.SelectButtonCaption = this.get("SelectButtonCaption");
                    return gridRowViewModelConfig;
                }
            },
            diff: /**SCHEMA_DIFF*/[
                {
                    "operation": "remove",
                    "name": "AddRecordButton"
                },
                {
                    "operation": "merge",
                    "name": "DataGrid",
                    "values": {
                        "activeRowAction": {bindTo: "onActiveRowAction"},
                        "activeRowActions": [
                            {
                                "className": "Terrasoft.Button",
                                "style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
                                "caption": {"bindTo": "SelectButtonCaption"}
                            }
                        ]
                    }
                }
            ]/**SCHEMA_DIFF*/
        };
    }
);