define("OrderProductDetailV2", ["OrderProductDetailV2Resources", "BusinessRulesApplierV2"], 
	function(resources, BusinessRulesApplier) {
	return {
		entitySchemaName: "OrderProduct",
		messages: {
			"GetOrderStatusInfo": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},
			"SetRecomendationVisible":{
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			"Product": {
				lookupListConfig: {
					columns: ["UsrFormat"],
				}
			}
		},
		methods: {
			getAddRecordButtonEnabled: function () {
				return false;
			},
			getCopyRecordMenuEnabled: function() {
				return false;
			},
			getEditRecordButtonEnabled: function() {
				return false;
			},
			isAnySelected: function(){
				return false;
			},
			addGridDataColumns: function(esq) {
				this.callParent(arguments);
				esq.addColumn("UsrActionColor.UsrColorInHex", "UsrColorHex");
			},
			prepareResponseCollectionItem: function (item) {
				var statusInfo = this.sandbox.publish("GetOrderStatusInfo");
				// константу статуса нужно вынести в константы модуль констант
				var orderStatusPartialAssembled = "4a2ca622-119e-4968-b0f1-b18d79972b9c";
				
				if (item) {
					this.UpdateIsAdditionalAssortment(item);
				}
				
				item.customStyle = {};
				if (statusInfo && statusInfo.value == orderStatusPartialAssembled) {
					if (item) {
						if (item.$UsrFormat == "770") {
							item.customStyle["background"] = "orange";
						}
						if (item.$Quantity > 0 && item.$Quantity > item.$UsrInStock) {
							item.customStyle["color"] = "red";
						}
					}

				}
				this.Terrasoft.each(item.columns, function (column) {
					this.addColumnLink(item, column);
					this.applyColumnDefaults(column);
				}, this);
			},
			
			UpdateIsAdditionalAssortment: function(item){
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Product" });
				esq.addColumn("UsrFormat");
				esq.rowCount=1; //top1
				esq.filters.addItem(esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, 
					"Id", item.$ProductId));
				var filters = Ext.create("Terrasoft.FilterGroup");
				filters.add("ProductId", esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Code",
						item.$UsrSKU));
				filters.add("Format", esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"UsrFormat", "770"));
				esq.filters = filters;
				esq.getEntityCollection(function (result) {
					if (result.success && result.collection.getCount() > 0) {
						item.$UsrIsAdditionalAssortment = "ДА";
						this.sandbox.publish("SetRecomendationVisible");
					}
				}, this);
			},
			
			setAccountStatusUnlock:  function(prodId, callback) {
	 			var selectwithprod = this.Ext.create("Terrasoft.EntitySchemaQuery", { rootSchemaName: "Product" });
	 			selectwithprod.addColumn('UsrFormat','UsrFormat');
	 			selectwithprod.addColumn('Id','Id');
	 			selectwithprod.filters.add("contactFilter", this.Terrasoft.createColumnFilterWithParameter(
	   				this.Terrasoft.ComparisonType.EQUAL, "Id", prodId));
	 			selectwithprod.getEntityCollection(function(result)	{
	  				if(result.success) {
	   					callback(result.collection.collection.items[0].values.UsrFormat);
	  				}
	  			}, this);
			},
			checkCanDeleteCallback: function(result) {
				if (result) {
					this.showInformationDialog(resources.localizableStrings[result]);
					return;
				}

				var orderId = this.get("MasterRecordId");
				var gridData = this.getGridData();
				var items = this.getSelectedItems();
				var itemsWithIsInSet = [];
				for(var i = 0; i < items.length; i++) {
					var row = gridData.collection.getByKey(items[i]);
					if(row) {
						var isInSet = row.get("UsrIsInSet");
						if (isInSet && isInSet > 0) {
							itemsWithIsInSet.push(isInSet);
						}
					}
				}
				var self = this;
				if(itemsWithIsInSet.length > 0) {
					self.getProductsWithIsInSets(orderId, itemsWithIsInSet, self, items, function(isNeedToRemove, orderProductIdsToRemove) {
						if(isNeedToRemove && isNeedToRemove == true && orderProductIdsToRemove && orderProductIdsToRemove.length > 0) {
							self.removeOrderProducts(orderProductIdsToRemove);
						}
					}, self);
					return;
				}
				var count = items.length;
				var message = (count > 1)
					? this.get("Resources.Strings.MultiDeleteConfirmationMessage")
					: this.get("Resources.Strings.DeleteConfirmationMessage");
				this.showConfirmationDialog(message,
					function(returnCode) {
						this.onDelete(returnCode);
					},
					[this.Terrasoft.MessageBoxButtons.NO.returnCode, this.Terrasoft.MessageBoxButtons.YES.returnCode],
					null);
			},
			getProductsWithIsInSets: function(orderId, isInSetNumbers, scope, selectedItems, callback) {
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "OrderProduct"
				});
				esq.addColumn("Product.Name", "ProductName");
				esq.filters.add("orderFilter", this.Terrasoft.createColumnFilterWithParameter(
					this.Terrasoft.ComparisonType.EQUAL, "Order", orderId));
				esq.filters.add("IsInSetIdsFilter", Terrasoft.createColumnInFilterWithParameters("UsrIsInSet", isInSetNumbers));
				esq.getEntityCollection(function(response) {
					if(response && response.success && response.collection.getCount() > 0) {
						var items = response.collection.getItems();
						var message = "Обнаружен(о) комплект(и) продуктов: \r\n";
						var orderProductIdsToRemove = [];
						for(var i = 0; i < items.length; i++) {
							var productName = items[i].get("ProductName");
							var productId = items[i].get("Id");
							var isSelectedItem = false;
							for(var j = 0; j < selectedItems.length; j++) {
								if(selectedItems[j] == productId) {
									isSelectedItem = true;
								}
							}
							if(productName && productName != '' && isSelectedItem != true) {
								message+= productName + "\r\n";
							}
							orderProductIdsToRemove.push(items[i].get("Id"));
						}
						message+= "Данные позиции будут также удалены из заказа\r\n" +
							"Вы подтверждаете удаление комплекта(ов)?";
						orderProductIdsToRemove = orderProductIdsToRemove.concat(selectedItems);
						this.showConfirmationDialog(message,
							function(returnCode) {
								if(returnCode == this.Terrasoft.MessageBoxButtons.YES.returnCode) {
									return callback.call(scope, true, orderProductIdsToRemove);
								}
								else {
									return callback.call(scope, false);
								}
							},
							[scope.Terrasoft.MessageBoxButtons.NO.returnCode, scope.Terrasoft.MessageBoxButtons.YES.returnCode],
							null);
					}
				}, scope);
			},
			removeOrderProducts: function(orderProductIdsToRemove) {
				var operationKey = this.Terrasoft.generateGUID();
				var params = {
					operationKey: operationKey
				};
				var entitySchema = this.getGridEntitySchema();
				this.handlerBeforeMultiDelete(operationKey);
				var paramsJSON = this.Ext.JSON.encode(params);
				this.callService({
					serviceName: "GridUtilitiesService",
					methodName: "DeleteRecordsAsync",
					data: {
						primaryColumnValues: orderProductIdsToRemove,
						rootSchema: entitySchema.name,
						parameters: paramsJSON,
						filtersConfig: null
					}
				}, this.onDeletedSameIsInSet, this);
			},
			onDeletedSameIsInSet: function() {
				this.hideBodyMask();
				this.reloadGridData();
			},
			generateActiveRowControlsConfig: function(id, columnsConfig, rowConfig) {
				this.columnsConfig = columnsConfig;
				var gridLayoutItems = [];
				var currentColumnIndex = 0;
				this.Terrasoft.each(columnsConfig, function(columnConfig) {
					var columnName = columnConfig.key[0].name.bindTo;
					var column = this.getColumnByColumnName(columnName);
					var cellConfig = this.getCellControlsConfig(column);
					cellConfig = this.Ext.apply({
						layout: {
							colSpan: columnConfig.cols,
							column: currentColumnIndex,
							row: 0,
							rowSpan: 1
						}
					}, cellConfig);
					if (!column) {
						this.applyVirtualColumnsConfig(columnName, cellConfig);
					}
					if(columnName) {
						cellConfig.enabled = false;
					}
					gridLayoutItems.push(cellConfig);
					currentColumnIndex += columnConfig.cols;
				}, this);
				var gridData = this.getGridData();
				var activeRow = gridData.get(id);
				var rowClass = {prototype: activeRow};
				BusinessRulesApplier.applyRules(rowClass, gridLayoutItems);
				var viewGenerator = this.Ext.create("Terrasoft.ViewGenerator");
				viewGenerator.viewModelClass = {prototype: this};
				var gridLayoutConfig = viewGenerator.generateGridLayout({
					name: this.name,
					items: gridLayoutItems
				});
				rowConfig.push(gridLayoutConfig);
			},

		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "move",
				"name": "AddRecordButton",
				"parentName": "Detail",
				"propertyName": "tools",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"click": {"bindTo": "addRecord"},
					"visible": false,
					"enabled": {"bindTo": "getAddRecordButtonEnabled"},
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"}
				}
			},
		]/**SCHEMA_DIFF*/
	};
});
