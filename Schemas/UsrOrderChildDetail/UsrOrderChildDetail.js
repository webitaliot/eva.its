define("UsrOrderChildDetail", ["ConfigurationEnums", "UsrOrderChildDetailResources", "RelationshipsRecordsUtilities",
        "RelationshipsRecordsUtilities"],
    function(enums, resources) {
        return {
            entitySchemaName: "Order",
            mixins: {
                RelationshipsRecordsUtilities: "Terrasoft.RelationshipsRecordsUtilities"
            },
            methods: {

                addRecord: function() {
                    if(this.isNewOrder()){
                        Terrasoft.utils.showInformation(resources.localizableStrings.UnSavedCaseMessage);
                    } else {
                        this.addDetailRecord();
                    }
                },

                isNewOrder: function() {
                    var cardState = this.sandbox.publish("GetCardState", null, [this.sandbox.id]);
                    var isNew = (cardState.state === enums.CardStateV2.ADD ||
                    cardState.state === enums.CardStateV2.COPY);
                    return isNew;
                },

                onCardSaved: function() {
                    this.callParent(arguments);
                    this.addDetailRecord();
                },

                addDetailRecord: function() {
                    this.openComponentsLookup();
                },

                getParentCollection: function(item) {
                    var orderParentId = this.get("UsrParent", value);
                    var config = {
                        serviceName: "HierarchicalRecordSelectService",
                        methodName: "GetRecords",
                        data: {
                            request: {
                                Id: item,
                                SchemaTableName: "Order",
                                ParentIdColumnName: orderParentId ,
                                Type: "parent"
                            }
                        }
                    };
                    this.callService(config, this.onSelectRecords, this);
                },

                onSelectRecords: function(responseObject) {
                    var result = responseObject.GetRecordsResult;
                    if (result) {
                        this.set("OrderParentCollection", result);
                    }
                    this.openComponentsLookup();
                },

                openComponentsLookup: function() {
                    var columnNames = ["UsrParent"];
                    var parentRecord = this.sandbox.publish("GetColumnsValues", columnNames, [this.sandbox.id]);
                    var masterRecordId = this.get("MasterRecordId");
                    var filtersCollection = this.mixins.RelationshipsRecordsUtilities.getHierarchicalFilter.call(this,
                        masterRecordId, parentRecord.ParentCase, "UsrParent");
                    var config = {
                        entitySchemaName: "Order",
                        multiSelect: true
                    };
                    config.filters = filtersCollection;
                    this.Terrasoft.LookupUtilities.Open({
                        "lookupConfig": config,
                        "sandbox": this.sandbox,
                        "valuePairs": this.get("DefaultValues")
                    }, this.addCallBack, this);
                },

                addCallBack: function(args) {
                    var parentCaseId = this.get("MasterRecordId");
                    this.selectedRows = args.selectedRows.getItems();
                    var selectedItems = [];
                    this.selectedRows.forEach(function(item) {
                        selectedItems.push(item.Id);
                    }, this);
                    if (selectedItems.length !== 0) {
                        var config = this.mixins.RelationshipsRecordsUtilities.getConfig(parentCaseId,
                            selectedItems, "Order", UsrParent);
                        this.callService(config, function (response) {
                            this.addElementInHierarchy(response, selectedItems);
                        }, this);
                    } else {
                        this.updateDetail({reloadAll: true});
                    }
                },

                addElementInHierarchy: function(responseObject, selectedItems) {
                    if(responseObject) {
                        var result = responseObject.UpdateRecordsResult;
                        if (result.success) {
                            this.onUpdate.call(this, selectedItems);
                        } else {
                            Terrasoft.utils.showInformation(result.errorInfo.message);
                        }
                    }
                },

                getUpdateQuery: function(items) {
                    var update = Ext.create("Terrasoft.UpdateQuery", {
                        rootSchemaName: this.entitySchemaName
                    });
                    update.filters.add("IdFilter", update.createColumnInFilterWithParameters("Id", items));
                    return update;
                },

                onUpdate: function(selectedItems) {
                    this.hideBodyMask.call(this);
                    this.beforeLoadGridData();
                    var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
                        rootSchema: this.entitySchema
                    });
                    this.initQueryColumns(esq);
                    esq.filters.add("Id", Terrasoft.createColumnInFilterWithParameters("Id", selectedItems));
                    esq.getEntityCollection(function(response) {
                        this.afterLoadGridData();
                        if (response.success) {
                            var responseCollection = response.collection;
                            this.prepareResponseCollection(responseCollection);
                            this.getGridData().loadAll(responseCollection);
                        }
                    }, this);
                },

                deleteRecords: function() {
                    var selectedRows = this.getSelectedItems();
                    var update = this.getUpdateQuery(selectedRows);
                    update.setParameterValue("UsrParent", null, this.Terrasoft.DataValueType.GUID);
                    update.execute(function() {
                        this.getGridData().removeByKey(selectedRows[0]);
                    }, this);
                }
            },
            diff: /**SCHEMA_DIFF*/[
                {
                    "operation": "remove",
                    "name": "CopyRecordMenu"
                },
                {
                    "operation": "remove",
                    "name": "EditRecordMenu"
                }
            ]/**SCHEMA_DIFF*/
        };
    }
);
