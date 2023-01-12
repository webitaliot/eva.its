IF OBJECT_ID('tsp_DeleteFromUsrWebitelLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromUsrWebitelLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromUsrWebitelLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [UsrWebitelLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO