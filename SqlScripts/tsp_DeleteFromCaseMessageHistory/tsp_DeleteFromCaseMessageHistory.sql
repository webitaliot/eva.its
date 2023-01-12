IF OBJECT_ID('tsp_DeleteFromCaseMessageHistory', 'P') IS NOT NULL
	DROP PROCEDURE [dbo].[tsp_DeleteFromCaseMessageHistory]
GO
CREATE PROCEDURE [dbo].[tsp_DeleteFromCaseMessageHistory]
AS
	BEGIN
		BEGIN
			DELETE 
			FROM [CaseMessageHistory] 
			WHERE DATEADD(year, 1, [CreatedOn]) < getdate()
		END;
	END
GO