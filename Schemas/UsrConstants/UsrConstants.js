define("UsrConstants", [], function() {
    var country = {
        'Ukraine': 'a470b005-e8bb-df11-b00f-001d60e938c6'
    }
    var Case = {
        Status: {
            InWork: {
                value: "7e9f1204-f46b-1410-fb9a-0050ba5d6c38"
            },
            Resolved: {
                value: "ae7f411e-f46b-1410-009b-0050ba5d6c38"
            },
            WaitingResponse: {
                value: "3859c6e7-cbcb-486b-ba53-77808fe6e593"
            }
        },
        ServiceItem: {
            OnExpertKC: {
                value: "67dedf73-72c5-4f2e-ab71-8afd7baa8eb7"
            }
        }
    }
    var Order = {
        Status: {
            Assembled: { value: "81e1838b-9a0b-4d37-b6e9-5c7fa17a7821"}
        }
    }
    return {
        County: country,
        Case: Case,
        Order: Order
    };
});
