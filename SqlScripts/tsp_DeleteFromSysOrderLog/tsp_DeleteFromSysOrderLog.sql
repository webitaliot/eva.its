IF OBJECT_ID('tsp_DeleteFromSysOrderLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysOrderLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysOrderLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysOrderLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO