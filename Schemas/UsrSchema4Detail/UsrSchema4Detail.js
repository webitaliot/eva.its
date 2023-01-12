define("UsrSchema4Detail", ["LookupMultiAddMixin"], function() {
	return {
		entitySchemaName: "UsrReasonForComplaint",
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
		mixins: {
            // Подключение миксина к схеме.
            LookupMultiAddMixin: "Terrasoft.LookupMultiAddMixin"
            //для тесту
        },
		methods: {
            // Переопределение базового метода инициализации схемы.
            init: function() {
                this.callParent(arguments);
                //Инициализация миксина.
                this.mixins.LookupMultiAddMixin.init.call(this);
            },
            // Переопределение базового метода отображения кнопки добавления.
            getAddRecordButtonVisible: function() {
                //Отображать кнопку добавления если деталь развернута, даже если для детали не реализована страница редактирования.
                return this.getToolsVisible();
            },
            // Переопределение базового метода.
            // Обработчик события сохранения страницы редактирования детали.
            onCardSaved: function() {
                // Открывает справочное окно с множественным выбором записей.
                this.openLookupWithMultiSelect();
            },
            // Переопределение базового метода добавления записи на деталь.
            addRecord: function() {
                // Открывает справочное окно с множественным выбором записей.
                this.openLookupWithMultiSelect(true);
            },
            // Метод, возвращающий конфигурационный объект для справочного окна.
            getMultiSelectLookupConfig: function() {
                return {
                    // Корневая схема — [Продажа].
                    rootEntitySchemaName: "Activity",
                    // Колонка корневой схемы.
                    rootColumnName: "UsrActivity",
                    // Связанная схема — [Контакт].
                    relatedEntitySchemaName: "UsrReasonForComplaintLookup",
                    // Колонка связанной схемы.
                    relatedColumnName: "UsrCompReason"
                };
            }
		}
	};
});
