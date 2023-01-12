namespace Terrasoft.Configuration.UsrBPMService
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
	using Column = Terrasoft.Core.DB.Column;
	using Terrasoft.Core.Entities;
	using Newtonsoft;
	using Newtonsoft.Json;
	using System.ComponentModel;
	using System.Reflection;
	using System.Net.Http.Headers;
	using System.Net.Http;
	using System.Threading.Tasks;
	using DocumentFormat.OpenXml;
	using DocumentFormat.OpenXml.Spreadsheet;
	using SpreadsheetLight;
	using System.Globalization;
	using System.Text.RegularExpressions;
	using Terrasoft.Core.Process;
	using Terrasoft.Mail.Sender;
	using Terrasoft.Mail;
	using Terrasoft.Core.Factories;
	
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class UsrBPMService
	{
		private AppConnection appConnection;
		private UserConnection userConnection;
		private Response response;

		public UsrBPMService()
		{
			appConnection = HttpContext.Current.Application["AppConnection"] as AppConnection;
			userConnection = appConnection.SystemUserConnection;
		}

		public UsrBPMService(UserConnection userConnection)
		{
			this.userConnection = userConnection;
		}
		
		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Stream GenerateReport(string start, string end)
		{
			var startDate = DateTime.Parse(start);
			var endDate = DateTime.Parse(end);
			var acceptedCalls = new Dictionary<Guid, RecordResult>();
			var siteCases = new Dictionary<Guid, RecordResult>();
			var operatorActivities = new Dictionary<Guid, RecordResult>();
			var ms = new MemoryStream();
			var rowCounter = 1;
			var tasks = new List<Task>();
			tasks.Add(Task.Factory.StartNew(() => acceptedCalls = GetAcceptedCallsCount(startDate, endDate)));
			tasks.Add(Task.Factory.StartNew(() => siteCases = GetSiteCasesCount(startDate, endDate)));
			tasks.Add(Task.Factory.StartNew(() => operatorActivities = GetOperatorActivitiesCount(startDate, endDate)));
			Task.WaitAll(tasks.ToArray());
			using (SLDocument sl = new SLDocument())
			{
				sl.SetColumnWidth("A1", 50);
				sl.SetColumnWidth("B1", 50);
				sl.SetColumnWidth("C1", 50);
				sl.SetCellValue("A1", "Период: " + start + "-" + end);
				if(acceptedCalls.Count > 0)
				{
					rowCounter++;
					sl.SetCellValue("B" + rowCounter, "ФИО Оператора");
					sl.SetCellValue("C" + rowCounter, "Количество принятых звонков");
					rowCounter++;
				}
				foreach (var record in acceptedCalls)
				{
					sl.SetCellValue("B" + rowCounter, record.Value.name);
					sl.SetCellValue("C" + rowCounter, record.Value.count);
					rowCounter++;
				}
				if (siteCases.Count > 0)
				{
					rowCounter++;
					sl.SetCellValue("B" + rowCounter, "ФИО Оператора");
					sl.SetCellValue("C" + rowCounter, "Количество обращений с сайта");
					rowCounter++;
				}
				foreach (var record in siteCases)
				{
					sl.SetCellValue("B" + rowCounter, record.Value.name);
					sl.SetCellValue("C" + rowCounter, record.Value.count);
					rowCounter++;
				}
				if (operatorActivities.Count > 0)
				{
					rowCounter++;
					sl.SetCellValue("B" + rowCounter, "ФИО Оператора");
					sl.SetCellValue("C" + rowCounter, "Количество активностей");
					rowCounter++;
				}
				foreach (var record in operatorActivities)
				{
					sl.SetCellValue("B" + rowCounter, record.Value.name);
					sl.SetCellValue("C" + rowCounter, record.Value.count);
					rowCounter++;
				}
				sl.SaveAs(ms);
			}
			ms.Position = 0;
			var response = WebOperationContext.Current.OutgoingResponse;
			response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
			response.ContentLength = (int)ms.Length;
			return ms;
		}
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response CallBackEmail(CallBackEmailRequest request)
		{
			string tmpLog = $"CallBackEmail service: request.code: {request.code} ; request.number: {request.number}";
			Logger.Log(String.Empty, userConnection, tmpLog);
			response = new Response();
			response.success = true; 
			string email = GetLookupStringByString("UsrResponsibleEmail", "UsrAccountCode", request.code, "UsrSVEmail");
			string emailStore = GetLookupStringByString("UsrResponsibleEmail", "UsrAccountCode", request.code, "UsrStoreEmail");
			string storeName = GetLookupStringByString("UsrResponsibleEmail", "UsrAccountCode", request.code, "Name");
			string senderEmail=String.Empty;
			if(email==String.Empty||email==null)
			{
				Logger.Log(String.Empty, userConnection, "CallBackEmail error: Account with such code was not found");
				response.success = false;
				response.error = "Account with such code was not found!";
				return response;
			}
			try
			{
				var emailId = new Guid(Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "EmailSenderRemindersDetractors")));
				senderEmail = GetLookupBpmNameByGuid("MailboxSyncSettings", "Id", emailId, "SenderEmailAddress");
			}
			catch (Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "CallBackEmail error: SysSettings EmailSenderRemindersDetractors have not been initialized");
				response.success = false;
				response.error = "SysSettings EmailSenderRemindersDetractors have not been initialized";
				return response;
			}
			string emailBody = GetLookupStringByString("EmailTemplate", "Name", "Шаблон ответственному по магазину (RU)", "Body");
			string emailSubject = GetLookupStringByString("EmailTemplate", "Name", "Шаблон ответственному по магазину (RU)", "Subject");
			if(emailBody==null||emailSubject==null||emailBody==String.Empty||emailSubject==String.Empty)
			{
				Logger.Log(String.Empty, userConnection, "CallBackEmail error: Email template was not found!");
				response.success = false;
				response.error = "Email template was not found!";
				return response;
			}
			Guid activityTypeId = GetLookupBpmIdByString("ActivityType", "Code", "Email", "Id");
			var entityActivity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
			var activityId = Guid.NewGuid();
			entityActivity.SetDefColumnValues();
			entityActivity.SetColumnValue("Id", activityId);
			entityActivity.SetColumnValue("Title", emailSubject + " " + storeName);
			entityActivity.SetColumnValue("Recepient", String.Concat(email, ";", emailStore));
			entityActivity.SetColumnValue("Sender", senderEmail);
			entityActivity.SetColumnValue("TypeId", activityTypeId);
			entityActivity.SetColumnValue("ActivityCategoryId", new Guid("8038a396-7825-e011-8165-00155d043204"));
			entityActivity.SetColumnValue("IsHtmlBody", true);
			entityActivity.SetColumnValue("Body", emailBody);
			try
			{
				entityActivity.Save(false);
			}
			catch(Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "CallBackEmail error: Create Activity");
				response.success = false;
				response.error = "Email template was not found!";
				return response;
			}
			try
			{
				var emailClientFactory = ClassFactory.Get<EmailClientFactory>(new ConstructorArgument("userConnection", userConnection));
				var activityEmailSender = new ActivityEmailSender(emailClientFactory, userConnection);
				activityEmailSender.Send(activityId);
			}
			catch(Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "CallBackEmail error: Error while sending email");
				response.success = false;
				response.error = "Error while sending email";
			}
			return response;
		}
		
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// [OperationContract]
		// [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		// ResponseFormat = WebMessageFormat.Json)]
		// public List<ResponseForDelivery> CreateActivityForDelivery(List<DeliveryInfoItem> deliveryItemsList)
		// {
		// 	var responseList = new List<ResponseForDelivery>();
		// 	var response = new ResponseForDelivery();
			
		// 	var tag = "Заказ";
		// 	var date = DateTime.Now.AddMinutes(1).ToString("yyyy-MM-dd HH:mm:ss");
			
		// 	var url = String.Empty;
		// 	var username = String.Empty;
		// 	var password = String.Empty;
		// 	var callbackUrl = String.Empty;
		// 	var ttl = 0L;
		// 	try
		// 	{
		// 	    url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrViberSmsApiUri"));
		// 	    username = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrViberSmsApiUserName"));
		// 	    password = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrViberSmsApiUserPassword"));
		// 	    callbackUrl = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrViberSmsApiCallbackUrl"));
		// 	    ttl = Convert.ToInt64(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrViberSmsApiTTL"));
		// 	}
		// 	catch (Exception ex)
		// 	{
		// 		Logger.Log(ex.Message, userConnection, "SysSettings UsrViberSmsApiUri and UsrViberSmsApiKey have not been initialized");
		// 	}
		// 	if(url == String.Empty)
  //          {
  //          	response.Error = "UsrViberSmsApiUri is empty.";
  //          	responseList.Add(response);
  //          	return responseList;
  //          }
		// 	var svcCredentials = Convert.ToBase64String(ASCIIEncoding.ASCII.GetBytes(username + ":" + password));
		// 	////////////////////////////////////////////////////
		// 	//Создание активности
			
		// 	foreach(var item in deliveryItemsList)
		// 	{
		// 		if(item.DayCount == 3 || (!CheckifSMSIsSent(item.OrderNumber) && item.DayCount == 4))
		// 		{
		// 			var orderId = GetLookupBpmIdByString("Order", "Number", item.OrderNumber, "Id");
		// 			if(orderId == Guid.Empty)
		// 			{
		// 				response.Error = item.OrderNumber;
		// 				responseList.Add(response);
		// 				continue;
		// 			}
		// 			var activity_Id = Guid.NewGuid();
		// 			var contactId = GetLookupBpmIdByString("Order", "Number", item.OrderNumber, "ContactId");
		// 			var activityCategoryId = GetLookupBpmIdByString("ActivityCategory", "Name", "Сообщение", "Id");
		// 			var statusId = GetLookupBpmIdByString("ActivityStatus", "Name", "Завершена", "Id");
		// 			var GMSUProviderId = GetLookupBpmIdByString("Contact", "Name", "GMSU provider", "Id");
		// 			var priorityId = GetLookupBpmIdByString("ActivityPriority", "Name", "Средний", "Id");
		//             var entityActivity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
		//             entityActivity.SetDefColumnValues();
		//             entityActivity.SetColumnValue("Id", activity_Id);
		//             entityActivity.SetColumnValue("OrderId", orderId != Guid.Empty ? orderId : (Guid?)null);
		//             entityActivity.SetColumnValue("ContactId", contactId != Guid.Empty ? contactId : (Guid?)null);
		//             entityActivity.SetColumnValue("Title", GetTextSMS(item.DayCount, item.OrderNumber, GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrWebsiteLanguage"), item.toDate, GetLookupBpmIdByGuid("Order", "Id", orderId, "DeliveryTypeId"), GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrPaymentMethod"), GetLookupBpmDecimalByGuid("Order", "Id", orderId, "Amount")));
		//             entityActivity.SetColumnValue("ActivityCategoryId", activityCategoryId != Guid.Empty ? activityCategoryId : (Guid?)null);
		//             entityActivity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
		//             entityActivity.SetColumnValue("RemindToOwnerDate", DateTime.Now);
		//             entityActivity.SetColumnValue("RemindToOwner", true);
		//             entityActivity.SetColumnValue("OwnerId", GMSUProviderId != Guid.Empty ? GMSUProviderId : (Guid?)null);
		//             entityActivity.SetColumnValue("AuthorId", GMSUProviderId != Guid.Empty ? GMSUProviderId : (Guid?)null);
		//             entityActivity.SetColumnValue("PriorityId", priorityId != Guid.Empty ? priorityId : (Guid?)null);
		//             try
		//             {
		//             	entityActivity.Save(false);
		//             }
		//             catch(Exception ex)
		//             {
		//             	Logger.Log(ex.Message, userConnection, "DeliverService error " + item.OrderNumber);
		//             }
		            
		   //         var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
					// httpWebRequest.ContentType = "application/json";
					// httpWebRequest.Method = "POST";
					// httpWebRequest.Headers.Add("Authorization", "Basic " + svcCredentials);
		   //        using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
					// {
					//     string json = JsonConvert.SerializeObject(new
					//     {
					//     	phone_number = item.ReciverPhone,
					//     	extra_id = activity_Id.ToString(),
					//     	callback_url = callbackUrl,
					//     	start_time = date,
					//     	tag = tag,
					//     	is_promotional = false,
					//     	channels = new string[] {
					//     		"viber",
					//     		"sms"
					//     	},
					//     	channel_options = new {
					//     		sms = new {
					//     			text = GetTextSMS(item.DayCount, item.OrderNumber, GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrWebsiteLanguage"), item.toDate, GetLookupBpmIdByGuid("Order", "Id", orderId, "DeliveryTypeId"), GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrPaymentMethod"), GetLookupBpmDecimalByGuid("Order", "Id", orderId, "Amount")),
					//     			alpha_name = "EVA",
					//     			ttl = ttl
					//     		},
					//     		viber = new {
					//     			text = GetTextViber(item.DayCount, item.OrderNumber, GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrWebsiteLanguage"), item.toDate, GetLookupBpmIdByGuid("Order", "Id", orderId, "DeliveryTypeId"), GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrPaymentMethod"), GetLookupBpmNameByGuid("Contact", "Id", GetLookupBpmIdByGuid("Order", "Id", orderId, "ContactId"), "GivenName"), GetLookupBpmNameByGuid("Order", "Id", orderId, "UsrTTN"), GetLookupBpmDecimalByGuid("Order", "Id", orderId, "Amount")),
					//     			ttl = ttl
					//     		}
					//     	}
					//     }).ToString();
					//     streamWriter.Write(json);
					//     streamWriter.Flush();
					//     streamWriter.Close();
					//     Logger.Log("SEND_SMS", userConnection, json);
					// }
					// try
					// {
					// 	var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
					// 	using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
					// 	{
					// 		var result = streamReader.ReadToEnd();
					// 		var responseSMS = JsonConvert.DeserializeObject<Terrasoft.Configuration.ViberSms.Response>(result.ToString());
					// 	}
					// }
					// catch(Exception ex)
					// {
					// 	Logger.Log(ex.Message, userConnection, "DeliverService error " + item.OrderNumber);
					// }
		// 		}
		// 	}
		// 	if(responseList.Count == 0)
		// 	{
		// 		response.Error = "null";
		// 		responseList.Add(response);
		// 	}
		// 	/////////////////////
		// 	return responseList;
		// }
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response RegisterCase(Request request)
		{
			response = new Response();
			response.success = true;
			Logger.Log("REQUEST: " + request.ToString(), userConnection, "RegisterCaseRequest");
			AsyncProcessRegisterCase(request);
			return response;
		}
		
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response SMSCallBack(SMSCallBackRequest request)
		{
			var containsViber = request.sent_via.IndexOf("viber", StringComparison.OrdinalIgnoreCase) >= 0;
			var containsSms = request.sent_via.IndexOf("sms", StringComparison.OrdinalIgnoreCase) >= 0;
			var message_id = request.message_id;
			response = new Response();
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
			try
			{
				var id = new Guid(request.extra_id);
				var smsStatus = GetLookupBpmIdByLong("UsrViberSmsStatus", "UsrCode", request.substatus, "Id");
				var smsState = GetLookupBpmIdByLong("UsrViberSmsState", "UsrCode", request.status, "Id");
				if(entity.FetchFromDB(id))
				{
					entity.SetColumnValue("UsrMessageIDV2", message_id);
					entity.SetColumnValue("UsrSmsStateId", smsState != Guid.Empty ? smsState : (Guid?)null);
					entity.SetColumnValue("UsrSmsStatusId", smsStatus != Guid.Empty ? smsStatus : (Guid?)null);
					entity.SetColumnValue("UsrViber", containsViber);
					entity.SetColumnValue("UsrSms", containsSms);
					entity.Save();
				}
			}
			catch(Exception ex)
			{
				response.success = false;
				response.error = ex.Message;
				Logger.Log("SMSCallback " + ex.Message, userConnection, JsonConvert.SerializeObject(request));
				return response;
			}
			response.success = true;
			Logger.Log("SMSCallback", userConnection, JsonConvert.SerializeObject(request));
			return response;
		}

		public void AsyncProcessRegisterCase(Request request)
		{
			var registeredOn = DateTime.Now;
			var body = JsonConvert.SerializeObject(request);
			var errors = String.Empty;
			var log = WriteLog(registeredOn, body, errors);
			var caseContactByActiveCard = Guid.Empty;
			var caseContactByMobilePhone = Guid.Empty;
			var caseContactByEmail = Guid.Empty;
			//var tasks = new List<Task>();
			try
			{
				var cardNum = 0L;
				var isCardNumIsNumber = false;
				caseContactByActiveCard = GetLookupBpmIdByString("Contact", "UsrNumberActiveCard", request.cardnum, "Id");
				caseContactByMobilePhone = GetLookupBpmIdByString("Contact", "MobilePhone", request.phone, "Id");
				caseContactByEmail = GetLookupBpmIdByString("Contact", "Email", request.email, "Id");
				//Task.WaitAll(tasks.ToArray());
				var caseContact = caseContactByActiveCard;
				if (caseContact == Guid.Empty)
				{
					caseContact = caseContactByMobilePhone;
					if (caseContact == Guid.Empty)
					{
						caseContact = caseContactByEmail;
						if (caseContact == Guid.Empty)
						{
							caseContact = CreateContact(request);
						}
					}
				}
				var contactActiveCardNumber = GetContactActiveCardNumber(caseContact);
				var entity = userConnection.EntitySchemaManager.GetInstanceByName("Case").CreateEntity(userConnection);
				var caseOrigin = GetLookupBpmIdByString("CaseOrigin", "UsrCode", request.origin, "Id");
				var caseCategory = GetLookupBpmIdByString("CaseCategory", "Name", request.type, "Id");
				var caseCity = GetLookupBpmIdByString("City", "Name", request.city, "Id");
				var caseId = Guid.NewGuid();
				entity.SetDefColumnValues();
				entity.SetColumnValue("Id", caseId);
				entity.SetColumnValue("RegisteredOn", registeredOn);
				entity.SetColumnValue("UsrCityId", caseCity != Guid.Empty ? caseCity : CreateCity(request));
				entity.SetColumnValue("Subject", request.type);
				entity.SetColumnValue("Symptoms", request.message);
				//entity.SetColumnValue("Number", request.result_id);
				entity.SetColumnValue("ContactId", caseContact != Guid.Empty ? caseContact : (Guid?)null);
				entity.SetColumnValue("OriginId", caseOrigin != Guid.Empty ? caseOrigin : (Guid?)null);
				entity.SetColumnValue("CategoryId", caseCategory != Guid.Empty ? caseCategory : (Guid?)null);
				entity.SetColumnValue("UsrActiveNumberCardPL", contactActiveCardNumber);
				entity.SetColumnValue("UsrAppliedName", request.name);
				entity.SetColumnValue("UsrAppliedPhone", request.phone);
				entity.SetColumnValue("UsrAppliedEmail", request.email);
				entity.SetColumnValue("UsrAppliedCardNumber", request.cardnum);
				entity.SetColumnValue("UsrDescription", GetPlainText(request.message));
				try
				{
					entity.Save(false);
					foreach(var fil in request.file){
						InsertCaseFile(caseId, fil, new Guid("539BC2F8-0EE0-DF11-971B-001D60E938C6")); // link
					}
				}
				catch (Exception ex)
				{
					errors += ex.Message + "\r\n";
				}
			}
			catch (Exception ex)
			{
				errors += ex.Message + "\r\n";
			}
			if (errors == String.Empty)
			{
				errors = "SUCCESS";
			}
			UpdateLog(errors, log);
		}

		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response NewOrder(NewOrderRequest request)
		{
			response = new Response();
			response.success = true;
			var url = String.Empty;
			var tokenSys = String.Empty;
			try
			{
				url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUrlGetImOrderId"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrUrlGetImOrderId was not found";
				return response;
			}
			try
			{
				tokenSys = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrTokenForNewOrder"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrTokenForNewOrder was not found";
				return response;
			}
			url = String.Format(url, request.order_id);
			var token = tokenSys;
			try
			{
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/json";
				httpWebRequest.Headers.Add("Authorization", "Bearer " + token.Replace("\"",""));
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "GET";

				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "NewOrder Service " + request.order_id.ToString());
					var orderFromServer = JsonConvert.DeserializeObject<GetOrderResponse>(result.ToString());
					ProcessOrderRequest(orderFromServer, request.order_id, ref response);
					response.success = true;
					response.error = null;
					return response;
				}
			}
			catch(WebException ex)
			{
				if(ex.Response != null)
				{
					using (var stream = ex.Response.GetResponseStream())
					using (var reader = new StreamReader(stream))
					{
						Logger.Log("RESPONSE: " + reader.ReadToEnd().ToString(), userConnection, "NewOrder Service error");
					}
				}
				else 
				{
					Logger.Log(ex.Message, userConnection, "NewOrder Service error");
				}
				response.success = false;
				response.error = ex.Message;
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = ex.Message;
				Logger.Log(ex.Message, userConnection, "NewOrder Service error");
				return response;
			}
			return response;
		}

		
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response OrderUpdate(NewOrderRequest request)
		{
			response = new Response();
			response.success = true;
			var url = String.Empty;
			var tokenSys = String.Empty;
			var testResponce = String.Empty;
			try
			{
				url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUrlGetImOrderId"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrUrlGetImOrderId was not found";
				return response;
			}
			try
			{
				tokenSys = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrTokenForNewOrder"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrTokenForNewOrder was not found";
				return response;
			}
			url = String.Format(url, request.order_id);
			testResponce = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrTestOrderRequest"));
			var token = tokenSys;
			try
			{
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/json";
				httpWebRequest.Headers.Add("Authorization", "Bearer " + token.Replace("\"",""));
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "GET";

				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "OrderUpdateService " + request.order_id.ToString());
					var orderFromServer = JsonConvert.DeserializeObject<GetOrderResponse>(result.ToString());
					UpdateOrder(orderFromServer, request.order_id);
					response.success = true;
					response.error = null;
					return response;
				}
			}
			catch(WebException ex)
			{
				if(ex.Response != null)
				{
					using (var stream = ex.Response.GetResponseStream())
					using (var reader = new StreamReader(stream))
					{
						Logger.Log("RESPONSE: " + reader.ReadToEnd().ToString(), userConnection, "OrderUpdate Service error");
					}
				}
				else 
				{
					Logger.Log(ex.Message, userConnection, "OrderUpdate Service error");
				}
				response.success = false;
				response.error = ex.Message;
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = ex.Message;
				Logger.Log(ex.Message, userConnection, "OrderUpdate Service error");
				return response;
			}
			return response;
		}
		public string GetWebitelId(string usrname, string activityId, string phone)
		{
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "webitelConnectionString"));
				url = url.Replace("wss://", "https://");
				var token = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "webitelDomainToken"));
				var urlP2 = "api/v2/dialer/";
				var urlP3 = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrWebitelCallbackDailerId"));
				var urlP4 = "/members?autoRun=true";
				url = url + urlP2 + urlP3 + urlP4;
				var eveningTime = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 21, 0, 0, 0);
				ulong timeInt = (ulong)(eveningTime.Subtract(new DateTime(1970, 1, 1))).TotalSeconds* 1000;
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/json";
				httpWebRequest.Headers.Add("X-Access-Token", token);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						name = usrname,
						priority = 1,
						variables = new
						{
							bpm_id = activityId
						},
						communications = new List<CommunicationsWebitel> 
						{
							new CommunicationsWebitel
							{
								number = phone,
								priority = 1,
								type = "1"
							}
						},
						expire = timeInt
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "CreateActivity GetWebitelId Service");
					var orderFromServer = JsonConvert.DeserializeObject<GetWebitelResponse>(result.ToString());
					return orderFromServer.data.insertedIds[0];
				}
			}
			catch (Exception ex)
			{
				Logger.Log("Error: " + ex.Message, userConnection, "CreateActivity GetWebitelId Service error");
				return null;
			}
		}
		
		public ResponseToWebitel ReturnResponceToWebitel(bool success, string error, CheckLangRequest request, string lang)//Метод для формування відповыді вебітелу для CheckLang
		{
			ResponseToWebitel responseWebitel = new ResponseToWebitel();
			Logger.Log("request.code " + request.code + " request.lang " + request.lang+ " success " + success.ToString() +" error " + error+" lang "+lang,userConnection, "CheckLang" + request.phone);
			responseWebitel.success = success;
			responseWebitel.error = error;
			responseWebitel.phone = request.phone;
			responseWebitel.lang = lang;
			return responseWebitel;
		}
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public ResponseToWebitel CheckLang(CheckLangRequest request)
		{
			var responseWebitel = new ResponseToWebitel();
			if (request.phone == String.Empty)
			{
				responseWebitel = ReturnResponceToWebitel(false, "Parameter phone is empty", request, null);
				return responseWebitel;
			}
			if (request.phone == String.Empty)
			{
				responseWebitel = ReturnResponceToWebitel(false, "Parameter code is empty", request, null);
				return responseWebitel;
			}
			responseWebitel.success = true;
			var searchNumberLength = Convert.ToInt32(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "SearchNumberLength"));
			var searchNumber = Reverse(request.phone);
			var code = request.code;
			searchNumber = searchNumber.Substring(0, searchNumberLength > searchNumber.Length ? searchNumber.Length : searchNumberLength);
			//var contactId = GetLookupBpmIdByString("ContactCommunication", "SearchNumber", searchNumber, "ContactId");
			var contactId = GetContactIdByReversedPhone(searchNumber, userConnection);
			if(code=="check")
			{
				if(contactId==Guid.Empty)
				{
					responseWebitel = ReturnResponceToWebitel(true, "No contact with such number" , request, "noContact");
					return responseWebitel;
				}
				else
				{
					var languageId = GetLookupBpmIdByGuid("Contact", "Id", contactId, "LanguageId");
					if(languageId==Guid.Empty)
					{
						responseWebitel = ReturnResponceToWebitel(true, "Language is empty" , request, "empty");
						return responseWebitel;	
					}
					else
					{
						var language = GetLookupBpmNameByGuid("SysLanguage", "Id", languageId, "Code");
						if(language=="ru-RU")
						{
							responseWebitel = ReturnResponceToWebitel(true, null , request, "RU");
							return responseWebitel;
						}
						else
						{
							if(language=="uk-UA")
							{
								responseWebitel = ReturnResponceToWebitel(true, null , request, "UA");
								return responseWebitel;
							}
							else
							{
								responseWebitel = ReturnResponceToWebitel(false, "Some other language" , request, null);
								return responseWebitel;
							}
						}
					}
				}
			}
			if(code=="set")
			{
				if(contactId==Guid.Empty)
				{
					responseWebitel = ReturnResponceToWebitel(false, "No contact with such number" , request, null);
					return responseWebitel;
				}
				else
				{
					string lang;
					if(request.lang=="UA")
					{
						lang = "uk-UA";
					}
					else
					{
						if(request.lang=="RU")
						{
							lang = "ru-RU";
						}
						else
						{
							responseWebitel = ReturnResponceToWebitel(false, "No such language" , request, null);
							return responseWebitel;
						}
					}
					var langId = GetLookupBpmIdByString("SysLanguage", "Code", lang, "Id");
					var contactEntity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
					contactEntity.FetchFromDB(contactId);
					contactEntity.SetColumnValue("LanguageId", langId != Guid.Empty ? langId : (Guid?)null);
					try
					{
						contactEntity.Save(false);
					}
					catch (Exception ex)
					{
						responseWebitel = ReturnResponceToWebitel(false, ex.Message , request, null);
						return responseWebitel;
					}
					responseWebitel = ReturnResponceToWebitel(true, null , request, null);
					return responseWebitel;
				}
			}
			return responseWebitel;
		}
		
		
		
		
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response CreateActivity(CreateActivityRequest request)
		{
			response = new Response();
			string title = "";
			if (request.phone == String.Empty)
			{
				response.success = false;
				response.error = "Parameter phone is empty";
				return response;
			}

			var searchNumberLength = Convert.ToInt32(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "SearchNumberLength"));
			response.success = true;
			var searchNumber = Reverse(request.phone);
			var code = request.code;
			searchNumber = searchNumber.Substring(0, searchNumberLength > searchNumber.Length ? searchNumber.Length : searchNumberLength);
			//var contactId = GetLookupBpmIdByString("ContactCommunication", "SearchNumber", searchNumber, "ContactId");
			var contactId = GetContactIdByReversedPhone(searchNumber, userConnection);
			if (contactId == Guid.Empty&&request.code!="check")
			{
				contactId = CreateContactForActivity(request.phone);
			}
			
			if(code=="new")
			{
				
				if (contactId != Guid.Empty)
				{
					if(request.title_code!=String.Empty)
					{
					title=GetStringByString("UsrTitles","Code",request.title_code,"Title");
					title=title.Replace("[#number]", request.phone);
					
					}
					else
					{
						response.success = false;
						response.error = "false";
						return response;
					}
					var activityEntity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
					var activityId = Guid.NewGuid();
					var categoryId = GetLookupBpmIdByString("ActivityCategory", "Name", "Пропущенные звонки", "Id");
					var statusId = GetLookupBpmIdByString("ActivityStatus", "Name", "Не начата", "Id");
					var usrname = GetLookupBpmNameByGuid("Contact", "Id", contactId, "Name");
					var webitelId = GetWebitelId(usrname, activityId.ToString(), request.phone);
					activityEntity.SetDefColumnValues();
					activityEntity.SetColumnValue("Id", activityId);
					activityEntity.SetColumnValue("Title", title);
					activityEntity.SetColumnValue("ActivityCategoryId", categoryId != Guid.Empty ? categoryId : (Guid?)null);
					activityEntity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
					activityEntity.SetColumnValue("UsrPhone", request.phone);
					activityEntity.SetColumnValue("ContactId", contactId);
					activityEntity.SetColumnValue("UsrWebitelId", webitelId);
					try
					{
						activityEntity.Save(false);
					}
					catch (Exception ex)
					{
						response.success = false;
						response.error = ex.Message;
						return response;
					}
				}
				else
				{
					response.success = false;
					response.error = "Contact was not created";
					return response;
				}
			}
			
			if(code=="close")
			{
				var activityId = GetNewestActivity("Activity", "UsrPhone", request.phone, "Id");
				var categoryId = GetLookupBpmIdByGuid("Activity", "Id", activityId, "ActivityCategoryId");
				var categoryName = GetLookupBpmNameByGuid("ActivityCategory", "Id", categoryId, "Name");
				var activityEntity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
				if (activityEntity.FetchFromDB(activityId)&&categoryName=="Пропущенные звонки")
				{
					var statusId = GetLookupBpmIdByString("ActivityStatus", "Name", "Завершена", "Id");
					var resultId = GetLookupBpmIdByString("ActivityResult", "Name", "Перезвонил клиент", "Id");
					activityEntity.SetColumnValue("ResultId", resultId != Guid.Empty ? resultId : (Guid?)null); 
					activityEntity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
					try
					{
						activityEntity.Save(false);
					}
					catch (Exception ex)
					{
						response.success = false;
						response.error = ex.Message;
						return response;
					}
					
					try
					{
						var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "webitelConnectionString"));
						url = url.Replace("wss://", "https://");
						var token = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "webitelDomainToken"));
						var urlP2 = "api/v2/dialer/";
						var urlP3 = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrWebitelCallbackDailerId"));
						var urlP4 = "/members/";
						var webitelId = GetLookupBpmNameByGuid("Activity", "Id", activityId, "UsrWebitelId");
						var httpWebRequest = (HttpWebRequest)WebRequest.Create(url + urlP2 + urlP3 + urlP4 + webitelId);
						httpWebRequest.ContentType = "application/json";
						httpWebRequest.Headers.Add("X-Access-Token", token);
						httpWebRequest.Headers.Add("Cache-Control", "no-cache");
						httpWebRequest.Method = "DELETE";
						var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
						using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
						{
							var result = streamReader.ReadToEnd();
							Logger.Log("RESPONSE: " + result.ToString(), userConnection, "CreateActivity DELETE Service");
						}
						}
							catch (Exception ex)
						{
							Logger.Log("Error: " + ex.Message, userConnection, "CreateActivity DELETE Service error");
							return null;
						}

				}
				else
				{
					response.success = false;
					response.error = "No activity with such number!";
					return response;
				}
			}
			if(code=="expire")
			{
				
				var activityId = GetNewestActivity("Activity", "UsrPhone", request.phone, "Id");
				var categoryId = GetLookupBpmIdByGuid("Activity", "Id", activityId, "ActivityCategoryId");
				var categoryName = GetLookupBpmNameByGuid("ActivityCategory", "Id", categoryId, "Name");
				var activityEntity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
				if (activityEntity.FetchFromDB(activityId)&&categoryName=="Пропущенные звонки")
				{
					var statusId = GetLookupBpmIdByString("ActivityStatus", "Name", "В работе", "Id");
					var resultId = GetLookupBpmIdByString("ActivityResult", "Name", "Исчерпались попытки", "Id");
					activityEntity.SetColumnValue("ResultId", resultId != Guid.Empty ? resultId : (Guid?)null); 
					activityEntity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
					try
					{
						activityEntity.Save(false);
					}
					catch (Exception ex)
					{
						response.success = false;
						response.error = ex.Message;
						return response;
					}
				}
				else
				{
					response.success = false;
					response.error = "No activity with such number!";
					return response;
				}
			}
			if(code=="check")
			{
				var activityId = GetNewestActivity("Activity", "UsrPhone", request.phone, "Id");
				var categoryId = GetLookupBpmIdByGuid("Activity", "Id", activityId, "ActivityCategoryId");
				var categoryName = GetLookupBpmNameByGuid("ActivityCategory", "Id", categoryId, "Name");
				var activityEntity = userConnection.EntitySchemaManager.GetInstanceByName("Activity").CreateEntity(userConnection);
				if (activityEntity.FetchFromDB(activityId)&&categoryName=="Пропущенные звонки")
				{
					var statusId = GetLookupBpmIdByGuid("Activity", "Id", activityId, "StatusId");
					var statusName = GetLookupBpmNameByGuid("ActivityStatus", "Id", statusId, "Name");
					if (statusName=="Не начата")
					{
						response.success = true;
						response.error = "true";
						return response;
					}
					else
					{
						response.success = false;
						response.error = "false";
						return response;
					}
				}
				else
				{
					response.success = false;
					response.error = "No activity with such number!";
					return response;
				}
			}
			return response;
		}

		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
		ResponseFormat = WebMessageFormat.Json)]
		public Response RegisterCallBack(RegisterCallBackRequest request)
		{
			response = new Response();
			var searchNumberLength = Convert.ToInt32(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "SearchNumberLength"));
			response.success = true;
			var searchNumber = Reverse(request.phone);
			searchNumber = searchNumber.Substring(0, searchNumberLength > searchNumber.Length ? searchNumber.Length : searchNumberLength);
			var contactId = GetLookupBpmIdByString("ContactCommunication", "SearchNumber", searchNumber, "ContactId");
			if (contactId == Guid.Empty)
			{
				contactId = CreateContactForRegisterCallBack(request.phone);
			}
			Guid findActivity = Guid.Empty;
			findActivity = GetSimilarActivityByContact(contactId);
			if (contactId != Guid.Empty&&findActivity == Guid.Empty)
			{
				var caseEntity = userConnection.EntitySchemaManager.GetInstanceByName("Case").CreateEntity(userConnection);
				var caseId = Guid.NewGuid();
				var caseOrigin = Guid.NewGuid();
				if(String.IsNullOrEmpty(request.origin))
				{
					caseOrigin = GetLookupBpmIdByString("CaseOrigin", "Name", "Заказ звонка", "Id");
				}
				else
				{
					caseOrigin = GetLookupBpmIdByString("CaseOrigin", "UsrCode", request.origin, "Id");
				}
				caseEntity.SetDefColumnValues();
				caseEntity.SetColumnValue("Id", caseId);
				caseEntity.SetColumnValue("Subject", "Заказ обратного звонка");
				caseEntity.SetColumnValue("OriginId", caseOrigin != Guid.Empty ? caseOrigin : (Guid?)null);
				caseEntity.SetColumnValue("ContactId", contactId);
				caseEntity.SetColumnValue("RegisteredOn", DateTime.Now);
				try
				{
					caseEntity.Save(false);
				}
				catch (Exception ex)
				{
					response.success = false;
					response.error = ex.Message;
					return response;
				}
			}
			else
			{
				response.success = false;
				response.error = "Contact was not created";
				return response;
			}
			return response;
		}

		public string Reverse(string s)
		{
			char[] charArray = s.ToCharArray();
			Array.Reverse(charArray);
			return new string(charArray);
		}

		public string GetRequestToken()
		{
			var url = String.Empty;
			var userName = String.Empty;
			var password = String.Empty;
			try
			{
				url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUrlForGetToken"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrUrlForGetToken was not found";
			}
			try
			{
				userName = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUserNameForTokenEvaPromo"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrUserNameForTokenEvaPromo was not found";
			}
			try
			{
				password = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrPasswordForTokenEvaPromo"));
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = "SysSetting UsrPasswordForTokenEvaPromo was not found";
			}
			try
			{
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/json";
				httpWebRequest.Method = "POST";
				
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						username = userName,
						password = password
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}

				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					return streamReader.ReadLine();
				}
			}
			catch (Exception ex)
			{
				response.success = false;
				response.error = ex.Message;
			}
			return String.Empty;
		}
		
		public string CleanPhone(string phone)
		{
			Regex digitsOnly = new Regex(@"[^\d]");   
			return digitsOnly.Replace(phone, "");
		}

		public Guid CreateContact(Request request)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
			var contactId = Guid.NewGuid();
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", contactId);
			entity.SetColumnValue("Email", request.email);
			entity.SetColumnValue("MobilePhone", CleanPhone(request.phone));
			entity.SetColumnValue("Name", request.name);
			entity.SetColumnValue("Address", request.address);
			entity.SetColumnValue("UsrIsCreatedFromService", true);
			try
			{
				entity.Save(false);
				Logger.Log("REQUEST: " + request.ToString(), userConnection, "CreateContact " + contactId.ToString());
			}
			catch (Exception ex)
			{
				return Guid.Empty;
			}
			return contactId;
		}
		
		public Guid CreateCity(Request request)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("City").CreateEntity(userConnection);
			var cityId = Guid.NewGuid();
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", cityId);
			entity.SetColumnValue("Name", request.city);
			try
			{
				entity.Save(false);
				Logger.Log("REQUEST: " + request.ToString(), userConnection, "CreateCity " + cityId.ToString());
			}
			catch (Exception ex)
			{
				return Guid.Empty;
			}
			return cityId;
		}

		public Guid CreateContactForActivity(string phone)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
			var contactId = Guid.NewGuid();
			var typeId = GetLookupBpmIdByString("ContactType", "Name", "Контактное лицо", "Id");
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", contactId);
			entity.SetColumnValue("TypeId", typeId != Guid.Empty ? typeId : (Guid?)null);
			entity.SetColumnValue("MobilePhone", CleanPhone(phone));
			entity.SetColumnValue("Surname", "Контакт");
			entity.SetColumnValue("GivenName", phone);
			entity.SetColumnValue("UsrIsCreatedFromService", true);
			try
			{
				entity.Save(false);
				Logger.Log("Phone: " + phone, userConnection, "CreateContactForActivity " + contactId.ToString());
			}
			catch (Exception ex)
			{
				return Guid.Empty;
			}
			return contactId;
		}

		public Guid CreateContactForRegisterCallBack(string phone)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
			var contactId = Guid.NewGuid();
			var typeId = GetLookupBpmIdByString("ContactType", "Name", "Контактное лицо", "Id");
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", contactId);
			entity.SetColumnValue("TypeId", typeId != Guid.Empty ? typeId : (Guid?)null);
			entity.SetColumnValue("MobilePhone", CleanPhone(phone));
			entity.SetColumnValue("Surname", "Клиент");
			entity.SetColumnValue("GivenName", phone);
			entity.SetColumnValue("UsrIsCreatedFromService", true);
			try
			{
				entity.Save(false);
				Logger.Log("Phone: " + phone, userConnection, "CreateContactForRegisterCallBack " + contactId.ToString());
			}
			catch (Exception ex)
			{
				return Guid.Empty;
			}
			return contactId;
		}

		public void ProcessOrderRequest(GetOrderResponse request, long orderId, ref Response response)
		{
			try
			{
				var processError = String.Empty;
				var orderCustomerId = Guid.Empty;
				processError = ProcessCustomerV2(request, ref orderCustomerId);
				if (!String.IsNullOrEmpty(processError))
				{
					response.error = processError;
					response.success = false;
					return;
				}
				processError = ProcessOrder(request, orderId, orderCustomerId);
				if (!String.IsNullOrEmpty(processError))
				{
					response.error = processError;
					response.success = false;
					return;
				}
			}
			catch(Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "NewOrder Service");
			}

		}

		public void UpdateOrder(GetOrderResponse request, long orderId)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Order").CreateEntity(userConnection);
			var orderCheckId = GetLookupBpmIdByInt("Order", "UsrId", request.entity_id, "Id");
			var statusCheckId = GetLookupBpmIdByGuid("Order", "Id", orderCheckId, "StatusId");
			var statusName = GetLookupBpmNameByGuid("OrderStatus", "Id", statusCheckId, "Name");
			if(statusName=="Отменен")
			{
				return;
			}
			if(entity.FetchFromDB("UsrId", request.entity_id))
			{
				var invoiceExpirationDate = DateTime.Now;
				var isInvoiceExpirationDateValid = false;
				isInvoiceExpirationDateValid = DateTime.TryParse(request.extension_attributes.invoice_expiration_date, out invoiceExpirationDate);
				var statusId = GetLookupBpmIdByString("OrderStatus", "UsrCodeIM", request.state, "Id");
				var paymentStatusId = GetLookupBpmIdByString("OrderPaymentStatus", "UsrPaymentStatusCode", request.extension_attributes.wfp_transaction_status , "Id");
				entity.SetColumnValue("UsrInvoice", request.extension_attributes.invoice);
				entity.SetColumnValue("UsrWfpOrder", request.extension_attributes.wfp_order_id);
				entity.SetColumnValue("UsrInvoiceExpireDate", isInvoiceExpirationDateValid == true ? invoiceExpirationDate : DateTime.Now);
				if(statusId!=Guid.Empty)
				{
					entity.SetColumnValue("StatusId", statusId);
				}
				entity.SetColumnValue("PaymentStatusId", paymentStatusId != Guid.Empty ? paymentStatusId : (Guid?)null);
				entity.SetColumnValue("UsrPaymentMethod", request.payment.method);
				try
				{
					entity.Save(false);
				}
				catch (Exception ex)
				{
					Logger.Log(ex.Message, userConnection, "OrderUpdate Service error");
				}
				// if(request.state=="wfp_hold")
				// {
				// 	Guid orderParamId = GetLookupBpmIdByInt("Order", "UsrId", request.entity_id, "Id");
				// 	if(orderParamId!=Guid.Empty)
				// 	{
						// var processSchema = userConnection.ProcessSchemaManager.GetInstanceByName("UsrSendSMSOnHoldOrder");
						// var flowEngine = new FlowEngine(userConnection);
						// Dictionary<string, string> parameter = new Dictionary<string, string>();
						// parameter.Add("OrderIdGuid", orderParamId.ToString());
						// flowEngine.RunProcess(processSchema, parameter);
					//}
				//}
			}
			else
			{
				Logger.Log("Заказ ИД: " + orderId.ToString() + " не найден!", userConnection, "OrderUpdate Service error");
			}
		}
		public string ProcessOrder(GetOrderResponse request, long orderId, Guid contactId)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Order").CreateEntity(userConnection);
			var orderPorductError = (string)null;
			var isForUpdate = false;
			var orderEntityId = Guid.Empty;
			var statusId = Guid.Empty;
			var orderCancelReason = Guid.Empty;
			var createdOn = DateTime.Now;
			var invoiceExpirationDate = DateTime.Now;
			var isCreatedOnValid = false;
			var isInvoiceExpirationDateValid = false;
			isInvoiceExpirationDateValid = DateTime.TryParse(request.extension_attributes.invoice_expiration_date, out invoiceExpirationDate);
			isCreatedOnValid = DateTime.TryParse(request.extension_attributes.created_at_eet, out createdOn);
			var productEntityId = Guid.Empty;
			var optReliabilityId = GetLookupBpmIdByString("UsrCustomerReliability", "Name", "ОПТ", "Id");
			var contactReliabilityId = GetLookupBpmIdByGuid("Contact", "Id", contactId, "UsrReliabilityid");
			if(contactReliabilityId == optReliabilityId)
			{
				statusId = GetLookupBpmIdByString("OrderStatus", "Name", "Отменен", "Id");
				orderCancelReason = GetLookupBpmIdByString("UsrOrderCancelReason", "Name", "Оптовый покупатель", "Id");
			}
			else
			{
				statusId = GetLookupBpmIdByString("OrderStatus", "UsrCodeIM", request.state, "Id");
			}
			var paymentStatusId = GetLookupBpmIdByString("OrderPaymentStatus", "UsrPaymentStatusCode", request.extension_attributes.wfp_transaction_status , "Id");
			var parentId = request.original_increment_id != null ? GetLookupBpmIdByString("Order", "Number", request.original_increment_id, "Id") : Guid.Empty;
			var parentUpdateId = request.relation_parent_real_id != null ? GetLookupBpmIdByString("Order", "Number", request.relation_parent_real_id, "Id") : Guid.Empty;
			var city = request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.city : String.Empty;
			var deliveryServiceId = GetLookupBpmIdByString("UsrDeliveryService", "UsrIMCode", request.extension_attributes.shipping_assignments[0].shipping.method, "Id");
			var deliveryTypeId = GetLookupBpmIdByString("UsrDeliveryService", "UsrIMCode", request.extension_attributes.shipping_assignments[0].shipping.method, "UsrDeliveryTypeId");
			var orderProductId = Guid.Empty;
			var repackagedStatusId = GetLookupBpmIdByString("OrderStatus", "UsrCode", "6", "Id");
			string webLang = request.store_name;
			var separateWebLang = webLang.Split('\n');
			var typeId = new Guid("BD36F392-3143-4251-829B-7BB5F65EBAF9");// Клиентский
			try
			{
				isForUpdate = entity.FetchFromDB("UsrId", orderId);
			}
			catch (Exception ex)
			{
				return "There are more than one order with the same id";
			}
			if(isForUpdate)
			{
				return String.Empty;
			}
			orderEntityId = Guid.NewGuid();
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", orderEntityId);
			entity.SetColumnValue("UsrId", orderId);
			entity.SetColumnValue("CreatedOn", isCreatedOnValid == true ? createdOn : DateTime.Now);
			entity.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
			entity.SetColumnValue("UsrOrderCancelReasonId", orderCancelReason != Guid.Empty ? orderCancelReason : (Guid?)null);
			entity.SetColumnValue("UsrWebsiteCode", request.store_id.ToString());
			entity.SetColumnValue("UsrWebsiteLanguage", separateWebLang[2]);
			entity.SetColumnValue("UsrPaymentMethod", request.payment.method);
			entity.SetColumnValue("UsrInvoice", request.extension_attributes.invoice);
			entity.SetColumnValue("UsrInvoiceExpireDate", isInvoiceExpirationDateValid == true ? invoiceExpirationDate : DateTime.Now);
			entity.SetColumnValue("UsrWfpOrder", request.extension_attributes.wfp_order_id);
			entity.SetColumnValue("ContactId", contactId);
			entity.SetColumnValue("ContactNumber", request.extension_attributes.shipping_assignments[0].shipping.address.telephone);
			entity.SetColumnValue("ReceiverName", String.Join(" ", new string[] { request.extension_attributes.shipping_assignments[0].shipping.address.lastname, request.extension_attributes.shipping_assignments[0].shipping.address.firstname, request.extension_attributes.shipping_assignments[0].shipping.address.middlename}));
			//entity.SetColumnValue("PaymentStatusId", GetOrderPaymentStatus(request.items));
			entity.SetColumnValue("PaymentStatusId", paymentStatusId != Guid.Empty ? paymentStatusId : (Guid?)null);
			entity.SetColumnValue("Number", request.increment_id);
			entity.SetColumnValue("UsrParentId", parentId != Guid.Empty ? parentId : (Guid?)null);
			entity.SetColumnValue("UsrCostDelivery", request.shipping_amount);
			entity.SetColumnValue("UsrDeliveryServiceId", deliveryServiceId != Guid.Empty ? deliveryServiceId : (Guid?)null);
			entity.SetColumnValue("DeliveryTypeId", deliveryTypeId != Guid.Empty ? deliveryTypeId : (Guid?)null);
			entity.SetColumnValue("UsrWeight", request.weight);
			entity.SetColumnValue("UsrNotificationNumber", CleanPhone(request.billing_address.telephone));
			//entity.SetColumnValue("UsrAddress", GetOrderStreet(request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.name : String.Empty));
			//entity.SetColumnValue("UsrHouse", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.house_number : String.Empty);
			//entity.SetColumnValue("UsrApartment", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.apt_number : String.Empty);
			entity.SetColumnValue("UsrAddress", GetOrderStreet(request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.name));
			entity.SetColumnValue("UsrHouse", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.house_number);
			entity.SetColumnValue("UsrApartment", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street.apt_number);
			entity.SetColumnValue("UsrCity", city);
			entity.SetColumnValue("UsrTypeId", typeId != Guid.Empty ? typeId : (Guid?)null);
			entity.SetColumnValue("Amount", request.grand_total);
			entity.SetColumnValue("PaymentAmount", request.grand_total);
			entity.SetColumnValue("UsrCall", request.extension_attributes.call == 1 ? true : false);
			entity.SetColumnValue("UsrCityCode", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.city_id : String.Empty);
			entity.SetColumnValue("UsrStreetCode", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.street_id : String.Empty);
			entity.SetColumnValue("UsrRegionCode", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.region_id : String.Empty);
			entity.SetColumnValue("UsrDeliveryDepartment", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.warehouse_number.ToString() : String.Empty);
			entity.SetColumnValue("Comment", request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes != null ? request.extension_attributes.shipping_assignments[0].shipping.address.extension_attributes.comment : String.Empty);
			
			try
			{
				entity.Save(false);
				orderEntityId = entity.GetTypedColumnValue<Guid>("Id");
				if (parentUpdateId != Guid.Empty)
				{
					UpdateTableLookupColumn("Order", "StatusId", parentUpdateId, repackagedStatusId);// пересобран
					
					// var manager = userConnection.ProcessSchemaManager; 
					// var processSchema = manager.GetInstanceByName("UsrInformingClientIfOrderRebuilt");
					// var flowEngine = new FlowEngine(userConnection);
					// Dictionary<string, string> parameter = new Dictionary<string, string>();
					// parameter.Add("OrderId", orderEntityId.ToString());
					// flowEngine.RunProcess(processSchema, parameter);
				}
				foreach (var item in request.items)
				{
					var currentItem = item.parent_item != null ? item.parent_item : item;
					if(currentItem.product_type != "simple" && item.parent_item == null)
					{
						continue;
					}
					orderPorductError = ProcessOrderItem(orderEntityId, currentItem, request.extension_attributes.is_in_set, ref productEntityId, ref orderProductId);
					if(orderPorductError != null)
					{
						return orderPorductError;
					}
					if(currentItem.ExtensionAttributes.discounts == null) 
					{
						continue;
					}
					ProcessDiscounts(currentItem.ExtensionAttributes.discounts, orderEntityId, productEntityId, orderProductId, currentItem.ExtensionAttributes.order_item_number, currentItem.sku, currentItem);
				}
			}
			catch (Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "NewOrder Service");
				return ex.Message;
			}

			return null;
		}
		

		public string ProcessOrderItem(Guid orderId, OrderItem item, long? isInSet, ref Guid productEntityId, ref Guid orderProductId)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("OrderProduct").CreateEntity(userConnection);
			productEntityId = GetLookupBpmIdByString("Product", "Code", item.sku, "Id");
			var format = GetLookupBpmNameByGuid("Product", "Id", productEntityId, "UsrFormat");
			orderProductId = Guid.NewGuid();
			entity.SetDefColumnValues();
			entity.SetColumnValue("Id", orderProductId);
			entity.SetColumnValue("UsrSKU", item.sku);
			entity.SetColumnValue("Name", item.name);
			entity.SetColumnValue("Price", item.price);
			entity.SetColumnValue("Quantity", item.qty_ordered);
			entity.SetColumnValue("OrderId", orderId);
			entity.SetColumnValue("ProductId", productEntityId != Guid.Empty ? productEntityId : (Guid?)null);
			entity.SetColumnValue("UsrFormat", format);
			entity.SetColumnValue("TotalAmount", item.row_total_discounted);
			entity.SetColumnValue("UsrAction", item.applied_rule_ids);
			entity.SetColumnValue("UsrIsInSet", item.ExtensionAttributes != null ? (item.ExtensionAttributes.discounts.Count != 0 ?(item.ExtensionAttributes.discounts[0].rule_set_id != null ? item.ExtensionAttributes.discounts[0].rule_set_id : 0) : 0) : 0);
			entity.SetColumnValue("UsrOrderItemNumber", item.ExtensionAttributes != null ? (item.ExtensionAttributes.order_item_number) : 0L);
			entity.SetColumnValue("UsrRowWeight", item.row_weight);
			entity.SetColumnValue("UsrOriginalPrice", item.original_price);
			entity.SetColumnValue("UsrDiscountedPrice", item.ExtensionAttributes != null ? (item.ExtensionAttributes.price_discounted) : 0m);
			entity.SetColumnValue("DiscountAmount", item.discount_amount);
			//entity.SetColumnValue("Amount", item.row_total);
			entity.SetColumnValue("UsrAmountPrice", item.row_total);
			entity.SetColumnValue("UsrAmountPriceDiscount", item.ExtensionAttributes != null ? (item.ExtensionAttributes.row_total_discounted) : 0m);
			try
			{
				entity.Save(false);
				orderProductId = entity.GetTypedColumnValue<Guid>("Id");
			}
			catch (Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "NewOrder Service");
				return ex.Message;
			}
			return null;
		}

		public string ProcessCustomer(GetOrderResponse request, ref Guid contactId)
		{
			var cleanedPhone = CleanPhone(request.billing_address.telephone);
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
			contactId = GetLookupBpmIdByString("Contact", "UsrIMCode", request.customer_id.ToString(), "Id");
			var typeId = GetLookupBpmIdByString("ContactType", "Name", "Клиент", "Id");
			var cityId = GetLookupBpmIdByString("City", "Name", request.extension_attributes.customer_city, "Id");
			var loyaltyCard = 0;
			var isLoyaltyCard = Int32.TryParse(request.extension_attributes.loyalty_card, out loyaltyCard);
			if (contactId == Guid.Empty)
			{
				contactId = GetLookupBpmIdByString("Contact", "UsrNumberActiveCard", request.extension_attributes.loyalty_card, "Id");
				if(contactId != Guid.Empty)
				{
					UpdateTableStringColumn("Contact", "UsrIMCode", contactId, request.customer_id.ToString());
					InsertMobilePhoneToContactCommunication(contactId, cleanedPhone);
				}
				else
				{
					var searchNumberLength = Convert.ToInt32(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "SearchNumberLength"));
					var searchNumber = Reverse(cleanedPhone);
					searchNumber = searchNumber.Substring(0, searchNumberLength > searchNumber.Length ? searchNumber.Length : searchNumberLength);
					contactId = GetContactIdByReversedPhone(searchNumber, userConnection);
					if(contactId != Guid.Empty)
					{
						UpdateTableStringColumn("Contact", "UsrIMCode", contactId, request.customer_id.ToString());
						//InsertMobilePhoneToContactCommunication(contactId, request.billing_address.telephone);
					}
					else
					{
						var contactCreate = new Request();
						contactCreate.email = request.customer_email;
						contactCreate.phone = cleanedPhone;
						contactCreate.name = String.Join(" ", new string[] { request.billing_address.firstname, request.billing_address.lastname, request.billing_address.middlename });
						contactId = CreateContact(contactCreate);	
						UpdateTableStringColumn("Contact", "UsrIMCode", contactId, request.customer_id.ToString());
					}
				}
			}
			if(!entity.FetchFromDB(contactId))
			{
				entity.SetDefColumnValues();
				entity.SetColumnValue("Id", contactId);
			}
			entity.SetColumnValue("TypeId", typeId != Guid.Empty ? typeId : (Guid?)null);
			entity.SetColumnValue("MobilePhone", cleanedPhone);
			entity.SetColumnValue("Surname", request.customer_firstname);
			entity.SetColumnValue("MiddleName", request.billing_address.middlename);
			entity.SetColumnValue("GivenName", request.customer_lastname);
			entity.SetColumnValue("Email", request.customer_email);
			entity.SetColumnValue("CityId", cityId != Guid.Empty ? cityId : (Guid?)null);
			entity.SetColumnValue("BirthDate", GetDateFromString(request.customer_dob));
			entity.SetColumnValue("UsrNumberActiveCard", isLoyaltyCard == true ? loyaltyCard : 0);
			entity.SetColumnValue("Zip", request.extension_attributes.shipping_assignments[0].shipping.address.postcode);
			entity.SetColumnValue("AddressTypeId", UsrConstantsServer.AddressType.Shipping);
			entity.SetColumnValue("UsrIMCode", request.customer_id);
			try
			{
				entity.Save(false);
			}
			catch (Exception ex)
			{
				Logger.Log(ex.Message, userConnection, "NewOrder Service");
				return ex.Message;
			}
			return null;
		}
		
		public string ProcessCustomerV2(GetOrderResponse request, ref Guid contactId)
		{
			var cleanedPhone = CleanPhone(request.billing_address.telephone);
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
			contactId = GetLookupBpmIdByString("Contact", "UsrIMCode", request.customer_id.ToString(), "Id");
			var typeId = GetLookupBpmIdByString("ContactType", "Name", "Клиент", "Id");
			var cityId = GetLookupBpmIdByString("City", "Name", request.extension_attributes.customer_city, "Id");
			if (contactId == Guid.Empty)
			{
				contactId = GetLookupBpmIdByString("Contact", "UsrNumberActiveCard", request.extension_attributes.loyalty_card, "Id");
				if(contactId != Guid.Empty)
				{
					UpdateTableStringColumn("Contact", "UsrIMCode", contactId, request.customer_id.ToString());
				}
				else
				{
					var searchNumberLength = Convert.ToInt32(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "SearchNumberLength"));
					var searchNumber = Reverse(cleanedPhone);
					searchNumber = searchNumber.Substring(0, searchNumberLength > searchNumber.Length ? searchNumber.Length : searchNumberLength);
					contactId = GetContactIdByReversedPhone(searchNumber, userConnection);
					if(contactId != Guid.Empty)
					{
						UpdateTableStringColumn("Contact", "UsrIMCode", contactId, request.customer_id.ToString());
					}
					else
					{
						entity.SetDefColumnValues();
						entity.SetColumnValue("TypeId", typeId != Guid.Empty ? typeId : (Guid?)null);
						entity.SetColumnValue("MobilePhone", cleanedPhone);
						entity.SetColumnValue("Surname", request.billing_address.lastname);
						entity.SetColumnValue("GivenName", request.billing_address.firstname);
						entity.SetColumnValue("MiddleName", request.billing_address.middlename);
						entity.SetColumnValue("AccountName", request.billing_address.lastname + " " + request.billing_address.firstname + " " + request.billing_address.middlename);
						entity.SetColumnValue("Email", request.customer_email);
						entity.SetColumnValue("CityId", cityId != Guid.Empty ? cityId : (Guid?)null);
						entity.SetColumnValue("BirthDate", GetDateFromString(request.customer_dob));
						entity.SetColumnValue("UsrNumberActiveCard", request.extension_attributes.loyalty_card);
						entity.SetColumnValue("Zip", request.extension_attributes.shipping_assignments[0].shipping.address.postcode);
						entity.SetColumnValue("AddressTypeId", UsrConstantsServer.AddressType.Shipping);
						entity.SetColumnValue("UsrIMCode", request.customer_id);
						entity.SetColumnValue("UsrIsCreatedFromService", true);
						try
						{
							entity.Save(false);
							contactId = entity.GetTypedColumnValue<Guid>("Id");
							Logger.Log("", userConnection, "ProcessCustomerV2 " + contactId.ToString());
						}
						catch (Exception ex)
						{
							Logger.Log(ex.Message, userConnection, "NewOrder Service");
							return ex.Message;
						}	
					}
				}
			}
			InsertMobilePhoneToContactCommunication(contactId, cleanedPhone);
			return null;
		}

		public string ProcessDiscounts(List<Discount> discounts, Guid orderId, Guid productId, Guid orderProductId, long? orderItemNumber, string sku, OrderItem item)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrShares").CreateEntity(userConnection);
			var entityId = Guid.NewGuid();
			foreach (var discount in discounts)
			{ 
				entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrShares").CreateEntity(userConnection);
				entityId = Guid.NewGuid();
				entity.SetDefColumnValues();
				entity.SetColumnValue("Id", entityId);
				entity.SetColumnValue("UsrOrderProductId", orderProductId);
				entity.SetColumnValue("UsrRuleId", discount.rule_id);
				entity.SetColumnValue("UsrRuleName", discount.rule_name);
				entity.SetColumnValue("UsrPrice", discount.price);
				entity.SetColumnValue("UsrAmountPrice", discount.row_total);
				entity.SetColumnValue("UsrDiscountPercent", discount.discount_percent);
				entity.SetColumnValue("UsrDiscount", discount.discount_amount);
				entity.SetColumnValue("UsrPriceDiscounted", discount.price_discounted);
				entity.SetColumnValue("UsrRuleSetId", discount.rule_set_id);
				entity.SetColumnValue("UsrProductSharesId", productId != Guid.Empty ? productId : (Guid?)null);
				entity.SetColumnValue("UsrOrderSharesId", orderId);
				entity.SetColumnValue("UsrOrderItemNumber", orderItemNumber);
				entity.SetColumnValue("UsrSKU", sku);
				entity.SetColumnValue("UsrQuantity", discount.qty);
				entity.SetColumnValue("UsrDiscountAmount", discount.row_discount_amount);
				entity.SetColumnValue("UsrAmountPriceDiscounted", discount.row_total_discounted);
				entity.SetColumnValue("UsrSetId", discount.rule_set_id);
				try
				{
					entity.Save(false);
				}
				catch (Exception ex)
				{
					Logger.Log(ex.Message, userConnection, "NewOrder Service");
					return ex.Message;
				}
			}
			return String.Empty;
		}

		public Dictionary<Guid, RecordResult> GetAcceptedCallsCount(DateTime start, DateTime end)
		{
			var result = new Dictionary<Guid, RecordResult>();
			var inDirectionCall = new Guid("1D96A65F-2131-4916-8825-2D142B1000B2");
			var contactId = Guid.Empty;
			var contactName = String.Empty;
			var count = 0;
			var select = new Select(userConnection)
			.Column("Contact", "Id").As("ContactId")
			.Column("Contact", "Name").As("ContactName")
			.Column(Func.Count("Contact", "Id")).As("ResultCount")
			.From("Call")
			.LeftOuterJoin("Contact").On("Call", "CreatedById").IsEqual("Contact", "Id")
			.Where("Call", "DirectionId").IsEqual(Terrasoft.Core.DB.Column.Parameter(inDirectionCall))
			.And("Call", "CreatedById").Not().IsNull()
			.And("Call", "TalkTime").IsGreater(Terrasoft.Core.DB.Column.Const(2))
			.And("Call", "CreatedOn").IsGreaterOrEqual(Terrasoft.Core.DB.Column.Parameter(start))
			.And("Call", "CreatedOn").IsLessOrEqual(Terrasoft.Core.DB.Column.Parameter(end))
			.GroupBy("Contact", "Id").GroupBy("Contact", "Name") as Select;
			using (var dbExecutor = userConnection.EnsureDBConnection())
			{
				using (var reader = select.ExecuteReader(dbExecutor))
				{
					while (reader.Read())
					{
						contactId = userConnection.DBTypeConverter.DBValueToGuid(reader[0]);
						contactName = reader.GetString(1);
						count = userConnection.DBTypeConverter.DBValueToInt(reader[2]);
						result.Add(userConnection.DBTypeConverter.DBValueToGuid(reader[0]), new RecordResult()
						{
							name = contactName,
							count = count
						});
					}
				}
			}
			return result;
		}

		public Dictionary<Guid, RecordResult> GetSiteCasesCount(DateTime start, DateTime end)
		{
			var result = new Dictionary<Guid, RecordResult>();
			var inWorkStatus = new Guid("7E9F1204-F46B-1410-FB9A-0050BA5D6C38");
			var inWaitAnswerStatus = new Guid("3859C6E7-CBCB-486B-BA53-77808FE6E593");
			var inCloseStatus = new Guid("3E7F420C-F46B-1410-FC9A-0050BA5D6C38");
			var siteOrigin = new Guid("D38A1692-5A83-4253-A592-7D19FE00593C");
			var contactId = Guid.Empty;
			var contactName = String.Empty;
			var count = 0;
			var select = new Select(userConnection)
			.Column("Contact", "Id").As("ContactId")
			.Column("Contact", "Name").As("ContactName")
			.Column(Func.Count("Contact", "Id")).As("ResultCount")
			.From("Case")
			.LeftOuterJoin("Contact").On("Case", "UsrOperatorNameId").IsEqual("Contact", "Id")
			.Where("Case", "StatusId").In(Terrasoft.Core.DB.Column.Parameters(
				new Guid[]
				{
					inWorkStatus,
					inWaitAnswerStatus,
					inCloseStatus
				}
				))
			.And("UsrOperatorNameId").Not().IsNull()
			.And("Case", "OriginId").IsEqual(Terrasoft.Core.DB.Column.Parameter(siteOrigin))
			.GroupBy("Contact", "Id").GroupBy("Contact", "Name") as Select;
			using (var dbExecutor = userConnection.EnsureDBConnection())
			{
				using (var reader = select.ExecuteReader(dbExecutor))
				{
					while (reader.Read())
					{
						contactId = userConnection.DBTypeConverter.DBValueToGuid(reader[0]);
						contactName = reader.GetString(1);
						count = userConnection.DBTypeConverter.DBValueToInt(reader[2]);
						result.Add(userConnection.DBTypeConverter.DBValueToGuid(reader[0]), new RecordResult()
						{
							name = contactName,
							count = count
						});
					}
				}
			}
			return result;
		}

		public Dictionary<Guid, RecordResult> GetOperatorActivitiesCount(DateTime start, DateTime end)
		{
			var result = new Dictionary<Guid, RecordResult>();
			var contactId = Guid.Empty;
			var contactName = String.Empty;
			var count = 0;
			var select = new Select(userConnection)
			.Column("Contact", "Id").As("ContactId")
			.Column("Contact", "Name").As("ContactName")
			.Column(Func.Count("Contact", "Id")).As("ResultCount")
			.From("Activity")
			.LeftOuterJoin("Contact").On("Activity", "OwnerId").IsEqual("Contact", "Id")
			.Where("Activity", "OwnerId").Not().IsNull()
			.GroupBy("Contact", "Id").GroupBy("Contact", "Name") as Select;
			using (var dbExecutor = userConnection.EnsureDBConnection())
			{
				using (var reader = select.ExecuteReader(dbExecutor))
				{
					while (reader.Read())
					{
						contactId = userConnection.DBTypeConverter.DBValueToGuid(reader[0]);
						contactName = reader.GetString(1);
						count = userConnection.DBTypeConverter.DBValueToInt(reader[2]);
						result.Add(userConnection.DBTypeConverter.DBValueToGuid(reader[0]), new RecordResult()
						{
							name = contactName,
							count = count
						});
					}
				}
			}
			return result;
		}

		public Guid WriteLog(DateTime requestTime, string requestBody, string errors)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrServiceLog").CreateEntity(userConnection);
			entity.SetDefColumnValues();
			entity.SetColumnValue("UsrRequestTime", requestTime);
			entity.SetColumnValue("UsrRequestBody", requestBody);
			entity.SetColumnValue("UsrErrors", errors);
			try
			{
				entity.Save();
				return entity.GetTypedColumnValue<Guid>("Id");
			}
			catch(Exception ex)
			{
				return Guid.Empty;
			}
		}
		
		public Guid InsertCaseFile(Guid caseId, string name, Guid typeId)
		{
			if(String.IsNullOrEmpty(name))
			{
				return Guid.Empty;
			}
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("CaseFile").CreateEntity(userConnection);
			entity.SetDefColumnValues();
			entity.SetColumnValue("Name", name);
			entity.SetColumnValue("TypeId", typeId);
			entity.SetColumnValue("CaseId", caseId);
			try
			{
				entity.Save();
				return entity.GetTypedColumnValue<Guid>("Id");
			}
			catch(Exception ex)
			{
				return Guid.Empty;
			}
		}
		public string GetStringByString(string table, string column, string value, string columnReturn)
		{
		  if (value == String.Empty || value == null)
		  {
		    return String.Empty;
		  }
		  var lookupBPMId = (new Select(userConnection).Top(1)
		    .Column(columnReturn)
		    .From(table)
		    .Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<string>();
		  return lookupBPMId;
		}
		
		public string GetContactActiveCardNumber(Guid contactId)
		{
			var card = (new Select(userConnection).Top(1)
				.Column("UsrNumberActiveCard")
				.From("Contact")
				.Where("Id").IsEqual(Terrasoft.Core.DB.Column.Parameter(contactId)) as Select).ExecuteScalar<string>();
			return card;
		}
		
		public void UpdateLog(string errors,Guid logId)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrServiceLog").CreateEntity(userConnection);
			if(entity.FetchFromDB(logId))
			{
				entity.SetColumnValue("UsrErrors", errors);
				try
				{
					entity.Save();
				}
				catch(Exception ex)
				{
				}
			}
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
		public string GetLookupStringByString(string table, string column, string value, string columnReturn)
		{
			if (value == String.Empty || value == null)
			{
				return String.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<string>();
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
		public Guid GetNewestActivity(string table, string column, string value, string columnReturn)
		{
			if (value == String.Empty || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value))
				.OrderByDesc("CreatedOn") as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}

		public Guid GetLookupBpmIdByLong(string table, string column, long? value, string columnReturn)
		{
			if (value == 0L || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		public Guid GetSimilarActivityByContact(Guid contact)
		{
			if (contact == Guid.Empty || contact == null)
			{
				return Guid.Empty;
			}
			string DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
			var startDate = DateTime.Now.AddHours(-2).AddMinutes(-1).ToString(DATE_FORMAT);
			var endDate = DateTime.Now.AddHours(-2).AddMinutes(1).ToString(DATE_FORMAT);
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column("Id")
				.From("Case")
				.Where("CreatedOn").IsBetween(Terrasoft.Core.DB.Column.Parameter(startDate)).And(Terrasoft.Core.DB.Column.Parameter(endDate))
				.And("ContactId").IsEqual(Terrasoft.Core.DB.Column.Parameter(contact)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		public Guid GetLookupBpmIdByInt(string table, string column, int? value, string columnReturn)
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

		public DateTime? GetDateFromString(string value)
		{
			var date = DateTime.Now;
			var isDate = DateTime.TryParse(value, out date);
			return isDate == true ? date : (DateTime?)null;
		}

		public Guid? GetOrderPaymentStatus(List<OrderItem> items)
		{
			var paymentStatusId = new Guid("4721338E-A5F1-4529-96BE-D3F311518812");
			var notPaymentStatusId = new Guid("448D1338-D3A5-4FD4-9A6E-769403F89896");
			var ithNotEqualOrderedAndInvoicedItemsCount = items.Count(i => i.qty_invoiced == i.qty_ordered);
			var allItemsInvoicedGreaterZero = items.Any(i => i.qty_invoiced > 0);
			if(!allItemsInvoicedGreaterZero)
			{
				return notPaymentStatusId;
			}
			if(ithNotEqualOrderedAndInvoicedItemsCount == items.Count)
			{
				return paymentStatusId;
			}
			return (Guid?)null;
		}

		public string UpdateTableLookupColumn(string table, string column, Guid recordId, Guid columnValue)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName(table).CreateEntity(userConnection);
			try
			{
				if (entity.FetchFromDB(recordId))
				{
					entity.SetColumnValue(column, columnValue);
					entity.Save(false);
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			return String.Empty;
		}

		public string UpdateTableStringColumn(string table, string column, Guid recordId, string columnValue)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName(table).CreateEntity(userConnection);
			try
			{
				if (entity.FetchFromDB(recordId))
				{
					entity.SetColumnValue(column, columnValue);
					entity.Save(false);
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			return String.Empty;
		}

		public string InsertMobilePhoneToContactCommunication(Guid contactId, string phone)
		{
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("ContactCommunication").CreateEntity(userConnection);
			try
			{
				var entityConditions = new Dictionary<string, object>() {
					{ "Contact", contactId },
					{ "Number", phone},
				};
				
				if(entity.FetchFromDB(entityConditions))
				{
					return String.Empty;
				}
				entity.SetDefColumnValues();
				entity.SetColumnValue("ContactId", contactId);
				entity.SetColumnValue("Number", phone);
				entity.SetColumnValue("CommunicationTypeId", new Guid("D4A2DC80-30CA-DF11-9B2A-001D60E938C6"));
				entity.Save(false);
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			return String.Empty;
		}
		
		public string GetOrderStreet(string streetResponse)
		{
			var splitResponse = streetResponse.Split(':');
			if(splitResponse.Length > 1)
			{
				return splitResponse[1];
			}
			return splitResponse[0];
		}
		
		public string GetOrderHouse(string streetResponse)
		{
			var splitResponse = streetResponse.Split(':');
			if(splitResponse.Length > 1)
			{
				var splitAddress = splitResponse[1].Split(',');
				return splitAddress.Length > 1 ? splitAddress[1] : String.Empty; 
			}
			var splitStreet = splitResponse[0].Split(',');
			return splitStreet.Length > 1 ? splitStreet[1] : String.Empty; 
		}
		
		public string GetOrderApartment(string streetResponse)
		{
			var splitResponse = streetResponse.Split(':');
			if(splitResponse.Length > 1)
			{
				var splitAddress = splitResponse[1].Split(',');
				return splitAddress.Length > 2 ? splitAddress[2] : String.Empty; 
			}
			var splitStreet = splitResponse[0].Split(',');
			return splitStreet.Length > 2 ? splitStreet[2] : String.Empty; 
		}
		
		public string GetPlainText(string value)
		{
			var stylesScripts = new Regex(
			"(\\<script(.+?)\\</script\\>)|(\\<style(.+?)\\</style\\>)", 
			RegexOptions.Singleline | RegexOptions.IgnoreCase
			);
			value = stylesScripts.Replace(value, "");
			value = Regex.Replace(value, "<(.|\n)*?>", String.Empty);
			value = value.Replace(" ", "");
			value = value.Replace("\t", "");
			value = value.Replace("\n", "");
			value = value.Replace("\r\n", "");
			value = value.Replace("\r", "");
			while(value.IndexOf("  ") > 0)
			{
				value = value.Replace("  ", "");
			}
			return value;
		}
		
		public Guid GetContactIdByReversedPhone(string phone, UserConnection userConnection)
		{
			var esq = new EntitySchemaQuery(userConnection.EntitySchemaManager, "ContactCommunication");
			esq.AddColumn("Contact");
			var startWithFilter = esq.CreateFilterWithParameters(FilterComparisonType.StartWith, "SearchNumber", phone);
			esq.Filters.Add(startWithFilter);
			EntitySchemaQueryOptions options = new EntitySchemaQueryOptions {
				PageableDirection = PageableSelectDirection.First,
				PageableRowCount = 1,
				PageableConditionValues = new Dictionary<string, object>()
			};
			var entities = esq.GetEntityCollection(userConnection, options);
			if(entities.Count == 1)
			{
				return entities[0].GetTypedColumnValue<Guid>("ContactId");
			}
			return Guid.Empty;
		}
		
		public decimal GetLookupBpmDecimalByGuid(string table, string column, Guid value, string columnReturn)
		{
			if (value == Guid.Empty || value == null)
			{
				return 0;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<decimal>();
			return lookupBPMId;
		}
		
		public string GetTextSMS(int daysCount, string orderNum, string language, string toDate, Guid deliveryTypeId, string paymentMethod, decimal sum)
		{
			var text = "";
			var delByCourier = new Guid("50DF77D0-7B1F-4DBC-A02D-7B6EBB95DFD0");
			var delPickup = new Guid("AB31305F-7C6D-4158-BD0A-760AC7897755");
			var delPickupEva = new Guid("43B4F6B9-1122-4460-A5FB-15B60A81E3AD");
			var delPickupEvaNP = new Guid("8C1423AC-7ED3-46F0-8E99-401CCD25937F");
			if(language == "Рус")
			{
				if((paymentMethod == "checkmo" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEvaNP) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEva))
				{
					text = "Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня. Срок хранения до " + toDate;
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEvaNP)
				{
					text = "Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня. К оплате "+ sum +" грн. Внимание! В точке самовывоза оплата возможна только через приложение Новой Почты. Срок хранения до "+ toDate;
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEva)
				{
					text = "Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня. К оплате "+ sum +" грн. Срок хранения до "+ toDate;
				}
			}
			else
			{
				if((paymentMethod == "checkmo" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEvaNP) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEva))
				{
					text = "Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день.Термін зберігання - до "+ toDate +".";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEvaNP)
				{
					text = "Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день."+ sum +" грн до сплати. Увага! Оплата в точці самовивозу можлива лише через додаток Нової Пошти. Термін зберігання - до "+ toDate +".";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEva)
				{
					text = "Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день."+ sum +" грн до сплати. Термін зберігання - до "+ toDate +".";
				}
			}
			return text;
		}
		
		public string GetTextViber(int daysCount, string orderNum, string language, string toDate, Guid deliveryTypeId, string paymentMethod, string name, string ttn, decimal sum)
		{
			var text = "";
			var delByCourier = new Guid("50DF77D0-7B1F-4DBC-A02D-7B6EBB95DFD0");
			var delPickup = new Guid("AB31305F-7C6D-4158-BD0A-760AC7897755");
			var delPickupEva = new Guid("43B4F6B9-1122-4460-A5FB-15B60A81E3AD");
			var delPickupEvaNP = new Guid("8C1423AC-7ED3-46F0-8E99-401CCD25937F");
			if(language == "Рус")
			{
				if((paymentMethod == "checkmo" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEvaNP))
				{
					text = "(checkmark) Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня.\n\n (!) Номер отправления "+ ttn +".\n(!) Срок хранения до "+ toDate +".\n\n(orange_heart) Отличного дня, "+ name +"!";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEva)
				{
					text = "(checkmark) Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня. \n\n($) "+ sum +" грн к оплате.\n(!) Срок хранения до "+ toDate +".\n\n(orange_heart) Отличного дня, "+ name +"!";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEvaNP)
				{
					text = "(checkmark) Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня. \n\n(!) Номер отправления "+ ttn +".\n($) "+ sum +" грн к оплате.\n(!) Внимание! В точке самовывоза оплата возможна только через приложение Новой Почты.\n(!) Срок хранения до "+ toDate +".\n\n(orange_heart) Отличного дня, "+ name +"!";
				}
				else if(paymentMethod == "wayforpay" && deliveryTypeId == delPickupEva)
				{
					text = "(checkmark) Ваш заказ №"+ orderNum +" от eva.ua ожидает Вас уже "+ daysCount +" дня.\n\n (!) Срок хранения до "+ toDate +".\n\n(orange_heart) Отличного дня, "+ name +"!";
				}
			}
			else
			{
				if((paymentMethod == "checkmo" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickup) || (paymentMethod == "wayforpay" && deliveryTypeId == delPickupEvaNP))
				{
					text = "(checkmark) Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день.\n\n (!) Номер відправлення "+ ttn +". \n(!) Термін зберігання до "+ toDate +". \n\n(orange_heart) Чекаємо на вас, "+ name +"!";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEva)
				{
					text = "(orange_heart) Гарного дня, "+ name +"! \n\n(checkmark) Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день. \n\n(!) Термін зберігання до "+ toDate +".";
				}
				else if(paymentMethod == "checkmo" && deliveryTypeId == delPickupEvaNP)
				{
					text = "(checkmark) Ваше замовлення №"+ orderNum +" від eva.ua очікує Вас "+ daysCount +"-й день.\n\n (!) Номер відправлення "+ ttn +".\n (!) Увага! Оплата в точці самовивозу можлива лише через додаток Нової Пошти. \n(!) Термін зберігання до "+ toDate +". \n\n(orange_heart) Чекаємо на вас, "+ name +"!";
				}
				else if(paymentMethod == "wayforpay" && deliveryTypeId == delPickupEva)
				{
					text = "(checkmark) Ваше замовлення №7123456 від eva.ua очікує Вас "+ daysCount +"-й день.\n\n(!) Термін зберігання до "+ toDate +".\n\n(orange_heart) Чекаємо на вас, "+ name +"!";
				}
			}
			return text;
		}
		
		public bool CheckifSMSIsSent(string orderNumber)
		{
			var sel = new Select(userConnection)
				.Column("Id")
				.From("Activity")
            	.Where("orderId").IsEqual(Column.Parameter((
            		new Select(userConnection)
            			.Column("Id")
            			.From("Order")
            			.Where("Number").IsEqual(Column.Parameter(orderNumber)) as Select).ExecuteScalar<Guid>()))
            	.And("Title").ConsistsWith(Column.Const("очікує Вас 3-й день")) as Select;
            return sel.ExecuteScalar<Guid>() != Guid.Empty ? true : false;
		}
	}

	public class RecordResult
	{
		public string name { get; set; }
		public int count { get; set; }
	}

	[DataContract]
	public class Request
	{
		[DataMember]
		public long result_id { get; set; }
		[DataMember]
		public string name { get; set; }
		[DataMember]
		public string email { get; set; }
		[DataMember]
		public string phone { get; set; }
		[DataMember]
		public string city { get; set; }
		[DataMember]
		public string address { get; set; }
		[DataMember]
		public string type { get; set; }
		[DataMember]
		public string message { get; set; }
		[DataMember]
		public string cardnum { get; set; }
		[DataMember]
		public string origin { get; set; }
		[DataMember]
		public List<string> file { get; set; } = new List<string>();
	}

	[DataContract]
	public class NewOrderRequest
	{
		[DataMember]
		public long order_id { get; set; }
	}

	[DataContract]
	public class Response
	{
		[DataMember]
		public bool success { get; set; }
		[DataMember]
		public string error { get; set; }
	}
	
	[DataContract]
	public class ResponseForDelivery
	{
		[DataMember]
		public string Error { get; set; }
	}

	[DataContract]
	public class CreateActivityRequest
	{
		[DataMember]
		[JsonProperty("phone")]
		public string phone { get; set; }
		[DataMember]
		[JsonProperty("code")]
		public string code { get; set; }
		[DataMember]
		[JsonProperty("title_code")]
		public string title_code { get; set; }
	}
	
	[DataContract]
	public class CheckLangRequest
	{
		[DataMember]
		[JsonProperty("phone")]
		public string phone { get; set; }
		[DataMember]
		[JsonProperty("code")]
		public string code { get; set; }
		[DataMember]
		[JsonProperty("lang")]
		public string lang { get; set; }
	}
	
	[DataContract]
	public class CallBackEmailRequest
	{
		[DataMember]
		[JsonProperty("code")]
		public string code { get; set; }
		[DataMember]
		[JsonProperty("number")]
		public string number { get; set; }
	}
	
	public class ResponseToWebitel
	{
		[DataMember]
		public bool success { get; set; }
		[DataMember]
		public string error { get; set; }
		[DataMember]
		public string lang { get; set; }
		[DataMember]
		public string phone { get; set; }
	}

	[DataContract]
	public class RegisterCallBackRequest
	{
		[DataMember]
		public string phone { get; set; }
		
		[DataMember]
		public string origin { get; set; }
	}

	public class CommunicationsWebitel
	{
		public long? priority { get; set; }
		public string number { get; set; }
		public string type { get; set; }
	}
	[DataContract]
	public class GetOrderResponse
	{
		[DataMember]
		[JsonProperty("customer_id")]
		public long? customer_id { get; set; }
		[DataMember]
		[JsonProperty("entity_id")]
		public int? entity_id { get; set; }
		[DataMember]
		[JsonProperty("customer_lastname")]
		public string customer_lastname { get; set; }
		[DataMember]
		[JsonProperty("customer_firstname")]
		public string customer_firstname { get; set; }
		[DataMember]
		[JsonProperty("customer_middlename")]
		public string customer_middlename { get; set; }
		[DataMember]
		[JsonProperty("customer_email")]
		public string customer_email { get; set; }
		[DataMember]
		[JsonProperty("customer_dob")]
		public string customer_dob { get; set; }
		[DataMember]
		[JsonProperty("customer_gender")]
		public long? customer_gender { get; set; }
		[DataMember]
		[JsonProperty("customer_group_id")]
		public string customer_group_id { get; set; }
		[DataMember]
		[JsonProperty("created_at")]
		public string created_at { get; set; }
		[DataMember]
		[JsonProperty("status")]
		public string status { get; set; }
		[DataMember]
		[JsonProperty("grand_total")]
		public decimal? grand_total { get; set; }
		[DataMember]
		[JsonProperty("store_id")]
		public long? store_id { get; set; }
		[DataMember]
		[JsonProperty("store_name")]
		public string store_name { get; set; }
		[DataMember]
		[JsonProperty("applied_rule_ids")]
		public string applied_rule_ids { get; set; }
		[DataMember]
		[JsonProperty("items")]
		public List<OrderItem> items { get; set; }
		[DataMember]
		[JsonProperty("billing_address")]
		public BillingAddress billing_address { get; set; }
		[DataMember]
		[JsonProperty("payment")]
		public Payment payment { get; set; }
		[DataMember]
		[JsonProperty("extension_attributes")]
		public ExtensionAttributes extension_attributes { get; set; }
		[DataMember]
		[JsonProperty("increment_id")]
		public string increment_id { get; set; }
		[DataMember]
		[JsonProperty("relation_parent_real_id")]
		public string relation_parent_real_id { get; set; }
		[DataMember]
		[JsonProperty("original_increment_id")]
		public string original_increment_id { get; set; }
		[DataMember]
		[JsonProperty("shipping_amount")]
		public decimal shipping_amount { get; set; }
		[DataMember]
		[JsonProperty("weight")]
		public decimal weight { get; set; }
		[DataMember]
		[JsonProperty("state")]
		public string state { get; set; }
		[DataMember]
		[JsonProperty("invoice")]
		public string invoice { get; set; }
		[DataMember]
		[JsonProperty("invoice_expiration_date")]
		public string invoice_expiration_date { get; set; }
	}
	[DataContract]
	public class GetWebitelResponse
	{
		[DataMember]
		[JsonProperty("status")]
		public string status { get; set; }
		[DataMember]
		[JsonProperty("data")]
		public WebitelData data { get; set; }
	}
	[DataContract]
	public class WebitelData
	{
		[DataMember]
		[JsonProperty("insertedIds")]
		public List<string> insertedIds { get; set; }
	}

	[DataContract]
	public class OrderItem
	{
		[DataMember]
		[JsonProperty("sku")]
		public string sku { get; set; }
		[DataMember]
		[JsonProperty("name")]
		public string name { get; set; }
		[DataMember]
		[JsonProperty("price")]
		public decimal? price { get; set; }
		[DataMember]
		[JsonProperty("qty_ordered")]
		public decimal? qty_ordered { get; set; }
		[DataMember]
		[JsonProperty("qty_invoiced")]
		public decimal? qty_invoiced { get; set; }
		[DataMember]
		[JsonProperty("applied_rule_ids")]
		public string applied_rule_ids { get; set; }
		[DataMember]
		[JsonProperty("product_id")]
		public long? product_id { get; set; }
		[JsonProperty("extension_attributes")]
		public ItemExtensionAttributes ExtensionAttributes { get;set; }
		[DataMember]
		[JsonProperty("row_weight")]
		public decimal? row_weight { get; set; }
		[DataMember]
		[JsonProperty("original_price")]
		public decimal? original_price { get; set; }
		[DataMember]
		[JsonProperty("discount_amount")]
		public decimal? discount_amount { get; set; }
		[DataMember]
		[JsonProperty("row_total")]
		public decimal? row_total { get; set; }
		[DataMember]
		[JsonProperty("row_total_discounted")]
		public decimal? row_total_discounted { get; set; }
		[DataMember]
		[JsonProperty("product_type")]
		public string product_type { get; set; }
		[DataMember]
		[JsonProperty("parent_item")]
		public OrderItem parent_item { get; set; }
	}

	[DataContract]
	public class BillingAddress
	{
		[DataMember]
		[JsonProperty("telephone")]
		public string telephone { get; set; }
		[DataMember]
		[JsonProperty("firstname")]
		public string firstname { get; set; }
		[DataMember]
		[JsonProperty("lastname")]
		public string lastname { get; set; }
		[DataMember]
		[JsonProperty("middlename")]
		public string middlename { get; set; }
		[DataMember]
		[JsonProperty("email")]
		public string email { get; set; }
	}

	[DataContract]
	public class ShippingAddress
	{
		[DataMember]
		[JsonProperty("city")]
		public string city { get; set; }
		[DataMember]
		[JsonProperty("firstname")]
		public string firstname { get; set; }
		[DataMember]
		[JsonProperty("lastname")]
		public string lastname { get; set; }
		[DataMember]
		[JsonProperty("middlename")]
		public string middlename { get; set; }
		[DataMember]
		[JsonProperty("telephone")]
		public string telephone { get; set; }
		[DataMember]
		[JsonProperty("postcode")]
		public string postcode { get; set; }
		[DataMember]
		[JsonProperty("street")]
		public List<string> street { get; set; }
		[DataMember]
		[JsonProperty("extension_attributes")]
		public ShippingExtensionAttributes extension_attributes { get; set; }
	}

	[DataContract]
	public class Shipping
	{
		[DataMember]
		[JsonProperty("address")]
		public ShippingAddress address { get; set; }
		[DataMember]
		[JsonProperty("method")]
		public string method { get; set; }
	}

	[DataContract]
	public class ShippingAssignment
	{
		[DataMember]
		[JsonProperty("shipping")]
		public Shipping shipping { get; set; }
	}

	[DataContract]
	public class Payment
	{
		[DataMember]
		[JsonProperty("method")]
		public string method { get; set; }
		[DataMember]
		[JsonProperty("status")]
		public string status { get; set; }
	}

	[DataContract]
	public class ExtensionAttributes
	{
		[DataMember]
		[JsonProperty("shipping_assignments")]
		public List<ShippingAssignment> shipping_assignments { get; set; }
		[DataMember]
		[JsonProperty("customer_city")]
		public string customer_city { get; set; }
		[DataMember]
		[JsonProperty("loyalty_card")]
		public string loyalty_card { get; set; }
		[DataMember]
		[JsonProperty("is_set_present")]
		public long? is_set_present { get; set; }
		[DataMember]
		[JsonProperty("is_in_set")]
		public long? is_in_set { get; set; }
		[DataMember]
		[JsonProperty("loylty_discount_amount")]
		public decimal? loylty_discount_amount { get; set; }
		[DataMember]
		[JsonProperty("call")]
		public long? call { get; set; }
		[DataMember]
		[JsonProperty("created_at_eet")]
		public string created_at_eet { get; set; }
		[DataMember]
		[JsonProperty("wfp_transaction_status")]
		public string wfp_transaction_status { get; set; }
		[DataMember]
		[JsonProperty("invoice")]
		public string invoice { get; set; }
		[DataMember]
		[JsonProperty("invoice_expiration_date")]
		public string invoice_expiration_date { get; set; }
		[DataMember]
		[JsonProperty("wfp_order_id")]
		public string wfp_order_id { get; set; }
	}
	
	[DataContract]
	public class ItemExtensionAttributes
	{
		[DataMember]
		[JsonProperty("rule_set_id")]
		public long? rule_set_id { get; set; }
		[DataMember]
		[JsonProperty("discounts")]
		public List<Discount> discounts { get; set; }
		[DataMember]
		[JsonProperty("order_item_number")]
		public long? order_item_number { get; set; }
		[DataMember]
		[JsonProperty("price_discounted")]
		public decimal? price_discounted { get; set; }
		[DataMember]
		[JsonProperty("row_total_discounted")]
		public decimal? row_total_discounted { get; set; }
	}
	
	[DataContract]
	public class ShippingExtensionAttributes
	{
		[DataMember]
		[JsonProperty("method")]
		public string method { get; set; }
		[DataMember]
		[JsonProperty("city_id")]
		public string city_id { get; set; }
		[DataMember]
		[JsonProperty("street_id")]
		public string street_id { get; set; }
		[DataMember]
		[JsonProperty("region_id")]
		public string region_id { get; set; }
		[DataMember]
		[JsonProperty("warehouse_number")]
		public long? warehouse_number { get; set; }
		[DataMember]
		[JsonProperty("street")]
		public ShippingStreet street { get; set; }
		[DataMember]
		[JsonProperty("comment")]
		public string comment { get; set; }
		[DataMember]
		[JsonProperty("city")]
		public string city { get; set; }
	}
	
	[DataContract]
	public class ShippingStreet
	{
		[DataMember]
		[JsonProperty("name")]
		public string name { get; set; }
		[DataMember]
		[JsonProperty("house_number")]
		public string house_number { get; set; }
		[DataMember]
		[JsonProperty("apt_number")]
		public string apt_number { get; set; }
	}
	
	[DataContract]
	public class SMSCallBackRequest
	{
		[DataMember]
		[JsonProperty("number")]
		public long number { get; set; }
		[DataMember]
		[JsonProperty("sent_via")]
		public string sent_via { get; set; }
		[DataMember]
		[JsonProperty("message_id")]
		public string message_id { get; set; }
		[DataMember]
		[JsonProperty("time")]
		public long time { get; set; }
		[DataMember]
		[JsonProperty("status")]
		public long status { get; set; }
		[DataMember]
		[JsonProperty("substatus")]
		public long substatus { get; set; }
		[DataMember]
		[JsonProperty("hyber_status")]
		public long hyber_status { get; set; }
		[DataMember]
		[JsonProperty("extra_id")]
		public string extra_id { get; set; }
	}
	
	[DataContract]
	public class Discount
	{
		[DataMember]
		[JsonProperty("rule_id")]
		public long rule_id { get; set; }
		[DataMember]
		[JsonProperty("rule_name")]
		public string rule_name { get; set; }
		[DataMember]
		[JsonProperty("discount_amount")]
		public decimal discount_amount { get; set; }
		[DataMember]
		[JsonProperty("discount_percent")]
		public decimal discount_percent { get; set; }
		[DataMember]
		[JsonProperty("price_discounted")]
		public decimal price_discounted { get; set; }
		[DataMember]
		[JsonProperty("rule_set_id")]
		public long? rule_set_id { get; set; }
		[DataMember]
		[JsonProperty("qty")]
		public decimal? qty { get; set; }
		[DataMember]
		[JsonProperty("row_discount_amount")]
		public decimal? row_discount_amount { get; set; }
		[DataMember]
		[JsonProperty("row_total_discounted")]
		public decimal? row_total_discounted { get; set; }
		[DataMember]
		[JsonProperty("price")]
		public decimal? price { get; set; }
		[DataMember]
		[JsonProperty("row_total")]
		public decimal? row_total { get; set; }
	}
	
	
	[DataContract]
	public class DeliveryInfoItem
	{
		[DataMember]
		[JsonProperty("OrderNumber")]
		public string OrderNumber { get; set; }
		[DataMember]
		[JsonProperty("ReciverPhone")]
		public string ReciverPhone { get; set; }
		[DataMember]
		[JsonProperty("toDate")]
		public string toDate { get; set; }
		[DataMember]
		[JsonProperty("DayCount")]
		public int DayCount { get; set; }
	}
}



