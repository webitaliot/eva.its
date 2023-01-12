namespace Terrasoft.Configuration
{
	using System;
    using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using System.Threading;
    using System.Threading.Tasks;
    
	public class UsrITSLoggerDebug
	{
		public static bool Log(UserConnection userConnection, string body, string errors)
		{
			var ins = new Insert(userConnection).Into("UsrITS_LoggerDebug")
							.Set("UsrITSRequestTime", Column.Parameter(DateTime.Now))
							.Set("UsrITSRequestBody", Column.Parameter(body))
							.Set("UsrITSErrors", Column.Parameter(errors));
			try
			{
				UsrITSLoggerDebug lg = new UsrITSLoggerDebug();
				var result = lg.CompleteAsync(ins);
				return true;
			}
			catch(Exception)
			{
				return false;
			}
		}
		public async System.Threading.Tasks.Task CompleteAsync(Insert insAsync)
		{
		    await Task.Factory.StartNew(()=> insAsync.Execute());
		}
	}
}