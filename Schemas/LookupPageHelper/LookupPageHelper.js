define("LookupPageHelper", ["GridUtilities", "GridProfileHelper"],
	function (GridUtilities) {
		Ext.define("Terrasoft.configuration.LookupPageHelper", {
			override: "Terrasoft.LookupPage",
			initSelectSortingFromProfile: function (select, columnsSettingsProfile, profileSortedColumns) {
				var collectionColumns = null;
				if (this.esqConfig && this.esqConfig.sort && this.esqConfig.sort.columns) {
					collectionColumns = this.esqConfig.sort.columns;
				}
				var defaultSortedColumn = {};
				var predefinedMaxOrderPosition = -1;
				var profileColumns = [];
				Terrasoft.each(profileSortedColumns, function (item) {
					profileColumns.push(item.name)
				});
				select.columns.collection.each(function (item) {
					if (item && Ext.isNumber(item.orderPosition) && item.orderPosition > predefinedMaxOrderPosition &&
						profileColumns.filter(function (columnName) {
							return columnName == item.columnPath;
						}).length <= 0) {
						predefinedMaxOrderPosition = item.orderPosition + 1;
					}
				}, this);
				if (!Terrasoft.isEmptyObject(profileSortedColumns)) {
					Terrasoft.each(profileSortedColumns, function (profileSortedColumn, key) {
						var sortedColumn = select.columns.collection.get(key);
						sortedColumn.orderPosition = profileSortedColumn.orderPosition + predefinedMaxOrderPosition;
						sortedColumn.orderDirection = profileSortedColumn.orderDirection;
					}, this);
					return true;
				} else if (collectionColumns) {
					Terrasoft.each(collectionColumns, function (item) {
						var column;
						if (select.columns.contains(item.name)) {
							column = select.columns.get(item.name);
						} else {
							column = select.addColumn(item.name);
						}
						column.orderPosition = item.orderPosition + predefinedMaxOrderPosition;
						column.orderDirection = item.orderDirection;
						defaultSortedColumn = column;
						defaultSortedColumn.position = select.columns.indexOf(column) - 1;
					}, this);
					if (defaultSortedColumn.columnPath) {
						var caption = GridUtilities.getColumnCaption(
							this.entitySchema.columns[defaultSortedColumn.columnPath].caption,
							defaultSortedColumn.orderDirection
						);
						this.set("sortColumnIndex", defaultSortedColumn.position);
						this.set("gridSortDirection", defaultSortedColumn.orderDirection);
						this.set(defaultSortedColumn.columnPath + "_SortedColumnCaption", caption);
						defaultSortedColumn = {};
					}
					return true;
				}
				return false;
			},
			initSelectSorting: function (select) {
				this.callParent(arguments);
				this.initSelectSortingFromProfile.apply(this, arguments);
			},
			generateViewModel: function () {
				var viewModel = this.callParent(arguments);
				var parentInitSelectSorting = viewModel.initSelectSorting;
				viewModel.initSelectSorting = this.initSelectSorting;
				viewModel.initSelectSorting.$previous = parentInitSelectSorting;
				viewModel.initSelectSortingFromProfile = this.initSelectSortingFromProfile;
				return viewModel;
			}
		});
	});
