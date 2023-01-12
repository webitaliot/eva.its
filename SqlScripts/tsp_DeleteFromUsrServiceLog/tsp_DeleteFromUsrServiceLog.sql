IF OBJECT_ID('tsp_DeleteFromUsrServiceLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromUsrServiceLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromUsrServiceLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [UsrServiceLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO