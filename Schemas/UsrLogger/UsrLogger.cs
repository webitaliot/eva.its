namespace Terrasoft.Configuration
{
	using System;
    using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	public static class Logger
	{
		public static bool Log(string errors, UserConnection userConnection, string body = "")
		{
			var ins = new Insert(userConnection).Into("UsrServiceLog")
							.Set("UsrErrors", Column.Parameter(errors))
							.Set("UsrRequestTime", Column.Parameter(DateTime.Now))
							.Set("UsrRequestBody", Column.Parameter(body));
			try
			{
				ins.Execute();
				return true;
			}
			catch(Exception)
			{
				return false;
			}
		}
	}
}