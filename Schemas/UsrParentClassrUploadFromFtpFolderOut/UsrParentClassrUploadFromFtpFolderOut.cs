using System.Collections.Generic;

namespace Terrasoft.Configuration.UsrUploadFilesFromFtpFolderOut
{
 	abstract class UploadFromFtpFolderOut
	{
		public abstract List<string> GetListDirectoryContentsWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder);
		public abstract string GetLastFileName (List<string> files);
		public abstract byte[] GetDownloadFileWithFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder, string FileName);
		public abstract void ParseFileByteArray(byte[] fileData);
		public abstract void UpdateDataBpm(string [] values);
        public abstract void DeleteFileOnFTP(string ftpHost, string ftpUserName, string ftpPassword, string ftpFolder, string fileName);
	}
}