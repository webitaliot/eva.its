define("UsrCustomLookupPage", ["LookupPage", "LookupPageViewGenerator", "LookupPageViewModelGenerator",
"ProcessModuleUtilities", "LookupUtilities", "css!LookupPageCSS"],
	function(LookupPage, LookupPageViewGenerator, LookupPageViewModelGenerator, ProcessModuleUtilities) {
		return Ext.define("Terrasoft.configuration.UsrCustomLookupPage", {
			alternateClassName: "Terrasoft.KmGMSLookupPage",
			extend: "Terrasoft.LookupPage",
			gridWrapClasses: ["custom-lookup-control"],
			//Переопределяем метод в котором мы можем управлять сформированной конфигурацией до рендеринга.
			renderLookupView: function(schema, profile) {
				var config = this.getLookupConfig(schema, profile);
				var topPanelConfig = LookupPageViewGenerator.generateFixed(config);
				//----------------------- инъекция логики (начало) ----------------------
				var buttonsConfig;
				//Получаем ссылку на аттрибут-массив конфигурационных объектов-кнопок
				//Используем Underscore.some с возможностью прерывания переборы по возврату от предиката "true"
				_.some(topPanelConfig.items, function(target) {
					//выделяем объект группы кнопок (Wrapper) по id контейнера
					if (target.id === "selectionControlsContainerLookupPage") {
						//в нем ищем подчиненные объекты являющиеся массивом
						_.some(target, function(target) {
								//согласно структуры конфигурационного объекта панели
								//"чистым" массивом является только объект с конфигами кнопок
							if (Array.isArray(target)) {
								//сохраняем ссылку на него в переменной для дальнейшего использования
								buttonsConfig = target;
								//Прерываем перебор
								return true;
							}
						});
						//Прерываем перебор
						return true;
					}
				});
				//Поиск конфигурационного объекта кнопки "Выбрать" в искомом массиве по caption
				_.some(buttonsConfig, function(target) {
					if (target.caption === "Выбрать") {
						//В найденном объекте меняем значение аттрибута caption на "Создать тендеры".
						target.caption = "Создать тендеры";
						return true;
					}
				});
				//Поиск конфигурационного объекта кнопки "Добавить" в искомом массиве по caption
				_.some(buttonsConfig, function(target) {
					if (target.caption === "Добавить") {
						//В найденном объекте меняем значение аттрибута caption на "Создать тендеры".
						target.caption = "Создать запрос";
						//Удаляем тег стандартного действия "Создать запись" (add)
						//исключая навешивания стандартного обработчика в viewmodel генераторе 
						delete target.tag;
						//Устанавливаем совой обработчик
						target.click = {
							bindTo: "AddRequestButton"
						};
						return true;
					}
				});
				//Поиск конфигурационного объекта кнопки "Добавить" в искомом массиве по caption
				_.some(buttonsConfig, function(target) {
					if (target.caption === "Действия") {
						//В найденном объекте меняем значение аттрибута visible на "false"
						//тем самым скрывая кнопку-меню
						target.visible = false;
						return true;
					}
				});
				//----------------------- инъекция логики (конец) ----------------------
				this.renderLookupControls(config, topPanelConfig);
			},
			
			//view будет выполнять в другом контексте и чтобы расширить его своим методом:
			//Переопределяем метод в котором мы можем расширить viewModelConfig собственным методом.
			generateViewModel: function() {
				var viewModelConfig = LookupPageViewModelGenerator.generate(this.lookupInfo);
				if (!this.lookupInfo.columnValue && this.lookupInfo.searchValue) {
					viewModelConfig.values.searchData = this.lookupInfo.searchValue;
					viewModelConfig.values.previousSearchData = this.lookupInfo.searchValue;
				}
				//----------------------- инъекция логики (начало) ----------------------
				//Добавляем свой пользовательский метод
				viewModelConfig.methods.AddRequestButton = function() {
					//Проброшенный через конфиг страницы Id связанного Проекта
					var associatedProjectId = this.values.LookupInfo.associatedProjectId;
					//Вызываем БП
					var args = {
						sysProcessName: "CreateNewRequestFromProject",
						parameters: {
							ProjectId: associatedProjectId
						}
					};
					ProcessModuleUtilities.executeProcess(args);
					this.close();
				};
				//----------------------- инъекция логики (конец) ----------------------
				var viewModel = this.Ext.create("Terrasoft.BaseViewModel", viewModelConfig);
				viewModel.Ext = this.Ext;
				viewModel.sandbox = this.sandbox;
				viewModel.Terrasoft = this.Terrasoft;
				if (this.lookupInfo.updateViewModel) {
					this.lookupInfo.updateViewModel.call(viewModel);
				}
				viewModel.initCaptionLookup();
				viewModel.initHasActions();
				viewModel.initLoadedColumns();
				if (!this.Ext.isEmpty(this.lookupInfo.filterObjectPath)) {
					viewModel.updateFilterByFilterObjectPath(this.lookupInfo.filters, this.lookupInfo.filterObjectPath);
				}
				if (this.lookupInfo.hideActions) {
					viewModel.set("hasActions", false);
				}
				return viewModel;
			}
		});
	}
);