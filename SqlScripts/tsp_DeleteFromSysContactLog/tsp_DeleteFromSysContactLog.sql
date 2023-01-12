IF OBJECT_ID('tsp_DeleteFromSysContactLog', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysContactLog]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysContactLog]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysContactLog] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO