namespace Terrasoft.Configuration.UsrUploadFilesFromFtpFolderOut
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
	using Terrasoft.Configuration.UsrUploadFilesFromFtpFolderOut;
	
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	class UploadOrdersHeaders : UploadFromFtpFolderOut
	{
		public AppConnection appConnection;
		public UserConnection userConnection;
		
		private const string fileName = "Headers.csv";
		public string ftpHost = "";
		public string ftpUserName = "";
		public string ftpPassword = "";
		public string ftpFolderOut = "";
		public DateTime uploadDate = DateTime.Now;
		public UploadOrdersHeaders(UserConnection userConnection)
		{
			//appConnection = HttpContext.Current.Application["AppConnection"] as AppConnection;
			//userConnection = appConnection.SystemUserConnection;
			this.userConnection = userConnection;
			ftpHost = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPHost"));
			ftpUserName = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPUserName"));
			ftpPassword = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrFTPPassword"));
			ftpFolderOut = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrPathToFolderOut"));
		}
		
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
		RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public void StartUploadOrdersHeaders()
		{
			try
			{
				var filesList = GetListDirectoryContentsWithFTP(ftpHost, ftpUserName, ftpPassword, ftpFolderOut);
				//var fileName = GetLastFileName(filesList);
				byte[] fileByteArray;
				foreach(var file in filesList)
				{
					fileByteArray = GetDownloadFileWithFTP(ftpHost, ftpUserName, ftpPassword, ftpFolderOut, file);
					ParseFileByteArray(fileByteArray);
					DeleteFileOnFTP(ftpHost, ftpUserName, ftpPassword, ftpFolderOut, file);
				}
			}
			catch (Exception ex)
			{
				var errorMessage = ex.Message;
				InsertErrorMessage(errorMessage);
			}
		}
		
		public override List<string> GetListDirectoryContentsWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder)
		{
			List<string> filesFtp = new List<string>();
			FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpHost + ftpFolder + "Orders/");
			request.Method = WebRequestMethods.Ftp.ListDirectory;
			request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);

			FtpWebResponse response = (FtpWebResponse)request.GetResponse();
			Stream responseStream = response.GetResponseStream();
			StreamReader reader = new StreamReader(responseStream);
			while (reader.Peek()>=0)
			{
				filesFtp.Add(reader.ReadLine());
			}
			reader.Close();
			response.Close();
			return filesFtp;
		}
		public override string GetLastFileName (List<string> files)
		{
			var fileName = "Status.csv";
			DateTime maxDate;
			List<DateTime> dateFiles = new List<DateTime>();
			var regex = new Regex(@"\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}");
			foreach (var f in files)
			{
				foreach (Match m in regex.Matches(f))
				{
					DateTime dt;
					if (DateTime.TryParseExact(m.Value, "yyyy-MM-dd_HH-mm-ss", null, DateTimeStyles.None, out dt))
					{
						dateFiles.Add(dt);
					}
				}
			}
			maxDate = dateFiles.Min();
			return fileName = maxDate.ToString("yyyy-MM-dd_HH-mm-ss") + fileName;
		}
		public override byte[] GetDownloadFileWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder, string fileName)
		{
			FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpHost + ftpFolder + "Orders/" + fileName);
			request.Method = WebRequestMethods.Ftp.DownloadFile;
			request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);
			FtpWebResponse response = (FtpWebResponse)request.GetResponse();

			byte[] buffer;

			Stream responseStream = response.GetResponseStream();

			using (MemoryStream br = new MemoryStream())
			{
				responseStream.CopyTo(br);
				buffer = br.ToArray();
			}
			responseStream.Close();
			return buffer;
		}
		public override void ParseFileByteArray(byte[] fileData)
		{
			string orders = "";
			using (var stream = new System.IO.MemoryStream(fileData))
			{
				using (var reader = new StreamReader(stream))
				{
					using (var parser = new Microsoft.VisualBasic.FileIO.TextFieldParser(reader))
					{
						while (!parser.EndOfData)
						{
							var line = parser.ReadLine();
							line = line.Replace("\"", "");
							orders += line + "\n";
							string[] values = line.Split(';');
							UpdateDataBpm(values);
						}
						InsertSuccessMessage("Orders: " + orders);
					}
				}
			}
		}
		public override void UpdateDataBpm(string [] values)
		{
			//long orderNumber = 0;
			//var isOrderNumber = Int64.TryParse(values[0], out orderNumber);

			var orderId = GetLookupBPMIdByString("Order", "Number", values[0]);
			var statusCheckId = GetLookupBpmIdByGuid("Order", "Id", orderId, "StatusId");
			var statusName = GetLookupBpmNameByGuid("OrderStatus", "Id", statusCheckId, "Name");
			if(statusName=="Отменен")
			{
				return;
			}
			
			long orderStatus = 0;
			var isOrderStatus = Int64.TryParse(values[1], out orderStatus);
			var orderStatusId = (Guid?)GetLookupBPMIdByInt("OrderStatus", "UsrCode", orderStatus);
			
			if (orderId != null || orderId != Guid.Empty)
			{
				var orderEntity = userConnection.EntitySchemaManager.GetInstanceByName("Order").CreateEntity(userConnection);
				if (orderEntity.FetchFromDB("Id", orderId))
				{
					orderEntity.SetColumnValue("StatusId", orderStatusId != Guid.Empty ? orderStatusId : (Guid?)null);
					orderEntity.SetColumnValue("UsrTTN", values[2]);
					orderEntity.SetColumnValue("UsrFigureCount", values[3]);
					orderEntity.Save(false);
			 	}
			 	InsertUploadDate(uploadDate, orderId);
			}
			
		}

		public override void DeleteFileOnFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder, string fileName)
		{
			FtpWebRequest request = (FtpWebRequest)WebRequest.Create(ftpHost + ftpFolder + "Orders/" + fileName);
			request.Method = WebRequestMethods.Ftp.DeleteFile;
			request.Credentials = new NetworkCredential(ftpUserName, ftpPassword);

			using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
			{
			   
			}
		}

		public Guid GetLookupBPMIdByString(string table, string column, string value)
		{
			if (value == String.Empty)
			{
				return Guid.Empty;
			}

			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column("Id")
				.From(table)
				.Where(column).IsEqual(Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		public object GetLookupBPMIdByInt(string table, string column, long value)
		{
			if (value == 0)
			{
				return Guid.Empty;
			}

			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column("Id")
				.From(table)
				.Where(column).IsEqual(Column.Parameter(value)) as Select).ExecuteScalar<object>();
			return lookupBPMId;
		}
		public Guid GetLookupBpmIdByGuid(string table, string column, Guid value, string columnReturn)
		{
			if (value == Guid.Empty || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		public string GetLookupBpmNameByGuid(string table, string column, Guid value, string columnReturn)
		{
			if (value == Guid.Empty)
			{
				return String.Empty;
			}
			var lookupBPMName = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<string>();
			return lookupBPMName;
		}
		
		#region FtpLog
		public void InsertErrorMessage(string logMessage)
		{
			Insert insert = new Insert(userConnection).Into("UsrIntegrationLogFtp")
				.Set("UsrName", Column.Parameter("Загрузка файлов c папки OUTOrders"))
				.Set("UsrErrorDescription", Column.Parameter(logMessage));
			insert.Execute();
		}
		public void InsertSuccessMessage(string logMessage)
		{
			Insert insert = new Insert(userConnection).Into("UsrIntegrationLogFtp")
				.Set("UsrName", Column.Parameter("Загрузка файлов c папки OUTOrders"))
				.Set("UsrDescription", Column.Parameter(logMessage));
			insert.Execute();
		}
		#endregion
		
		#region InsertUploadDate
		public void InsertUploadDate(DateTime uploadDate, Guid orderId)
		{
			var statusCheckId = GetLookupBpmIdByGuid("Order", "Id", orderId, "StatusId");
			var statusName = GetLookupBpmNameByGuid("OrderStatus", "Id", statusCheckId, "Name");
			if(statusName=="Отменен")
			{
				return;
			}
			var orderEntity = userConnection.EntitySchemaManager.GetInstanceByName("Order").CreateEntity(userConnection);
			if (orderEntity.FetchFromDB("Id", orderId))
			{
				orderEntity.SetColumnValue("UsrUploadDate", uploadDate);
				orderEntity.Save(false);
			}
		}
		#endregion
	}
}







