IF OBJECT_ID('tsp_DeleteFromUsrIntegrationLogFtp', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromUsrIntegrationLogFtp]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromUsrIntegrationLogFtp]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [UsrIntegrationLogFtp] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO