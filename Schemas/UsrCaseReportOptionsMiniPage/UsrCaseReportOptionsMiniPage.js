define("UsrCaseReportOptionsMiniPage", ["MiniPageResourceUtilities", "css!UsrCaseReportOptionsMiniPageCSS"],
    function(miniPageResources) {
        return {
            entitySchemaName: "UsrCaseReportOptions",
            details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
            attributes: {

                "MiniPageModes": {
                    "value": [this.Terrasoft.ConfigurationEnums.CardOperation.VIEW,
                        this.Terrasoft.ConfigurationEnums.CardOperation.ADD]
                },


                "IsQualifiedLookupVisible": {
                    "dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
                    "value": false
                },


                "QualifyStatus": {
                    "lookupListConfig": {
                        "columns": ["StageNumber"]
                    }
                },


                "IsFromSection": {
                    "dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
                    "type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
                    "value": false
                }
            },
            methods: {
                save: function() {
                    var start = this.get("UsrStart");
                    var end = this.get("UsrEnd");
                    if(this.isFilledRequiredColumns(start, end)) {
                        this.closeMiniPage();
                        this.showBodyMask();
                        start = start.toLocaleDateString();
                        end = end.toLocaleDateString();
                        this.generateReport(start, end);
                        return;
                    }
                    this.showRequiredInfo(start, end);
                },

                isFilledRequiredColumns: function(start, end) {
                    return start && end;
                },

                generateReport: function(start, end) {
                    var link = document.createElement('a');
                    link.href = Terrasoft.workspaceBaseUrl + '/rest/UsrBPMService/GenerateReport?start=' + start + '&end=' + end;
                    link.download = 'Отчет.xlsx';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    this.hideBodyMask();
                },

                closeMiniPage: function() {
                    this.sandbox.publish("CloseMiniPage", null, [this.sandbox.id]);
                },

                showRequiredInfo: function(start, end) {
                    if(!start) {
                        this.setValidationInfo("UsrStart", false, "Заполните это поле");
                    }
                    if(!end) {
                        this.setValidationInfo("UsrEnd", false, "Заполните это поле");
                    }
                }

            },
            diff: /**SCHEMA_DIFF*/[
                {
                    "operation": "merge",
                    "name": "MiniPage",
                    "values": {
                        "classes": {
                            "wrapClassName": ["lead-mini-page-container"]
                        }
                    }
                },
                {
                    "operation": "merge",
                    "name": "RequiredColumnsContainer",
                    "values": {
                        "classes": {
                            "wrapClassName": ["required-columns-container", "grid-layout",
                                "lead-mini-page-container"]
                        }
                    }
                },
                {
                    "operation": "merge",
                    "name": "CloseMiniPageButton",
                    "values": {
                        "visible": {"bindTo": "isNotViewMode"}
                    }
                },
                {
                    "operation": "merge",
                    "name": "OpenCurrentEntityPage",
                    "values": {
                        "visible": false
                    }
                },
                {
                    "operation": "insert",
                    "name": "UsrStart",
                    "parentName": "MiniPage",
                    "propertyName": "items",
                    "values": {
                        "layout": {"column": 0, "row": 1, "colSpan": 24},
                        "isMiniPageModelItem": true,
                        "isRequired": true
                    }
                },
                {
                    "operation": "insert",
                    "name": "UsrEnd",
                    "parentName": "MiniPage",
                    "propertyName": "items",
                    "values": {
                        "layout": {"column": 0, "row": 2, "colSpan": 24},
                        "isMiniPageModelItem": true,
                        "isRequired": true
                    }
                },

            ]/**SCHEMA_DIFF*/
        };
    }
);
