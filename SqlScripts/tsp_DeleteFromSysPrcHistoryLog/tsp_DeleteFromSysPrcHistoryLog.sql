IF OBJECT_ID('tsp_DeleteFromSysPrcHistoryLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysPrcHistoryLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysPrcHistoryLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysPrcHistoryLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO