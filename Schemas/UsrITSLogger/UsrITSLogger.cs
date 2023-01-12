namespace Terrasoft.Configuration
{
	using System;
	using System.Net;
	using System.Data;
	using System.IO;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using System.Web;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using CoreSysSettings = Terrasoft.Core.Configuration.SysSettings;
	
	
	public static class ITSLogger
	{
		public static void LogError(UserConnection userConnection, string sysSettingName, string type, string category, string error)
		{
			int sysSettingsLastNumber = Convert.ToInt32(CoreSysSettings.GetValue(userConnection, sysSettingName));
				++sysSettingsLastNumber;
				CoreSysSettings.SetDefValue(userConnection, sysSettingName, sysSettingsLastNumber);
				var typeId = GetLookupBpmIdByString(userConnection, "UsrLogType", "UsrCode", type, "Id");
			var ins = new Insert(userConnection).Into("UsrServiceLogger")
							.Set("UsrName", Column.Parameter(type + "-" + sysSettingsLastNumber))
							.Set("UsrTypeId", Column.Parameter(typeId))
							.Set("UsrNotes", Column.Parameter(error));
			try
			{
				ins.Execute();
				
			}
			catch(Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
		
		public static Guid GetLookupBpmIdByString(UserConnection userConnection, string table, string column, string value, string columnReturn)
		{
			if (value == String.Empty || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		
	}
}