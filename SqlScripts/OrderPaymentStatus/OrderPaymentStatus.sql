if not exists(select Id from OrderPaymentStatus where Name = 'Не оплачен')
begin
	update OrderPaymentStatus set Name = 'Не оплачен', [Description] = 'Заказ ожидает оплаты' where Id = '448D1338-D3A5-4FD4-9A6E-769403F89896'
end
if not exists(select Id from OrderPaymentStatus where Name = 'Оплачен')
begin
	update OrderPaymentStatus set Name = 'Оплачен', [Description] = 'Заказ оплачен' where Id = '4721338E-A5F1-4529-96BE-D3F311518812'
end