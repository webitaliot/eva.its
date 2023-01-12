define("ClientMessageBridge", ["ConfigurationConstants"],
    function(ConfigurationConstants) {
        return {
            // Сообщения.
            messages: {
                //Имя сообщения.
                "ChangeAnotherVis": {
                    "mode": Terrasoft.MessageMode.BROADCAST,
                    "direction": Terrasoft.MessageDirectionType.PUBLISH
                }
            },
            methods: {
                init: function() {
                    this.callParent(arguments);
                    this.addMessageConfig({
                        // Имя сообщения, получаемого по WebSocket.
                        sender: "ChangeAnotherVis",
                        // Имя сообщения с которым оно будет разослано внутри системы.
                        messageName: "ChangeAnotherVis"
                    });
                },
                // Метод, выполняемый после публикации сообщения.
                afterPublishMessage: function(
                    // Имя сообщения с которым оно было разослано внутри системы.
                    sandboxMessageName,
                    // Содержимое сообщения.
                    webSocketBody,
                    // Результат отправки сообщения.
                    result,
                    // Конфигурационный объект рассылки сообщения.
                    publishConfig) {
                    // Проверка, что сообщение соответствует добавленному в конфигурационный объект.
                    if (sandboxMessageName === "ChangeAnotherVis") {
                       
                        // Вывод содержимого в консоль браузера.
                        window.console.info("OK");
                    }
                }
            }
        };
    });