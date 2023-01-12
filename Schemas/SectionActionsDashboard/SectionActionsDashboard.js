define("SectionActionsDashboard", ["SectionActionsDashboardResources", "UsrCallsMessagePublisherModule"],
    function(resources) {
        return {
            attributes: {},
            messages: {},
            methods: {
                // Метод задает настройки отображения вкладки канала в панели действий.
                getExtendedConfig: function() {
                    // Вызов родительского метода.
                    var config = this.callParent(arguments);
	                    var lczImages = resources.localizableImages;
                    config.CallsMessageTab = {
                        // Изображение вкладки.
                        "ImageSrc": this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.ImageListSchemaItem2")),
                        // Значение маркера.
                        "MarkerValue": "calls-message-tab",
                        // Выравнивание.
                        "Align": this.Terrasoft.Align.RIGHT,
                        // Тэг.
                        "Tag": "UsrCalls"
                    };
                    return config;
                },
                // Переопределяет родительский и добавляет значение контакта из страницы редактирования
                // раздела, в котором находится панель действий.
                onGetRecordInfoForPublisher: function() {
                    var info = this.callParent(arguments);
                    info.additionalInfo.contact = this.getContactEntityParameterValue(info.relationSchemaName);
                    return info;
                },
                // Определяет значение контакта из страницы редактирования раздела,
                // в котором находится панель действий.
                getContactEntityParameterValue: function(relationSchemaName) {
                    var contact;
                    if (relationSchemaName === "Contact") {
                        var id = this.getMasterEntityParameterValue("Id");
                        var name = this.getMasterEntityParameterValue("Name");
                        if (id && name) {
                            contact = {value: id, displayValue: name};
                        }
                    } else {
                        contact = this.getMasterEntityParameterValue("Contact");
                    }
                    return contact;
                },
                //Добавляет созданный канал в список издателей сообщений.
                getSectionPublishers: function() {
                    var publishers = this.callParent(arguments);
                    publishers.push("UsrCalls");
                    return publishers;
                },
                
                /**
			 * Sets displayColor and hoverColor properties for all actions.
			 * @protected
			 * @param {Terrasoft.BaseViewModelCollection} actions Collection of stage control items.
			 */
			setActionsColor: function(actions) {
				const currentAction = this.get("ActiveAction");
				if (this.isEmpty(currentAction)) {
					return;
				}
				const currentActionColor = currentAction.get("Color");
				const currentActionIndex = this.getActionIndex(currentAction, actions);
				this.iterateActions(actions, function(item, index) {
					if (index <= currentActionIndex) {
						item.set("DisplayColor", currentActionColor);
					} else if(item.get("Id") === "3859c6e7-cbcb-486b-ba53-77808fe6e593"){
						item.set("DisplayColor", "#ffa500");
					} else {
						item.set("DisplayColor", "");
					}
					const hoverColor = Terrasoft.shadeColor(currentActionColor, 0.5);
					item.set("HoverColor", hoverColor);
				});
			},
            },
            // Массив модификаций, с помощью которых строится представление модуля в интерфейсе системы.
            diff: /**SCHEMA_DIFF*/[
                // Добавление вкладки CallsMessageTab.
                {
                    // Тип операции — вставка.
                    "operation": "insert",
                    // Название вкладки.
                    "name": "CallsMessageTab",
                    // Название родительского элемента.
                    "parentName": "Tabs",
                    // Название свойства.
                    "propertyName": "tabs",
                    // Конфигурационный объект свойств.
                    "values": {
                        // Массив дочерних элементов.
                        "items": []
                    }
                },
                // Добавление контейнера сообщений.
                {
                    "operation": "insert",
                    "name": "CallsMessageTabContainer",
                    "parentName": "CallsMessageTab",
                    "propertyName": "items",
                    "values": {
                        // Тип элемента — контейнер.
                        "itemType": this.Terrasoft.ViewItemType.CONTAINER,
                        // CSS-класс для контейнера.
                        "classes": {
                            "wrapClassName": ["calls-message-content"]
                        },
                        "items": []
                    }
                },
                // Добавление модуля UsrCallsMessageModule.
                {
                    "operation": "insert",
                    "name": "UsrCallsMessageModule",
                    "parentName": "CallsMessageTab",
                    "propertyName": "items",
                    "values": {
                        // CSS-класс для модуля вкладок.
                        "classes": {
                            "wrapClassName": ["calls-message-module", "message-module"]
                        },
                        // Тип элемента — модуль.
                        "itemType": this.Terrasoft.ViewItemType.MODULE,
                        // Название модуля.
                        "moduleName": "UsrCallsMessagePublisherModule",
                        // Привязка метода, выполняемого после отрисовки элемента.
                        "afterrender": {
                            "bindTo": "onMessageModuleRendered"
                        },
                        // Привязка метода, выполняемого после перерисовки элемента.
                        "afterrerender": {
                            "bindTo": "onMessageModuleRendered"
                        }
                    }
                }
            ]/**SCHEMA_DIFF*/
        };
    }
);