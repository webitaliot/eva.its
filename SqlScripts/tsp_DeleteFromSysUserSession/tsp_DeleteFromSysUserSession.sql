IF OBJECT_ID('tsp_DeleteFromSysUserSession', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromSysUserSession]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromSysUserSession]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [SysUserSession] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO