IF OBJECT_ID('tsp_DeleteFromSysCaseLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysCaseLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysCaseLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysCaseLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO