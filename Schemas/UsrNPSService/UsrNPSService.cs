namespace Terrasoft.Configuration
{
	using System;
	using System.Linq;
	using System.Data;
	using System.Collections.Generic;
	using System.Web;
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	using System.Runtime.Serialization;
	using System.Net;
	using System.Text;
	using System.Web;
	using System.IO;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.Core.Process.Configuration;
	using Newtonsoft;
	using Newtonsoft.Json;
	using System.ComponentModel;
	using System.Reflection;
	using System.Net.Http.Headers;
	using System.Net.Http;
	using System.Threading.Tasks;
	using DocumentFormat.OpenXml;
	using System.Globalization;
	using System.Text.RegularExpressions;
	using System.Net.Security;
	using System.Diagnostics;

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class UsrNPSService
	{
		private AppConnection appConnection;
		private UserConnection userConnection;
		private Response response;

		public UsrNPSService()
		{
			appConnection = HttpContext.Current.Application["AppConnection"] as AppConnection;
			userConnection = appConnection.SystemUserConnection;
		}

		public UsrNPSService(UserConnection userConnection)
		{
			this.userConnection = userConnection;
		}

		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response NewActivity(Request request)
		{
			var response = CreateActivity(request);
			//var response = CreateTempActivity(request);
			Logger.Log("REQUEST: Number=\""+ request.number + "\" Description=\"" + request.description + "\"\nRESPONSE: success: " + response.success + ", error: " + response.error, userConnection, "UsrNPSService");
			return response;
		}
		
		public Response CreateTempActivity(Request request)
		{
			response = new Response();
			response.success = true;
			//response.uuid = null;
			
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrTempNPS").CreateEntity(userConnection);
			entity.SetDefColumnValues();
			entity.SetColumnValue("UsrDescription", request.description);
			entity.SetColumnValue("UsrNumber", request.number);
			entity.SetColumnValue("UsrProcessed", false);
			
			try
			{
				entity.Save(false);
			}
			catch (Exception ex)
			{
				response.error = ex.Message + "\n" + ex.StackTrace;
				response.success = false;
				return response;
			}
			return response;
		}

		public Response CreateActivity(Request request)
		{
			response = new Response();
			response.success = true;
			//response.uuid = null;
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
			var isPresent = request.uuid;
			
			var searchNumber = Reverse(request.number);
			var contactId = GetLookupBpmIdByString("ContactCommunication", "SearchNumber", searchNumber , "ContactId");
			if(contactId == Guid.Empty)
			{
				response.error = "Contact not found!";
				response.success = false;
				return response;
			}
			Guid id = Guid.NewGuid();
			var categotyId = GetLookupBpmIdByString("ActivityCategory", "Name", "Прозвон детракторов" , "Id");
			var statusId = GetLookupBpmIdByString("ActivityStatus", "Name", "Не начата", "Id");
			var priorityId = GetLookupBpmIdByString("ActivityPriority", "Name", "Средний", "Id");
			var dateNow = DateTime.Now;
			var dateTomorrow = dateNow.AddDays(1).AddHours(18 - dateNow.Hour).AddMinutes(55 - dateNow.Minute).AddSeconds(-dateNow.Second);
			
			if(request.uuid == null)
			{
				entity.SetDefColumnValues();
				entity.SetColumnValue("Id", id);
				entity.SetColumnValue("ActivityCategoryId", categotyId != Guid.Empty ? categotyId : (Guid?)null);
				entity.SetColumnValue("PriorityId", priorityId != Guid.Empty ? priorityId : (Guid?)null);
				entity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
				entity.SetColumnValue("ContactId", contactId != Guid.Empty ? contactId : (Guid?)null);
				entity.SetColumnValue("Title", "Работа с детракторами менеджерами NPS");
				entity.SetColumnValue("DueDate", dateTomorrow);
				entity.SetColumnValue("UsrDetractorInf", request.description);
			}
			else
			{
				if(entity.FetchFromDB(new Guid(isPresent)))
				{
					entity.SetColumnValue("UsrDetractorInf", request.description);
					id = new Guid(isPresent);
				}
			}
			try
			{
				entity.Save(false);
			}
			catch (Exception ex)
			{
				response.error = ex.Message + "\n" + ex.StackTrace;
				response.success = false;
				return response;
			}
			try
			{
				var manager = userConnection.ProcessSchemaManager; 
				var processSchema = manager.GetInstanceByName("UsrAccessRightsForNPSActivity");
				var flowEngine = new FlowEngine(userConnection);
				Dictionary<string, string> parameter = new Dictionary<string, string>();
				parameter.Add("IdOfNPSActivity", Convert.ToString(id));
				flowEngine.RunProcess(processSchema, parameter);
				Logger.Log("Process start with IdOfNPSActivity= \""+ id +"\"", userConnection, "UsrAccessRightsForNPSActivity");
			}
			catch (Exception ex)
			{
				response.error = ex.Message + "\n" + ex.StackTrace;
				response.success = false;
				return response;
				Logger.Log("Process with IdOfNPSActivity= \""+ id +"\"" + "has error, with message: " + response.error, userConnection, "UsrAccessRightsForNPSActivity");
			}
			//response.uuid = Convert.ToString(id);
			return response;
		}


		public Guid GetLookupBpmIdByString(string table, string column, string value, string columnReturn)
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

		public Guid GetLookupBpmIdByInt(string table, string column, int value, string columnReturn)
		{
			if (value == 0 || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}

		public DateTime? GetDateFromString(string value)
		{
			var date = DateTime.Now;
			var isDate = DateTime.TryParse(value, out date);
			return isDate == true ? date : (DateTime?)null;
		}
		
		public string Reverse(string s)
		{
			char[] charArray = s.ToCharArray();
			Array.Reverse(charArray);
			return new string(charArray);
		}

	}

	[DataContract]
	public class Response
	{
		[DataMember]
		public bool success { get; set; }
		[DataMember]
		public string error { get; set; }
		// [DataMember]
		// public string uuid { get; set; }
	}

	[DataContract]
	public class Request
	{
		[DataMember]
		[JsonProperty("number")]
		public string number { get; set; }
		[DataMember]
		[JsonProperty("description")]
		public string description { get; set; }
		[DataMember]
		[JsonProperty("uuid")]
		public string uuid { get; set; }
	}
}