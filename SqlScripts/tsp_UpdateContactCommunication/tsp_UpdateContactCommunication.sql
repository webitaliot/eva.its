IF OBJECT_ID('tsp_UpdateContactCommunication', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_UpdateContactCommunication]
GO

CREATE PROCEDURE [dbo].[tsp_UpdateContactCommunication]
AS  
BEGIN
	BEGIN TRY
		BEGIN TRAN
			BEGIN
				DECLARE @ErrorMessage nvarchar(max)	
				DECLARE @ContactId [uniqueidentifier]
				DECLARE @MobilePhone VARCHAR(250)
				DECLARE @Email VARCHAR(250)

				DECLARE ContactCommunication_Cursor CURSOR FOR  
				SELECT Id 
				FROM Contact as c


				OPEN ContactCommunication_Cursor   
				FETCH NEXT FROM ContactCommunication_Cursor INTO @ContactId

				WHILE @@FETCH_STATUS = 0   
				BEGIN   
						SET @MobilePhone = (select top(1) MobilePhone from Contact where Id = @ContactId)
						SET @Email = (select top(1) Email from Contact where Id = @ContactId)
						IF NOT EXISTS(SELECT * FROM ContactCommunication WHERE Number = @MobilePhone)
							INSERT INTO ContactCommunication (CommunicationTypeId, ContactId, Number) values ('D4A2DC80-30CA-DF11-9B2A-001D60E938C6', @ContactId, @MobilePhone)
						IF NOT EXISTS(SELECT * FROM ContactCommunication WHERE Number = @Email)
							INSERT INTO ContactCommunication (CommunicationTypeId, ContactId, Number) values ('EE1C85C3-CFCB-DF11-9B2A-001D60E938C6', @ContactId, @Email)
						FETCH NEXT FROM ContactCommunication_Cursor INTO @ContactId     
				END   

				CLOSE ContactCommunication_Cursor   
				DEALLOCATE ContactCommunication_Cursor
			END
		COMMIT
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0 ROLLBACK
		SELECT ERROR_MESSAGE() AS ErrorMessage;
		SET @ErrorMessage = ERROR_MESSAGE()
		INSERT INTO UsrIntegrationLogFtp (UsrName, UsrErrorDescription) VALUES ('UpdateContactCommunication', @ErrorMessage)
	END CATCH
END
GO 