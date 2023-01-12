namespace Terrasoft.Configuration.UsrNightProductImportFromFTP
{
    using System;
    using System.Net;
    using System.Data;
    using System.Linq;
    using System.IO;
    using System.IO.Compression;
    using System.ServiceModel;
    using System.ServiceModel.Activation;
    using System.ServiceModel.Web;
    using System.Web;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using System.Collections.Generic;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
    using DocumentFormat.OpenXml;
    using DocumentFormat.OpenXml.Packaging;
    using DocumentFormat.OpenXml.Spreadsheet;
    using Column = Terrasoft.Core.DB.Column;
    using System.Globalization;
    using System.Text.RegularExpressions;
    using FileHelpers;
    
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrNightProductImportFromFTP
    {
    	public AppConnection appConnection;
        public UserConnection userConnection;
        
		Response responseFtp = new Response();
		
		public string ftpHost = "";
		public string ftpUserName = "";
		public string ftpPassword = "";
		public string ftpFolder = "";
        public string pathToFolderInSQL = "";
		
        private const string fileName = "RUSH_Catalogs_";
		
    	public UsrNightProductImportFromFTP(UserConnection userConnection)
    	{
        	this.userConnection = userConnection;
        	ftpHost = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPHost"));
        	ftpUserName = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPUserName"));
        	ftpPassword = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPPassword"));
        	ftpFolder = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrPathToFolderIN"));
            pathToFolderInSQL = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrPathToFolderInSQL"));
        }
    	
        [WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
        RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        public string UploadFromFTP()
        {
			var pathRUSH_Prods = "";
			var countOfProducts = 0;
        	try
        	{
        		string startTime = DateTime.Now.ToString("dd'.'MM'.'yyyy HH':'mm':'ss");
        		ITSLogger.LogError(userConnection, "UsrLogNumerator", "INF", "", "Integration Start at " + startTime);
        		IsDirectoryExist(pathToFolderInSQL);
            	List<string> archiveFiles = new List<string>();
            	try
            	{
            		archiveFiles = GetArchiveListDirectoryContentsWithFTP(ftpHost, ftpUserName, ftpPassword, ftpFolder);
            	}
            	catch(Exception e)
            	{
            		ITSLogger.LogError(userConnection, "UsrLogNumerator", "ERR", "", "Problems with GetArchiveListDirectory " + startTime);
            	}
            	var archiveFileName = GetFileName(archiveFiles, fileName);
            	var responseDownload = new Response(); 
            	try
            	{
            		responseDownload = GetDownloadArchiveFileWithFTP(ftpHost, ftpUserName, ftpPassword, ftpFolder, archiveFileName, pathToFolderInSQL);
            	}
            	catch(Exception e)
            	{
            		ITSLogger.LogError(userConnection, "UsrLogNumerator", "ERR", "", "Problems with GetDownloadArchiveFile " + e);
            	}
                if (responseDownload.Success && responseDownload.Path != String.Empty)
                {
                    var unZipPath = "";
                    try
                    {
                    	/*DirectoryInfo dirInfo = new DirectoryInfo(@"D:\bak\temp\FTPImport\UnZip\RUSH_Catalogs_2019_01_09\");
						foreach (FileInfo file in dirInfo.GetFiles())
						{
						    file.Delete();
						}*/
                    	unZipPath = UnZipFile(responseDownload.Path, pathToFolderInSQL);
                    }
                    catch(Exception e)
                    {
                    	ITSLogger.LogError(userConnection, "UsrLogNumerator", "ERR", "", "Something went wrong with UnZipFile: " + e);
                    }
                    if (unZipPath != String.Empty)
                    {
						string[] dirs = Directory.GetFiles(unZipPath, "*Prods*", SearchOption.AllDirectories);
						for(int i=0; i<dirs.Length; i++)
						{
							pathRUSH_Prods = dirs[i] + " ";
						}
						var engine = new FileHelperEngine<Product>();
						var result = engine.ReadFile(pathRUSH_Prods);
						for(int i = 0; i < result.Length; i++)
						{
							var esqProduct = new EntitySchemaQuery(userConnection.EntitySchemaManager, "Product");
			        		esqProduct.AddColumn("Code");
			        		var esqFilterProduct = esqProduct.CreateFilterWithParameters(FilterComparisonType.Equal, "Code", result[i].Code);
			            	esqProduct.Filters.Add(esqFilterProduct);
			            	var entitiesProduct = esqProduct.GetEntityCollection(userConnection);
			            	if(entitiesProduct.Count == 0)
			            	{
			            		Guid product_Id = Guid.NewGuid();
			            		var entityProduct = userConnection.EntitySchemaManager.GetInstanceByName("Product").CreateEntity(userConnection);
			            		entityProduct.SetDefColumnValues();
			            		entityProduct.SetColumnValue("Id", product_Id);
		            			entityProduct.SetColumnValue("Code", result[i].Code);
			            		entityProduct.SetColumnValue("Name", result[i].Name);
			            		entityProduct.Save(false);
			            		countOfProducts++;
			            	}
						}
                    }
                }
                else
                {
                	responseFtp.Success = false;
                }
        	}
        	catch (Exception ex)
        	{
        		ITSLogger.LogError(userConnection, "UsrLogNumerator", "ERR", "", "Something went wrong: " + ex);
        	}
        	string endTime = DateTime.Now.ToString("dd'.'MM'.'yyyy HH':'mm':'ss");
        	ITSLogger.LogError(userConnection, "UsrLogNumerator", "INF", "", "Integration End at " + endTime + " Count of insert products : " + countOfProducts);
        	return pathRUSH_Prods;
        }
        
        
        public void IsDirectoryExist(string pathToFolderInSQL) 
        {
        	var pathToFTPImportDirectory = pathToFolderInSQL + @"FTPImport";
            bool directoryExists = Directory.Exists(pathToFTPImportDirectory);
            if (directoryExists)
            {
                Directory.Delete(pathToFTPImportDirectory, true);
            }
        }

        public static List<string> GetArchiveListDirectoryContentsWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder)
        {
        	List<string> filesFtp = new List<string>();
        	
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpHost + ftpFolder);
            request.Method = WebRequestMethods.Ftp.ListDirectory;
            request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);
            
            FtpWebResponse response = (FtpWebResponse)request.GetResponse();
            Stream responseStream = response.GetResponseStream();
            StreamReader reader = new StreamReader(responseStream);
            while (!reader.EndOfStream)
            {
                filesFtp.Add(reader.ReadLine());
            }
            reader.Close();
            response.Close();
            return filesFtp;  
        }

        public static string GetFileName(List<string> files, string fileName)
        {
            DateTime maxDate;
            List<DateTime> dateFiles = new List<DateTime>();
            var regex = new Regex(@"\d{4}_\d{2}_\d{2}");
            foreach (var f in files)
            {
                foreach (Match m in regex.Matches(f))
                {
                    DateTime dt;
                    if (DateTime.TryParseExact(m.Value, "yyyy_MM_dd", null, DateTimeStyles.None, out dt))
                    {
                        dateFiles.Add(dt);
                    }
                }
            }
            maxDate = dateFiles.Max();
            return fileName = fileName + maxDate.ToString("yyyy_MM_dd") + ".zip";
        }

        public Response GetDownloadArchiveFileWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder, string archiveFileName, string pathToFolderInSQL)
        {  
            string pathZip = System.IO.Path.Combine(pathToFolderInSQL, "FTPImport\\" + "Zip\\");
            System.IO.Directory.CreateDirectory(pathZip);
            string savePathFile = pathZip + archiveFileName;
            try
            {
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpHost + ftpFolder + archiveFileName);
                request.Method = WebRequestMethods.Ftp.DownloadFile;
                request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);
                FtpWebResponse response = (FtpWebResponse)request.GetResponse();

                Stream responseStream = response.GetResponseStream();

                using (Stream s = File.Create(savePathFile))
                {
                    responseStream.CopyTo(s);
                }
                responseFtp.Success = true;
                responseFtp.Path = savePathFile;
            }
            catch (Exception ex)
            {
                responseFtp.Success = false;
                responseFtp.Error = ex.Message;
                ITSLogger.LogError(userConnection, "UsrLogNumerator", "INF", "", "Problems with downloading archive " + ex);
            }
            return responseFtp;
        }
		
		public string UnZipFile(string pathUnZipFolder, string pathToFolderInSQL)
        {
            string tempPeth = Path.GetTempPath();
            string pathUnZip = System.IO.Path.Combine(pathToFolderInSQL, "FTPImport\\" + "UnZip\\");
            System.IO.Directory.CreateDirectory(pathUnZip); 
            string removePathFolder = (pathUnZipFolder.Remove(pathUnZipFolder.LastIndexOf("\\RUSH")));
            ZipFile.ExtractToDirectory(pathUnZipFolder, pathUnZip);
            Directory.Delete(removePathFolder, true);
            return pathUnZip;
        }
    }
    
    [DelimitedRecord(";")]
    public class Product 
    {
    	public string Code {get; set;}
    	public string Name {get; set;}
    	public string Barcode {get; set;}
    	public string Temp {get; set;}
    }

    public class Response
    {
        public bool Success { get; set; }
        public string Error { get; set; }
        public string Path { get; set; }
    }
}
