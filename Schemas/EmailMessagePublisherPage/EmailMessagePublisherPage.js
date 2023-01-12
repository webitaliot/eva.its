define("EmailMessagePublisherPage", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            entitySchemaName: "Activity",
            mixins: {
                MacrosUtilities: "Terrasoft.MacrosUtilities",
                ExtendedHtmlEditModuleUtilities: "Terrasoft.ExtendedHtmlEditModuleUtilities",
                MessagePublisherAttachmentUtilities: "Terrasoft.MessagePublisherAttachmentUtilities",
                EntityResponseValidationMixin: "Terrasoft.EntityResponseValidationMixin"
            },
            messages: {},
            attributes: {},
            methods: {
            	/*setDefaultSenderMailbox: function(result) {
					if (false) {
						this.callParent([result]);
					}
				},*/
				_isCaseSchema: function() {
					return false;
				},
                setDefaultSenderEnum: function() {
                	this.callParent(arguments);
                    var selectMailboxSyncSettings = this.getSenderQuery();
                    selectMailboxSyncSettings.getEntityCollection(function(result) {
                        var collection = result.collection;
                        if (collection && collection.collection.length > 0) {
                            this.Terrasoft.each(collection.collection.items, function(item) {
                                var columnDisplayValue = this.Ext.String.format(
                                    this.get("Resources.Strings.EmailFormatString"),
                                    "EVA",
                                    item.values.SenderEmailAddress);
                                var it = {
                                    displayValue: columnDisplayValue,
                                    value: item.values.Id
                                };
                                if (item.values.IsDefault) {
                                    //this.set("SenderEnum", it);
                                    this.set("Sender", it.displayValue);
                                }
                            }, this);
                        } else {
                            var buttonsConfig = {
                                buttons: [this.Terrasoft.MessageBoxButtons.YES.returnCode,
                                    this.Terrasoft.MessageBoxButtons.NO.returnCode],
                                defaultButton: 0,
                                caption: this.get("Resources.Strings.AddEmailForUserQuestion")
                            };
                            var buildType = ConfigurationConstants.BuildType.Public;
                            this.Terrasoft.SysSettings.querySysSettingsItem("BuildType", function(sysSettingValue) {
                                if (sysSettingValue && sysSettingValue.value === buildType) {
                                    this.showInformationDialog(this.get("Resources.Strings.MailboxDoesntExist"));
                                } else {
                                    this.showInformationDialog(
                                        this.get("Resources.Strings.AddEmailForUserQuestion"),
                                        this.addEmailForUser, buttonsConfig, this);
                                }
                            }, this);
                        }
                    }, this);
                },
                getPublishData: function() {
                    var publishData = [];
                    var config = this.getListenerRecordData();
                    var relationSchemaName = config.relationSchemaName;
                    var relationSchemaRecordId = config.relationSchemaRecordId;
                    publishData.push({"Key": relationSchemaName + "Id", "Value": relationSchemaRecordId});
                    var body = this.get("Body");
                    var title = this.get("Title");
                    //todo removed
                    //if (config && config.additionalInfo.title) {
                    //    title = config.additionalInfo.title;
                    //}
                    //todo removed
                    var sender = this.get("Sender");
                    var recepient = this.get("Recepient");
                    var copyRecepient = this.get("CopyRecepient");
                    var blindCopyRecepient = this.get("BlindCopyRecepient");
                    publishData.push(
                        {"Key": "Body", "Value": body},
                        {"Key": "Title", "Value": title},
                        {"Key": "Sender", "Value": sender},
                        {"Key": "Recepient", "Value": recepient},
                        {"Key": "CopyRecepient", "Value": copyRecepient},
                        {"Key": "BlindCopyRecepient", "Value": blindCopyRecepient},
                        {"Key": "Id", "Value": this.get("PrimaryColumnValue")}
                    );
                    return publishData;
                },

            },
            diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/
        };
    });