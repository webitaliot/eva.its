define("UsrCallsMessagePublisherModule", ["BaseMessagePublisherModule"],
    function() {
        // Определение класса.
        Ext.define("Terrasoft.configuration.UsrCallsMessagePublisherModule", {
            // Базовый класс.
            extend: "Terrasoft.BaseMessagePublisherModule",
            // Сокращенное имя класса.
            alternateClassName: "Terrasoft.UsrCallsMessagePublisherModule",
            // Инициализация страницы, которая будет отрисовываться в данном модуле.
            initSchemaName: function() {
                this.schemaName = "UsrCallsMessagePublisherPage";
            }
        });
        // Возвращает объект класса, определенного в модуле.
        return Terrasoft.UsrCallsMessagePublisherModule;
    });