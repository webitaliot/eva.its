define("CtiPanelIdentificationUtilities", ["CtiPanelIdentificationUtilitiesResources", "CtiConstants",
        "ConfigurationConstants"],
    function(resources, CtiConstants, ConfigurationConstants) {


        Ext.define("Terrasoft.configuration.mixins.CtiPanelIdentificationUtilities", {
            extend: "Terrasoft.core.BaseObject",
            alternateClassName: "Terrasoft.CtiPanelIdentificationUtilities",




            fillSubscribersCollection: function(queryResultSubscribers, collectionName, subscriberKeyName) {
                try {
                    if(queryResultSubscribers && queryResultSubscribers.length == 1) {
                        this.loadTalkScript(queryResultSubscribers[0]);
                    }
                    else
                    {
                    	this.loadTalkScriptWithoutContact();
                    }
                }
                catch(ex){console.log("Can't load talk script");}
                var number = this.get("CurrentCallNumber");
                if (Ext.isEmpty(number)) {
                    return;
                }
                var tempCollection = this.Ext.create("Terrasoft.Collection");
                var panelCollection = this.get(collectionName || "IdentifiedSubscriberPanelCollection");
                panelCollection.clear();
                Terrasoft.each(queryResultSubscribers, function(queryResultSubscriber) {
                    if (tempCollection.contains(queryResultSubscriber.SubscriberId)) {
                        return;
                    }
                    var panelConfig = this.getIdentifiedSubscriberPanelConfig(queryResultSubscriber);
                    var subscriberPanel = this.createPanelViewModel(panelConfig,
                        this.identifiedSubscriberPanelViewModelClass);
                    tempCollection.add(queryResultSubscriber.SubscriberId, subscriberPanel);
                }, this);
                panelCollection.loadAll(tempCollection);
                this.setIdentifiedSubscriberOnTheAdvise(panelCollection,
                    subscriberKeyName || "IdentifiedSubscriberKey");
            },

            //todo
            loadTalkScript: function(identificatedEntity) {
            	this.set("TestDataWebitel", identificatedEntity.Name);
                var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                    rootSchemaName: "UsrTalkScript"
                });
                esq.addColumn("UsrStartTime");
                esq.addColumn("UsrEndTime");
                esq.addColumn("UsrUaText");
                esq.addColumn("UsrRuText");
                esq.getEntityCollection(function(response) {
                    if(response && response.success && response.collection.getCount() > 0) {
                        var collection = response.collection.collection;
                        Terrasoft.each(collection.items, function(item) {
                            var today = new Date();
                            var startFilter = new Date(item.get("UsrStartTime"));
                            var endFilter = new Date(item.get("UsrEndTime"));
                            if(today >= startFilter && today <= endFilter) {
                                var ivrLang = this.get("IVRlang");
                                var scriptText = "";
                                switch(ivrLang) {
                                    case "rus":
                                        scriptText = item.get("UsrRuText");
                                        break;
                                    case "ukr":
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                    default:
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                }
                                scriptText = scriptText.replace("{0}", identificatedEntity.Name);
                                this.set("TalkScriptName", identificatedEntity.Name);
                                scriptText = scriptText.replace("{1}", Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue);
                                this.set("TalkScriptText", scriptText);
                                this.set("isIdentificated", true);
                            }
                        }, this);
                    }
                    else {
                        console.log("can not find talk script in db");
                    }
                }, this);
            },
            loadTalkScriptWithoutContact: function(identificatedEntity) {
                var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
                    rootSchemaName: "UsrTalkScript"
                });
                esq.addColumn("UsrStartTime");
                esq.addColumn("UsrEndTime");
                esq.addColumn("UsrUaText");
                esq.addColumn("UsrRuText");
                esq.getEntityCollection(function(response) {
                    if(response && response.success && response.collection.getCount() > 0) {
                        var collection = response.collection.collection;
                        Terrasoft.each(collection.items, function(item) {
                            var today = new Date();
                            var startFilter = new Date(item.get("UsrStartTime"));
                            var endFilter = new Date(item.get("UsrEndTime"));
                            if(today >= startFilter && today <= endFilter) {
                                var ivrLang = this.get("IVRlang");
                                var scriptText = "";
                                switch(ivrLang) {
                                    case "rus":
                                        scriptText = item.get("UsrRuText");
                                        break;
                                    case "ukr":
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                    default:
                                        scriptText =  item.get("UsrUaText");
                                        break;
                                }
                                scriptText = scriptText.replace("{1}", Terrasoft.SysValue.CURRENT_USER_CONTACT.displayValue);
                                scriptText = scriptText.replace(" {0}!","!");
                                this.set("TalkScriptText", scriptText);
                                this.set("isIdentificated", true);
                            }
                        }, this);
                    }
                    else {
                        console.log("can not find talk script in db");
                    }
                }, this);
            },
            //


            fillSearchResultCollection: function(querySearchResults) {
                var searchResultCollection = new Terrasoft.Collection();
                Terrasoft.each(querySearchResults, function(querySearchResultItem) {
                    this.updateSearchResultCollection(searchResultCollection, querySearchResultItem);
                }, this);
                var searchResultPanelCollection = this.get("SearchResultPanelCollection");
                var tempCollection = this.Ext.create("Terrasoft.Collection");
                var viewClass = this.searchResultPanelViewModelClass;
                searchResultPanelCollection.clear();
                searchResultCollection.each(function(searchResultItemConfig) {
                    var searchResultPanel = this.createPanelViewModel(searchResultItemConfig, viewClass);
                    tempCollection.add(searchResultItemConfig.Id, searchResultPanel);
                }.bind(this));
                searchResultPanelCollection.loadAll(tempCollection);
            },


            updateSearchResultCollection: function(searchResultCollection, queryResultSubscriber) {
                var searchResultPanelConfig = searchResultCollection.find(queryResultSubscriber.SubscriberId);
                var communicationPanelKey = queryResultSubscriber.CommunicationId;
                var communicationPanelConfig = this.getCommunicationPanelConfig(queryResultSubscriber);
                var communicationPanel = this.createPanelViewModel(communicationPanelConfig,
                    this.communicationPanelViewModelClass);
                if (!searchResultPanelConfig) {
                    searchResultPanelConfig = this.getSearchResultPanelConfig(queryResultSubscriber);
                    searchResultCollection.add(queryResultSubscriber.SubscriberId, searchResultPanelConfig);
                }
                if (!searchResultPanelConfig.SubscriberCommunications.contains(communicationPanelKey)) {
                    searchResultPanelConfig.SubscriberCommunications.add(communicationPanelKey, communicationPanel);
                }
            },


            setIdentifiedSubscriberOnTheAdvise: function(subscribers, identifiedSubscriberKeyName) {
                var adviseIdentifiedSubscriberInfo = this.get("AdvisedIdentifiedSubscriberInfo");
                if (Ext.isEmpty(adviseIdentifiedSubscriberInfo)) {
                    return;
                }
                var adviseIdentifiedSubscriber = adviseIdentifiedSubscriberInfo.customerId;
                if (adviseIdentifiedSubscriber) {
                    var identifiedSubscriber = subscribers.find(adviseIdentifiedSubscriber);
                    if (identifiedSubscriber) {
                        this.set(identifiedSubscriberKeyName, adviseIdentifiedSubscriber);
                    }
                }
            },


            getCallBySubscriberCollectionName: function(subscribersCollectionName) {
                var call;
                if (subscribersCollectionName === "IdentifiedSubscriberPanelCollection") {
                    call = this.get("CurrentCall");
                    if (call) {
                        call = this.activeCalls.find(call.id);
                    }
                }
                if (subscribersCollectionName === "IdentifiedConsultSubscriberPanelCollection") {
                    call = this.findConsultCall();
                }
                return call;
            },


            addCallRelationFields: function(call, subscriberId) {
                var advisedIdentifiedSubscriberInfo = this.get("AdvisedIdentifiedSubscriberInfo");
                var isNeedAddFields = !Ext.isEmpty(advisedIdentifiedSubscriberInfo) &&
                    (call.direction === Terrasoft.CallDirection.OUT) &&
                    (advisedIdentifiedSubscriberInfo.customerId === subscriberId) &&
                    !Ext.isEmpty(advisedIdentifiedSubscriberInfo.callRelationFields);
                if (isNeedAddFields) {
                    call.identificationFieldsData.loadAll(advisedIdentifiedSubscriberInfo.callRelationFields);
                    this.set("AdvisedIdentifiedSubscriberInfo", null);
                }
            },


            updateCallByIdentifiedSubscriber: function(collectionName, subscriberId, isManualClear) {
                if (!subscriberId && !isManualClear) {
                    return;
                }
                var call = this.getCallBySubscriberCollectionName(collectionName);
                if (call) {
                    call.identificationFieldsData = this.getCallFieldValuesBySubscriber(collectionName, subscriberId);
                    this.addCallRelationFields(call, subscriberId);
                    call.needSaveIdentificationData = true;
                    this.updateCallByIdentificationData(call);
                }
            },


            updateCallByIdentificationData: function(call) {
                var databaseId = call.databaseUId;
                var updateFields = call.identificationFieldsData;
                var isStopUpdating = !call.needSaveIdentificationData || !call.isSavedInDB || Ext.isEmpty(databaseId) ||
                    Ext.isEmpty(updateFields) || updateFields.isEmpty();
                if (isStopUpdating) {
                    return;
                }
                var logMessage = Ext.String.format(this.getResourceString("IdentificationSavingMessage"), call.id);
                var update = this.Ext.create("Terrasoft.UpdateQuery", {
                    rootSchemaName: "Call"
                });
                var filters = update.filters;
                var idFilter = update.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
                    "Id", databaseId);
                filters.add("IdFilter", idFilter);
                var fieldSavingMessageTemplate = this.getResourceString("IdentificationFieldSavingMessage");
                updateFields.each(function(item) {
                    var name = item.name;
                    var value = item.value;
                    update.setParameterValue(name, value, item.type);
                    logMessage = logMessage + "\n\t" + Ext.String.format(fieldSavingMessageTemplate, name, value);
                });
                var updateCallback = function(result) {
                    if (result.success) {
                        logMessage += "\n" + this.getResourceString("IdentificationSavedSuccessfullyMessage");
                        this.log(logMessage);
                        call.needSaveIdentificationData = false;
                    } else {
                        logMessage += "\n" + this.getResourceString("IdentificationSavedFailedMessage");
                        this.error(logMessage);
                    }
                    this.fireEvent("callIdentificationSaved", call.id, updateFields,
                        !result.success ? logMessage : null);
                }.bind(this);
                update.execute(updateCallback);
            },






            getSubscriberPanelCommonConfig: function(queryResultSubscriber) {
                var panelConfig = {
                    Id: queryResultSubscriber.SubscriberId,
                    Name: queryResultSubscriber.Name,
                    Photo: queryResultSubscriber.Photo.value,
                    Number: queryResultSubscriber.Number
                };
                switch (queryResultSubscriber.SubscriberType) {
                    case CtiConstants.SubscriberTypes.Contact:
                        this.fillContactIdentificationData(panelConfig, queryResultSubscriber);
                        break;
                    case CtiConstants.SubscriberTypes.Account:
                        this.fillAccountIdentificationData(panelConfig, queryResultSubscriber);
                        break;
                    default:
                        break;
                }
                return panelConfig;
            },


            getIdentifiedSubscriberPanelConfig: function(queryResultSubscriber) {
                var panelConfig = this.getSubscriberPanelCommonConfig(queryResultSubscriber);
                Ext.apply(panelConfig, {CommunicationType: queryResultSubscriber.CommunicationType.displayValue});
                return panelConfig;
            },


            getSearchResultPanelConfig: function(queryResultSubscriber) {
                var panelConfig = this.getSubscriberPanelCommonConfig(queryResultSubscriber);
                Ext.apply(panelConfig, {
                    SubscriberCommunications: new Terrasoft.Collection(),
                    CtiModel: this
                });
                return panelConfig;
            },


            getCommunicationPanelConfig: function(queryResultSubscriber) {
                return {
                    Id: queryResultSubscriber.Id,
                    Type: queryResultSubscriber.CommunicationType.displayValue,
                    Number: queryResultSubscriber.Number,
                    SubscriberId: queryResultSubscriber.SubscriberId,
                    CtiModel: this,
                    IsTelephonyAvailable: this.get("IsTelephonyAvailable")
                };
            },


            getIsNumberInternal: function(number) {
                if (Ext.isEmpty(number)) {
                    return true;
                }
                var ctiSettings = this.get("CtiSettings");
                var internalNumberLength = ctiSettings.internalNumberLength;
                return number.length <= internalNumberLength;
            },


            getSearchNumberComparisonType: function(searchNumber) {
                if (Ext.isEmpty(searchNumber)) {
                    throw new Terrasoft.NullOrEmptyException(
                        resources.localizableStrings.PhoneNumberCantBeEmptyMessage);
                }
                var isInternal = this.getIsNumberInternal(searchNumber);
                return (isInternal) ? Terrasoft.ComparisonType.EQUAL : Terrasoft.ComparisonType.START_WITH;
            },


            addEmployeeFilter: function(query) {
                var Terrasoft = this.Terrasoft;
                var filterGroup = Terrasoft.createFilterGroup();
                filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
                filterGroup.add("IsUser", Terrasoft.createExistsFilter("[SysAdminUnit:Contact:Contact].Id"));
                filterGroup.add("IsEmployeeType", Terrasoft.createColumnFilterWithParameter(
                    Terrasoft.ComparisonType.EQUAL, "Contact.Type", ConfigurationConstants.ContactType.Employee));
                query.filters.add("IsEmployee", filterGroup);
            },


            getContactIdentificationQuery: function(searchNumber) {
                var comparisonType = this.getSearchNumberComparisonType(searchNumber);
                var query = this.getContactQuery("SearchNumber", searchNumber, comparisonType);
                var isInternalNumber = this.getIsNumberInternal(searchNumber);
                if (isInternalNumber) {
                    this.addEmployeeFilter(query);
                }
                return query;
            },


            getContactSearchQuery: function(searchName) {
                return this.getContactQuery("Contact.Name", searchName);
            },


            getAccountIdentificationQuery: function(searchNumber) {
                var comparisonType = this.getSearchNumberComparisonType(searchNumber);
                return this.getAccountQuery("SearchNumber", searchNumber, comparisonType);
            },


            getAccountSearchQuery: function(searchName) {
                return this.getAccountQuery("Account.Name", searchName);
            },


            getContactQuery: function(searchFieldName, searchValue, comparisonType) {
                comparisonType = comparisonType || Terrasoft.ComparisonType.START_WITH;
                var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "ContactCommunication"});
                esq.rowCount = CtiConstants.IdentificationMaxRowCount;
                esq.addColumn("Id");
                var contactNameColumn = esq.addColumn("Contact.Name", "Name");
                contactNameColumn.orderPosition = 0;
                contactNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                var contactIdColumn = esq.addColumn("Contact.Id", "SubscriberId");
                contactIdColumn.orderPosition = 1;
                contactIdColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                var communicationTypeNameColumn = esq.addColumn("CommunicationType", "CommunicationType");
                communicationTypeNameColumn.orderPosition = 2;
                communicationTypeNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                esq.addColumn("Contact.Type", "Type");
                esq.addColumn("Contact.Account", "Account");
                esq.addColumn("Contact.Job", "Job");
                esq.addColumn("Contact.Department", "Department");
                esq.addColumn("Contact.Photo", "Photo");
                esq.addColumn("Number");
                esq.addParameterColumn(CtiConstants.SubscriberTypes.Contact, Terrasoft.DataValueType.TEXT,
                    "SubscriberType");
                esq.filters.addItem(Terrasoft.createIsNotNullFilter(
                    Ext.create("Terrasoft.ColumnExpression", {columnPath: "Contact.Id"})));
                esq.filters.add("Search", Terrasoft.createColumnFilterWithParameter(
                    comparisonType, searchFieldName, searchValue));
                esq.filters.add("CommunicationCode", Terrasoft.createColumnFilterWithParameter(
                    Terrasoft.ComparisonType.EQUAL,
                    "[ComTypebyCommunication:CommunicationType:CommunicationType].Communication.Code",
                    CtiConstants.CommunicationCodes.Phone));
                return esq;
            },


            getAccountQuery: function(searchFieldName, searchValue, comparisonType) {
                comparisonType = comparisonType || Terrasoft.ComparisonType.START_WITH;
                var esq = Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "AccountCommunication"});
                esq.rowCount = CtiConstants.IdentificationMaxRowCount;
                esq.addColumn("Id");
                var accountNameColumn = esq.addColumn("Account.Name", "Name");
                accountNameColumn.orderPosition = 0;
                accountNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                var accountIdColumn = esq.addColumn("Account.Id", "SubscriberId");
                accountIdColumn.orderPosition = 1;
                accountIdColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                var communicationTypeNameColumn = esq.addColumn("CommunicationType", "CommunicationType");
                communicationTypeNameColumn.orderPosition = 2;
                communicationTypeNameColumn.orderDirection = Terrasoft.OrderDirection.ASC;
                esq.addColumn("Account.Type", "Type");
                esq.addColumn("Account.City", "City");
                esq.addColumn("Account.Logo", "Photo");
                esq.addColumn("Number");
                esq.addParameterColumn(CtiConstants.SubscriberTypes.Account, Terrasoft.DataValueType.TEXT,
                    "SubscriberType");
                esq.filters.addItem(Terrasoft.createIsNotNullFilter(
                    Ext.create("Terrasoft.ColumnExpression", {columnPath: "Account.Id"})));
                esq.filters.add("Search", Terrasoft.createColumnFilterWithParameter(
                    comparisonType, searchFieldName, searchValue));
                esq.filters.add("CommunicationCode", Terrasoft.createColumnFilterWithParameter(
                    Terrasoft.ComparisonType.EQUAL,
                    "[ComTypebyCommunication:CommunicationType:CommunicationType].Communication.Code",
                    CtiConstants.CommunicationCodes.Phone));
                return esq;
            },


            fillContactIdentificationData: function(panelConfig, queryResultSubscriber) {
                var contactType = queryResultSubscriber.Type.value;
                var isEmployee = (contactType === ConfigurationConstants.ContactType.Employee);
                Ext.apply(panelConfig, {
                    Type: (isEmployee)
                        ? CtiConstants.SubscriberTypes.Employee
                        : CtiConstants.SubscriberTypes.Contact,
                    AccountName: queryResultSubscriber.Account.displayValue,
                    AccountId: queryResultSubscriber.Account.value
                });
                Ext.apply(panelConfig, {Job: queryResultSubscriber.Job.displayValue});
                if (isEmployee) {
                    Ext.apply(panelConfig, {Department: queryResultSubscriber.Department.displayValue});
                }
            },


            fillAccountIdentificationData: function(panelConfig, queryResultSubscriber) {
                Ext.apply(panelConfig, {
                    Type: CtiConstants.SubscriberTypes.Account,
                    AccountType: queryResultSubscriber.Type.displayValue,
                    City: queryResultSubscriber.City.displayValue
                });
            },


            identifySubscriber: function(number, collectionName, subscriberKeyName, callback) {
                if (Ext.isEmpty(number)) {
                    return;
                }
                var reverseNumber = Terrasoft.utils.common.reverseStr(number);
                var ctiSettings = this.get("CtiSettings");
                var searchNumberLength = ctiSettings.searchNumberLength;
                var internalNumberLength = ctiSettings.internalNumberLength;
                if (internalNumberLength > 0 && searchNumberLength > internalNumberLength) {
                    reverseNumber = reverseNumber.substring(0, searchNumberLength);
                }
                this.querySubscribersByPhoneNumber(reverseNumber, function(phoneNumber, response) {
                    if (!(response && response.success)) {
                        return;
                    }
                    var queryResultSubscribers = [];
                    Terrasoft.each(response.queryResults, function(queryResult) {
                        queryResultSubscribers = queryResultSubscribers.concat(queryResult.rows);
                    });
                    if (callback) {
                        callback(queryResultSubscribers, collectionName, subscriberKeyName);
                    } else {
                        this.fillSubscribersCollection(queryResultSubscribers, collectionName,
                            subscriberKeyName);
                    }
                }.bind(this, number));
            },


            searchSubscriberByPrimaryColumnValue: function(searchString) {
                if (Ext.isEmpty(searchString)) {
                    this.fillSearchResultCollection([], searchString);
                    return;
                }
                var phoneNumberEdit = Ext.getCmp("PhoneNumber");
                var maskId = Terrasoft.Mask.show({
                    selector: phoneNumberEdit.selectors.wrapEl,
                    frameVisible: false,
                    caption: ""
                });
                this.querySubscribersBySearchName(searchString, function(response) {
                    Terrasoft.Mask.hide(maskId);
                    if (!(response && response.success)) {
                        var searchResultPanelCollection = this.get("SearchResultPanelCollection");
                        this.set("IsSearchFinishedAndResultEmpty", searchResultPanelCollection.isEmpty());
                        return;
                    }
                    var currentPhoneNumberValue = phoneNumberEdit.getTypedValue();
                    if (currentPhoneNumberValue !== searchString) {
                        this.set("IsSearchFinishedAndResultEmpty", false);
                        return;
                    }
                    if (!this.isSearchValueValid(currentPhoneNumberValue)) {
                        this.clearSearchSubscriber();
                        this.set("IsSearchFinishedAndResultEmpty", false);
                        return;
                    }
                    var querySearchResult = [];
                    Terrasoft.each(response.queryResults, function(queryResult) {
                        querySearchResult = querySearchResult.concat(queryResult.rows);
                    });
                    this.fillSearchResultCollection(querySearchResult, searchString);
                    this.set("IsSearchFinishedAndResultEmpty", (querySearchResult.length === 0));
                }.bind(this));
            },


            clearSearchSubscriber: function() {
                var searchResultPanelCollection = this.get("SearchResultPanelCollection");
                searchResultPanelCollection.clear();
            },


            querySubscribersByPhoneNumber: function(searchNumber, callback) {
                var bq = Ext.create("Terrasoft.BatchQuery");
                this.getIdentificationQueries(bq, searchNumber);
                bq.execute(callback);
            },


            querySubscribersBySearchName: function(searchName, callback) {
                var bq = Ext.create("Terrasoft.BatchQuery");
                this.getSearchQueries(bq, searchName);
                bq.execute(callback);
            },


            getIdentificationQueries: function(bq, searchNumber) {
                bq.add(this.getContactIdentificationQuery(searchNumber));
                bq.add(this.getAccountIdentificationQuery(searchNumber));
            },


            getSearchQueries: function(bq, searchName) {
                bq.add(this.getContactSearchQuery(searchName));
                bq.add(this.getAccountSearchQuery(searchName));
            },


            setIdentifiedSubscriber: function(subscriberId) {
                var isConsulting = this.get("IsConsulting");
                var identifiedSubscriberKeyPropertyName = isConsulting
                    ? "IdentifiedConsultSubscriberKey"
                    : "IdentifiedSubscriberKey";
                var panelCollection = isConsulting
                    ? this.get("IdentifiedConsultSubscriberPanelCollection")
                    : this.get("IdentifiedSubscriberPanelCollection");
                var subscriberExists = panelCollection.contains(subscriberId);
                if (!subscriberExists) {
                	loadTalkScriptWithoutContact();
                    var errorMessage = Ext.String.format(
                        resources.localizableStrings.SubscriberPanelNotFoundExceptionMessage, subscriberId);
                    throw new Terrasoft.ItemNotFoundException({message: errorMessage});
                }
                else {
                    try {
                        var subscriber = panelCollection.get(subscriberId);
                        if (subscriber && subscriber.values) {
                            this.loadTalkScript(subscriber.values);
                        }
                    }
                    catch(ex){console.log("Can't load talk script");}
                }
                this.set(identifiedSubscriberKeyPropertyName, subscriberId);
            },


            clearSubscriber: function() {
                this.set("IdentifiedSubscriberKey", null);
                this.updateCallByIdentifiedSubscriber("IdentifiedSubscriberPanelCollection", null, true);
            },


            clearConsultSubscriber: function() {
                this.set("IdentifiedConsultSubscriberKey", null);
                this.updateCallByIdentifiedSubscriber("IdentifiedConsultSubscriberPanelCollection", null, true);
            },


            getIsIdentificationGroupContainerVisible: function() {
                var isConsult = this.get("IsConsulting");
                var keyPropertyName = isConsult ? "IdentifiedConsultSubscriberKey" : "IdentifiedSubscriberKey";
                var countPropertyName = isConsult ? "IdentifiedConsultSubscribersCount" : "IdentifiedSubscribersCount";
                return this.isIdentificationContainerVisible(countPropertyName, keyPropertyName);
            },


            getIsCurrentCallIdentificationContainerVisible: function() {
                var isConsult = this.get("IsConsulting");
                if (isConsult === true) {
                    return false;
                }
                return this.isIdentificationContainerVisible("IdentifiedSubscribersCount", "IdentifiedSubscriberKey");
            },


            getIsConsultCallIdentificationContainerVisible: function() {
                var isConsult = this.get("IsConsulting");
                if (isConsult !== true) {
                    return false;
                }
                return this.isIdentificationContainerVisible("IdentifiedConsultSubscribersCount",
                    "IdentifiedConsultSubscriberKey");
            },


            isIdentificationContainerVisible: function(subscribersCountPropertyName, subscriberKeyPropertyName) {
                var identifiedSubscriberKey = this.get(subscriberKeyPropertyName);
                if (identifiedSubscriberKey) {
                    return false;
                }
                var subscribersCount = this.get(subscribersCountPropertyName);
                var canNotMakeAnyCalls = !this.getCanMakeCallOrMakeConsultCallOrGetIsOffline();
                return (subscribersCount > 0) && canNotMakeAnyCalls;
            },


            isSearchValueValid: function(searchString) {
                if (searchString.replace(/_|%/g, "").length < CtiConstants.IdentificationMinSymbolCount) {
                    return false;
                }
                var regExp = /[^&]+/;
                var match = searchString.match(regExp);
                var isValid = !Ext.isEmpty(match) && (match.length === 1) && (match[0] === searchString);
                return isValid;
            },


            isPhoneNumberValid: function(value) {
                if (!value) {
                    return false;
                }
                var regExp = /[\d\s\(\)\+\-\*#]+/;
                var match = value.match(regExp);
                return match && (match.length === 1) && (match[0] === value);
            },


            getIdentifiedSubscriberPanel: function(collectionName, subscriberKeyName) {
                var identifiedSubscriberKey = this.get(subscriberKeyName || "IdentifiedSubscriberKey");
                if (!identifiedSubscriberKey) {
                    return null;
                }
                var panelCollection = this.get(collectionName || "IdentifiedSubscriberPanelCollection");
                return panelCollection.find(identifiedSubscriberKey);
            },


            getCallFieldValuesBySubscriber: function(subscribersCollectionName, subscriberId) {
                var updateFields = new Terrasoft.Collection();
                var contactId, contactName, accountId, accountName;
                var subscriberPanelCollection = this.get(subscribersCollectionName);
                var subscriberPanel = subscriberPanelCollection.find(subscriberId);
                if (subscriberPanel) {
                    var subscriberType = subscriberPanel.get("Type");
                    switch (subscriberType) {
                        case CtiConstants.SubscriberTypes.Account:
                            accountId = subscriberId;
                            accountName = subscriberPanel.get("Name");
                            break;
                        case CtiConstants.SubscriberTypes.Contact:
                        case CtiConstants.SubscriberTypes.Employee:
                            contactId = subscriberId;
                            contactName = subscriberPanel.get("Name");
                            accountId = subscriberPanel.get("AccountId");
                            accountName = subscriberPanel.get("AccountName");
                            break;
                        default:
                            return updateFields;
                    }
                }
                updateFields.add("Account", {
                    name: "Account",
                    value: accountId,
                    displayValue: accountName,
                    type: Terrasoft.DataValueType.GUID
                });
                updateFields.add("Contact", {
                    name: "Contact",
                    value: contactId,
                    displayValue: contactName,
                    type: Terrasoft.DataValueType.GUID
                });
                return updateFields;
            }



        });
    });
