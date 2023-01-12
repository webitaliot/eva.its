IF OBJECT_ID('tsp_DeleteFromCaseFile', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromCaseFile]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromCaseFile]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [CaseFile] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO