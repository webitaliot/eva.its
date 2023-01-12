DECLARE @ErrorMessage nvarchar(max)	
BEGIN TRY
	BEGIN TRAN
	BEGIN
		;with a as(
			select t.d from (
				select ROW_NUMBER ( ) OVER ( PARTITION BY c.UsrMemberIdPL order by id)   as d
				from Contact as c
				where not exists (select * from [Case] as c1 where c1.ContactId = c.id)  and 
			not exists (select * from SysAdminUnit as s where s.ContactId = c.id)
			) as t
			where t.d > 1
		)
		delete top(46)from a 
		INSERT INTO UsrIntegrationLogFtp (UsrName, UsrErrorDescription) VALUES ('Duplicate delete', 'true')
	END
	COMMIT
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0 ROLLBACK
	SELECT ERROR_MESSAGE() AS ErrorMessage;
	SET @ErrorMessage = ERROR_MESSAGE()
	INSERT INTO UsrIntegrationLogFtp (UsrName, UsrErrorDescription) VALUES ('Duplicate delete', @ErrorMessage)
END CATCH