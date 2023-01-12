define("UsrStoreFiltrationForCaseBaseLookup", ["LookupPage", "LookupPageViewGenerator", "LookupPageViewModelGenerator",
"ProcessModuleUtilities", "LookupUtilities", "css!LookupPageCSS"],
	function(LookupPage, LookupPageViewGenerator, LookupPageViewModelGenerator, ProcessModuleUtilities) {
		return Ext.define("Terrasoft.Configuration.UsrStoreFiltrationForCaseBaseLookup", {
			alternateClassName: "Terrasoft.KmKLSHLookupPage",
			extend: "Terrasoft.LookupPage",
			gridWrapClasses: ["custom-lookup-control"],
 
			init: function(callback, scope) {
				callback = callback || Terrasoft.emptyFn;
				if (this.viewModel) {
					callback.call(scope);
					return;
				}
				var lookupInfo = this.getLookupInfo();
				if (this.Ext.isArray(lookupInfo)) {
					var configIndex = 0;
					var parameters = this.parameters;
					if (!this.Ext.isEmpty(parameters)) {
						configIndex = parameters.index;
					}
					this.lookupInfo = lookupInfo[configIndex];
					this.lookupsInfo = lookupInfo;
				} else {
					this.lookupInfo = lookupInfo;
				}
				this.processModuleFlag = this.sandbox.publish("CardProccessModuleInfo", null, [this.sandbox.id]);
				this.initHistoryState();
				this.getSchemaAndProfile(this.lookupInfo.lookupPostfix, function(entitySchema, profile) {
					if (this.isDestroyed) {
						return;
					}
                    // Здесь сам объект, и сюда мы прокидываем свои свойства
                    // Свойства для каждой колонки находятся в схеме объекта (ConfItem.js Пример!)
					entitySchema.primaryDisplayColumn = {
						caption: "Номер магазина",
						columnPath: "UsrStoreNumber",
						dataValueType: 1,
						isInherited: true,
						isRequired: true,
						isValueCloneable: true,
						name: "UsrStoreNumber",
						size: 250,
						uId: "579ef114-6d9d-496c-8c87-3b3f9f899050",
						usageType: 0
					};
					
					entitySchema.primaryDisplayColumnName = "UsrStoreNumber";
 
					var primaryDisplayColumn = entitySchema.primaryDisplayColumn;
 
					if (primaryDisplayColumn) {
						this.lookupInfo.searchColumn = {
							value: primaryDisplayColumn.name,
							displayValue: primaryDisplayColumn.caption
						};
					}
					this.lookupInfo.entitySchema = entitySchema;
					this.lookupInfo.gridProfile = profile;
					var viewModel = this.viewModel = this.generateViewModel();
					//viewModel.primaryDisplayColumnName = "UsrStoreNumber";
					viewModel.lookupInfo = this.lookupInfo;
					viewModel.load(profile, callback, scope);
				});
			}
		});
	}
);