define("CommunicationHistoryItem", ["terrasoft", "CtiConstants", "NetworkUtilities", "ConfigurationEnums",
        "ConfigurationConstants", "CtiBaseHelper", "LookupQuickAddMixin",
        "EntityConnectionLinksPanelItemUtilities"],
    function(Terrasoft, CtiConstants, NetworkUtilities, ConfigurationEnums, ConfigurationConstants) {
        return {
            methods: {
                onCreateNewContactMenuItemClick: function() {
                    var valuePairs = [];
                    var mobilePhone = this.get("Number");
                    if(mobilePhone) {
                        valuePairs.push({
                            name: "MobilePhone",
                            value: mobilePhone
                        });
                    }
                    this.openNewRecordCard("Contact", "ContactPageV2", valuePairs);
                }
            },
            diff: [
            ]
        };
    }
);
