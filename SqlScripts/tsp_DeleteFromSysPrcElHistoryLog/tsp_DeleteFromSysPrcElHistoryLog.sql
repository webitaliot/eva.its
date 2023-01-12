IF OBJECT_ID('tsp_DeleteFromSysPrcElHistoryLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysPrcElHistoryLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysPrcElHistoryLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysPrcElHistoryLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO