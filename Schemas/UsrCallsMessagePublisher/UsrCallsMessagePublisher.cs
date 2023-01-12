using System.Collections.Generic;
using Terrasoft.Core;

namespace Terrasoft.Configuration
{
    // Класс-наследник BaseMessagePublisher.
    public class CallsMessagePublisher : BaseMessagePublisher
    {
        // Конструктор класса.
        public CallsMessagePublisher(UserConnection userConnection, Dictionary<string, string> entityFieldsData)
            : base(userConnection, entityFieldsData) {
            //Схема, с которой будет работать CallsMessagePublisher.
            EntitySchemaName = "Activity";
        }
    }
}