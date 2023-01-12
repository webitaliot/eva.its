namespace Terrasoft.Configuration.UsrCaseService
{
	using System.Xml.Serialization;
	using System;
	using System.Xml;
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
	using Terrasoft.Core.Process;
	using System.Collections;
	using System.Collections.Generic;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using DocumentFormat.OpenXml;
	using DocumentFormat.OpenXml.Packaging;
	using DocumentFormat.OpenXml.Spreadsheet;
	using System.Globalization;
	using System.Text.RegularExpressions;
	using System.Text;
	using System.Runtime.Serialization;
	using Newtonsoft;
	using Newtonsoft.Json;
	using System.ComponentModel;
	using System.Reflection;
	using System.Net.Http.Headers;
	using System.Net.Http;
	using System.Threading.Tasks;
	using SpreadsheetLight;
	using System.Net;
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	[DataContract(Namespace = "Terrasoft.Configuration.UsrCaseService")]
	public class UsrCaseService
	{
		private AppConnection appConnection;
		public UserConnection userConnection;
		private Response response;

		public UsrCaseService(UserConnection userConnection)
		{
			this.userConnection = userConnection;
		}
		public UsrCaseService()
		{
			appConnection = HttpContext.Current.Application["AppConnection"] as AppConnection;
			userConnection = appConnection.SystemUserConnection;
		}

		[OperationContract]
		[XmlSerializerFormat]
		[WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Xml)]
		// Отримуємо запит і перевіряємо   request.ApiKey == UsrSysSettingApyKey
		public Response GetCase(XmlFile request)
		{
			#region Set_request_in_DB

			Logger.Log("XML REQUEST: " + JsonConvert.SerializeObject(request), userConnection, "ServiceDesk: GetCase_POST. Method: GetCase(). #region: XML_request");

			#endregion

			#region Get_ApiKey 
			var apiKey = request.ApiKey;
			var sysSettingApyKey = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrSysSettingApyKey"));
			response = new Response();
			#endregion

			if (apiKey == sysSettingApyKey)
			{
				response.success = true;
				RegisterCase(request);
			}
			else
			{
				response.success = false;
				response.error = "Access denied. Incorrectly specified API key";
				Logger.Log("SYSSETTING ERROR: SysSetting: 'UsrSysSettingApyKey' was Incorrectly specified", userConnection, "ServiceDesk: GetCase_POST. Method: GetCase(). #region: Get_ApiKey");
				return response;
			}
			return response;
		}
		//Створення / Апдейт Обращения 
		private void RegisterCase(XmlFile responsse)
		{
			Guid guidEmpty = new Guid("00000000-0000-0000-0000-000000000000");
			Guid g = new Guid();
			#region New Guide for Case
			var newCaseId = Guid.NewGuid();
			#endregion

			#region TrySerialiseXml
			var schemaCase = userConnection.EntitySchemaManager.GetInstanceByName("Case");
			var contractEntityPayment = schemaCase.CreateEntity(userConnection);

			XmlFile Template = new XmlFile();
			try
			{
				Template = responsse;
			}
			catch (Exception e)
			{
				Logger.Log("SERIALIZ ERROR: " + e.Message + "\n InnerException: " + e?.InnerException, userConnection, "ServiceDesk: GetCase_POST. Method: RegisterCase(). #region: TrySerialiseXml");
				response.success = false;
				response.error = e.Message;
				throw new Exception("#region: TrySerialiseXml. " + e.Message + "\n InnerException: " + e?.InnerException + "\n TargetSite: " + e?.TargetSite);
			}
			#endregion

			#region getIds
			var currentTemplate1 = Template;
			var caseId = GetLookupBpmIdByString("Case", "UsrCaseIdToSD", currentTemplate1?.WorkorderId, "Id");
			
			//Якщо Id СД немає то шукаємо по номеру звернення 
			if(caseId == guidEmpty)
			{
				string titleFromResponse = currentTemplate1?.Title;
				if (titleFromResponse.Contains("/"))
        		  {
            	 	int	Start = titleFromResponse.IndexOf("/", 0);
					string onlyNumber = titleFromResponse.Substring(0,Start);
					caseId = GetLookupBpmIdByString("Case", "Number", onlyNumber, "Id");
        		  }
			}
			var subject = GetLookupBpmNameByGuid("Case", "Id", caseId, "Number");
			var categoryId = GetLookupBpmIdByString("CaseCategory", "Name", currentTemplate1?.Category, "Id");
			var statusId = new Guid();
			if(currentTemplate1?.State.ToLower() == "выполняется"||currentTemplate1?.State.ToLower() == "открыт"||currentTemplate1?.State.ToLower() == "предварительно решен"||currentTemplate1?.State.ToLower() == "приостановлен")
			{
				statusId = new Guid("3859c6e7-cbcb-486b-ba53-77808fe6e593");// Ожидает ответа
			}
			else
			{
				statusId = GetLookupBpmIdByString("CaseStatus", "UsrSDName", currentTemplate1?.State, "Id");
			}
			var modeId = GetLookupBpmIdByString("UsrMode", "Name", currentTemplate1?.Tonality, "Id");
			Logger.Log("Tonality from SD: " + currentTemplate1?.Tonality + "; TonalityId: " + modeId, userConnection, "ServiceDesk: GetCase_POST. Method: RegisterCase(). #region: TrySerialiseXml Tonality");
			var serviceItemId = GetLookupBpmIdByString("ServiceItem", "Name", currentTemplate1?.Service, "Id");
			var contractorId = GetLookupBpmIdByString("Account", "Name", currentTemplate1?.Contractor, "Id");
			var contactId = GetLookupBpmNameByGuid("Case", "Id", caseId, "ContactId");
			var tonality = GetLookupBpmNameByGuid("ServiceItem", "Id", serviceItemId, "UsrModeId");
			g = tonality != "" ? new Guid(tonality) : guidEmpty;
			#endregion
			var date = DateTime.Now;
			var dateCreate = DateTime.Now;
			//var isDateValid = false;
			//var isValidDateCreate = false;
			//isDateValid = DateTime.TryParse(currentTemplate1?.DateResolve, out date);
			//isValidDateCreate = DateTime.TryParse(currentTemplate1?.DateCreate, out dateCreate);
			#region Date
			try
            {
                date = currentTemplate1?.DateResolve != null ? (new DateTime(1970, 1, 1, 0, 0, 0).AddSeconds(Convert.ToInt64(currentTemplate1?.DateResolve))).AddHours(2) : DateTime.Now;
                dateCreate = currentTemplate1?.DateCreate != null ? (new DateTime(1970, 1, 1, 0, 0, 0).AddSeconds(Convert.ToInt64(currentTemplate1?.DateCreate))).AddHours(2) : DateTime.Now;
            }
            catch (ArgumentOutOfRangeException e)
            {
              	Logger.Log("INCORRECT value DateResolve: " + e.Message + "\n InnerException: " + e?.InnerException, userConnection, "ServiceDesk: GetCase_POST. Method: RegisterCase(). #region: TrySerialiseXml");
                throw new Exception(e.Message + "\nIncorrect value DateResolve!");
            }
			#endregion
			var registeredOn = DateTime.Now;
			var answer = currentTemplate1?.Answer;

			#region Subject
			subject = subject != String.Empty ? subject : currentTemplate1?.Title;
			var categoryName = currentTemplate1?.Category;
			var serviceItemName = currentTemplate1?.Service;
			subject = categoryName != "" ? subject + "/" + categoryName : subject;
			subject = serviceItemName != "" ? subject + "/" + serviceItemName : subject;
			#endregion
			
			#region Rudeness
				var rudnesValue = false;
				if(currentTemplate1?.Rudeness.ToLower() == "да" )
					rudnesValue = true;
				else
					rudnesValue = false;
			#endregion
			
			var waitingForAnswer = Guid.Parse("3859c6e7-cbcb-486b-ba53-77808fe6e593");//обращение статус «Ожидает ответа»
			var serviceDesk = Guid.Parse("b7ebdaed-78d2-438f-817a-fc90998392c4");//  CaseOrigin - Сервис Деск
			var resolvedStatus = Guid.Parse("ae7f411e-f46b-1410-009b-0050ba5d6c38"); //обращение статус «Решено»
			var caseOrigin = GetLookupBpmIdById("Case", "Id", caseId, "OriginId");
			
			contractEntityPayment = schemaCase.CreateEntity(userConnection);
			if (contractEntityPayment.FetchFromDB(caseId))
			{
				#region Update
				try
				{
					if(contractorId != null)
					{
						var contractorInDb = GetLookupBpmIdById("Case", "Id", caseId, "UsrShopId");
						if(contractorInDb == guidEmpty)
						{ 	
							contractEntityPayment.SetColumnValue("UsrShopId", contractorId != Guid.Empty ? contractorId : (Guid?)null);
						}
					}
					var descriptionFromSd = currentTemplate1?.Description;
					
					/*if(descriptionFromSd != null)
					{
						var subjectInDb = GetLookupBpmNameByGuid("Case", "Id", caseId, "Subject");
						var descriptionInDb = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrDescription");
						var clearDescription = getTextFromString(descriptionInDb,"/");
						var clearSubject=getTextFromString(subjectInDb,"/");
						if(descriptionInDb == " " || descriptionInDb == String.Empty|| clearSubject == clearDescription)
						{
							contractEntityPayment.SetColumnValue("UsrDescription", descriptionFromSd); 
							contractEntityPayment.SetColumnValue("Symptoms", descriptionFromSd);
						}
					}*/
					
					contractEntityPayment.SetColumnValue("Subject", subject);
					contractEntityPayment.SetColumnValue("SolutionDate", date);//SolutionDate
					contractEntityPayment.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
					contractEntityPayment.SetColumnValue("UsrOwnerNameInSD", currentTemplate1?.Specialist);
					contractEntityPayment.SetColumnValue("Solution", currentTemplate1?.Decision);
					contractEntityPayment.SetColumnValue("UsrRudeness", rudnesValue);
					contractEntityPayment.SetColumnValue("UsrGroup", currentTemplate1?.GroupName);
					contractEntityPayment.SetColumnValue("UsrPlatform", currentTemplate1?.Platform);
					contractEntityPayment.SetColumnValue("ServiceItemId", serviceItemId != Guid.Empty ? serviceItemId : (Guid?)null);
					contractEntityPayment.SetColumnValue("CategoryId", categoryId != Guid.Empty ? categoryId : (Guid?)null);
					contractEntityPayment.SetColumnValue("UsrCaseIdToSD", currentTemplate1?.WorkorderId);
					contractEntityPayment.SetColumnValue("CreatedOn", dateCreate);
					
					if(statusId == resolvedStatus && caseOrigin != serviceDesk)
					{
						var processSchema = userConnection.ProcessSchemaManager.GetInstanceByName("UsrInformChangeStatusToResolved");
						var flowEngine = new FlowEngine(userConnection);
						Dictionary<string, string> parameter = new Dictionary<string, string>();
						parameter.Add("CaseId", caseId.ToString());
						flowEngine.RunProcess(processSchema, parameter);
					}
					if (statusId == waitingForAnswer)
					{
						contractEntityPayment.SetColumnValue("UsrApplicationAuthor", "Контакт-центр");
					}
					else
					{
						contractEntityPayment.SetColumnValue("UsrApplicationAuthor", String.Empty);
					}
					if (modeId != guidEmpty)
					{
						contractEntityPayment.SetColumnValue("UsrModeId", modeId);
					}
					else if (g != guidEmpty)
					{
						contractEntityPayment.SetColumnValue("UsrModeId", tonality);
					}
					contractEntityPayment.Save(false);

					AddFeed(answer, userConnection, caseId);

					Logger.Log("SUCCESS", userConnection, "ServiceDesk: GetCase_POST. SUCCESS");
				}
				catch (Exception e)
				{
					Logger.Log("UPDATE ERROR: " + e.Message + "\n InnerException: " + e?.InnerException, userConnection, "ServiceDesk: GetCase_POST. Method: RegisterCase(). #region: Update");
					response.success = false;
					response.error = e.Message;
					throw new Exception("#region: Update. " + e.Message + "\n InnerException: " + e?.InnerException + "\n TargetSite: " + e?.TargetSite);
				}
				#endregion
			}
			else
			{
				#region Insert
				try
				{
				
					contractEntityPayment.SetDefColumnValues();
					contractEntityPayment.SetColumnValue("Id", newCaseId);
					contractEntityPayment.SetColumnValue("UsrCaseIdToSD", currentTemplate1?.WorkorderId);
					contractEntityPayment.SetColumnValue("Subject", subject);
					contractEntityPayment.SetColumnValue("CategoryId", categoryId != Guid.Empty ? categoryId : (Guid?)null);
					contractEntityPayment.SetColumnValue("SolutionDate", date);
					contractEntityPayment.SetColumnValue("StatusId", statusId != Guid.Empty ? statusId : (Guid?)null);
					contractEntityPayment.SetColumnValue("UsrOwnerNameInSD", currentTemplate1?.Specialist);
					contractEntityPayment.SetColumnValue("Solution", currentTemplate1?.Decision);
					contractEntityPayment.SetColumnValue("UsrRudeness", rudnesValue);
					contractEntityPayment.SetColumnValue("UsrGroup", currentTemplate1?.GroupName);
					contractEntityPayment.SetColumnValue("UsrPlatform", currentTemplate1?.Platform);
					contractEntityPayment.SetColumnValue("UsrDescription", currentTemplate1?.Description);
					contractEntityPayment.SetColumnValue("Symptoms", currentTemplate1?.Description);
					contractEntityPayment.SetColumnValue("ServiceItemId", serviceItemId != Guid.Empty ? serviceItemId : (Guid?)null);
					contractEntityPayment.SetColumnValue("UsrShopId", contractorId != Guid.Empty ? contractorId : (Guid?)null);
					contractEntityPayment.SetColumnValue("RegisteredOn", registeredOn);
					contractEntityPayment.SetColumnValue("CreatedOn", dateCreate);
					contractEntityPayment.SetColumnValue("OriginId",serviceDesk);
					contractEntityPayment.SetColumnValue("UsrWithReaction",true);
					
					if (statusId == waitingForAnswer)
					{
						contractEntityPayment.SetColumnValue("UsrApplicationAuthor", "Контакт-центр");
					}
					else
					{
						contractEntityPayment.SetColumnValue("UsrApplicationAuthor", String.Empty);
					}
					if (modeId != guidEmpty)
					{
						contractEntityPayment.SetColumnValue("UsrModeId", modeId);
					}
					else if (g != guidEmpty)
					{
						contractEntityPayment.SetColumnValue("UsrModeId", tonality);
					}
					contractEntityPayment.Save(false);

					AddFeed(answer, userConnection, newCaseId);
				}
				catch (Exception e)
				{
					response.success = false;
					response.error = e.Message;
					throw new Exception("\n\n \n INSERT ERROR: " + e.Message + "ServiceDesk: GetCase_POST. Method: RegisterCase(). #region: Insert");
				}
				#endregion
			}
		}

		public void InsertPhoneNumber(string phoneNumber, Guid contactId)
		{
			var schemaContact = userConnection.EntitySchemaManager.GetInstanceByName("Contact");
			var contractEntityContact = schemaContact.CreateEntity(userConnection);

			if (contractEntityContact.FetchFromDB(contactId))
			{
				#region SetPhoneNumber
				try
				{
					contractEntityContact.SetColumnValue("MobilePhone", phoneNumber);
					contractEntityContact.Save(false);
				}
				catch (Exception e)
				{
					Logger.Log("INSERT ERROR: " + e.Message + "\n InnerException: " + e?.InnerException, userConnection, "ServiceDesk: SendCase_POST. Method: InsertPhoneNumber(). #region: Insert");
					response.success = false;
					response.error = e.Message;
					throw new Exception("#region: Insert. " + e.Message + "\n InnerException: " + e?.InnerException + "\n TargetSite: " + e?.TargetSite);
				}
				#endregion
			}
		}
		public string SendCaseData(Guid caseId)
		{
			string typeApy = "Insert";
			var url = GetSysSetting(ref typeApy, caseId);
			var sucsess = "true";
			if (typeApy == "Insert")
			{
				sucsess = InsertCaseInSD(caseId, url);
			}
			else
			{
				sucsess = UpdateCaseInSD(caseId, url);
			}
			return sucsess;

		}
		private string GetSysSetting(ref string typeApy, Guid caseId)
		{
			var workOrderId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrCaseIdToSD");
			
			if(workOrderId == String.Empty) 
			{
				Logger.Log("ERROR WorkOrderId  Is Empty!", userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). #region: at the top of method");
			throw new Exception("ERROR WorkOrderId  Is Empty! ServiceDesk: SendCase_POST. Method: GetSysSetting(). #region: at the top of method");
			}
			#region Get_SYSSETTING 
			var url = String.Empty;
			var serverName = String.Empty;
			if (workOrderId == String.Empty)
			{
				try
				{
					var urlForInsertCaseInSD = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUrlForInsertCaseInSD"));
					if (urlForInsertCaseInSD == String.Empty)
					{
						throw new SysSettingException("UsrUrlForInsertCaseInSD");
					}
					url = urlForInsertCaseInSD;
					serverName = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrServerName"));
					if (serverName == String.Empty)
					{
						throw new SysSettingException("UsrServerName");
					}
					url = url.Replace("serverNameInput", serverName);
				}
				catch (SysSettingException ex)
				{
					Logger.Log(ex.Message, userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). SYSSETTING ERROR");
					throw;
				}
				catch (Exception ex)
				{
					Logger.Log("SYSSETTING ERROR", userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). SYSSETTING ERROR");
					throw new Exception();
				}
			}
			else
			{
				try
				{
					var usrUrlForUpdateCaseInSD = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrUrlForUpdateCaseInSD"));
					if (usrUrlForUpdateCaseInSD == String.Empty)
					{
						throw new SysSettingException("UsrUrlForUpdateCaseInSD");
					}
					serverName = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrServerName"));
					if (serverName == String.Empty)
					{
						throw new SysSettingException("UsrServerName");
					}
					url = usrUrlForUpdateCaseInSD;
					url = url.Replace("workOrderId", workOrderId);
					url = url.Replace("serverNameInput", serverName);
					typeApy = "Update";
				}
				catch (SysSettingException ex)
				{
					Logger.Log(ex.Message, userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). SYSSETTING ERROR");
					throw;
				}
				catch (Exception ex)
				{
					Logger.Log("SYSSETTING ERROR", userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). SYSSETTING ERROR");
					throw new Exception();
				}
			}
			#endregion

			#region Get_API_Template
			var template = String.Empty;
			try
			{
				template = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrXMLTemplate"));
			}
			catch (Exception ex)
			{
				Logger.Log("SYSSETTING ERROR: SysSetting UsrXMLTemplate was not found", userConnection, "ServiceDesk: SendCase_POST. Method: GetSysSetting(). SYSSETTING ERROR");
				throw new Exception("SYSSETTING ERROR: SysSetting UsrXMLTemplate was not found");
			}
			url += template;
			#endregion
			return url;
		}

		private string InsertCaseInSD(Guid caseId, string url)
		{
			return "We make only UPDATE!!!!";
			// var success = "true";
			// Guid guidEmpty = new Guid("00000000-0000-0000-0000-000000000000");
			// Guid g = new Guid();
			// var schemaCase = userConnection.EntitySchemaManager.GetInstanceByName("Case");
			// var contractEntityPayment = schemaCase.CreateEntity(userConnection);


			// #region Get_Fields
			// // var resolution = GetLookupBpmNameByGuid("Case", "Id", caseId, "Solution");
			// // var technician = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrOwnerNameInSD");
			// //var site = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrPlatform");
			// // var group = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrGroup");
			// // var socialMessage = GetFeedBpmByGuid("SocialMessage", "EntityId", caseId, "Message");
			// //socialMessage = (socialMessage != String.Empty) ? StripHTML(socialMessage) : "";
			// //var categoryId = GetLookupBpmNameByGuid("Case", "Id", caseId, "CategoryId");
			// //g = categoryId != "" ? new Guid(categoryId) : guidEmpty;
			// //var categoryName = GetLookupBpmNameByGuid("CaseCategory", "Id", g, "Name");
			// var subject = GetLookupBpmNameByGuid("Case", "Id", caseId, "Number");
			// var activeNumberCardPL = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrActiveNumberCardPL");
			// var requester = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrApplicationAuthor");
			// var registeredOn = GetLookupBpmNameByGuid("Case", "Id", caseId, "RegisteredOn");
			// var serviceItemId = GetLookupBpmNameByGuid("Case", "Id", caseId, "ServiceItemId");
			// g = serviceItemId != "" ? new Guid(serviceItemId) : guidEmpty;
			// var serviceItemName = GetLookupBpmNameByGuid("ServiceItem", "Id", g, "Name");
			// var categoryId = GetLookupBpmNameByGuid("Case", "Id", caseId, "CategoryId");
			// g = categoryId != "" ? new Guid(categoryId) : guidEmpty;
			// var subcategoryName = GetLookupBpmNameByGuid("CaseCategory", "Id", g, "Name");
			// var rudeness = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrRudeness");
			// var modeId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrModeId");
			// g = modeId != "" ? new Guid(modeId) : guidEmpty;
			// var modeName = GetLookupBpmNameByGuid("UsrMode", "Id", g, "Name");
			// var statusId = GetLookupBpmNameByGuid("Case", "Id", caseId, "StatusId");
			// g = statusId != "" ? new Guid(statusId) : guidEmpty;
			// var statusName = GetLookupBpmNameByGuid("CaseStatus", "Id", g, "UsrSDName");
			// var subDescription = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrDescription");// описание
			// var contactId = GetLookupBpmNameByGuid("Case", "Id", caseId, "ContactId");
			// g = contactId != "" ? new Guid(contactId) : guidEmpty;
			// var mobilePhone = GetLookupBpmNameByGuid("Contact", "Id", g, "MobilePhone");
			// var phone = GetLookupBpmNameByGuid("Contact", "Id", g, "Phone");
			// var email = GetLookupBpmNameByGuid("Contact", "Id", g, "Email");
			// var contactName = GetLookupBpmNameByGuid("Contact", "Id", g, "Name");
			// var cityId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrCityId");
			// g = cityId != "" ? new Guid(cityId) : guidEmpty;
			// var cityName = GetLookupBpmNameByGuid("City", "Id", g, "Name");
			// var orignId = GetLookupBpmNameByGuid("Case", "Id", caseId, "OriginId");
			// g = orignId != "" ? new Guid(orignId) : guidEmpty;
			// var orignName = GetLookupBpmNameByGuid("CaseOrigin", "Id", g, "Name");
			// var operatorId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrOperatorNameId");
			// g = operatorId != "" ? new Guid(operatorId) : guidEmpty;
			// var operatorName = GetLookupBpmNameByGuid("Contact", "Id", g, "Name");
			// var accountId = GetLookupBpmNameByGuid("Case", "Id", caseId, "AccountId");
			// g = accountId != "" ? new Guid(accountId) : guidEmpty;
			// var accountName = GetLookupBpmNameByGuid("Account", "Id", g, "Name");
			// var shopId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrShopId");
			// g = shopId != "" ? new Guid(shopId) : guidEmpty;
			// var shopName = GetLookupBpmNameByGuid("Account", "Id", g, "Name");

			// mobilePhone = mobilePhone != "" ? mobilePhone : "";
			// phone = phone != "" ? mobilePhone != "" ? ", " + phone : phone : "";
			// email = email != "" ? mobilePhone != "" ? ", " + email : phone != "" ? ", " + email : email : "";
			// #endregion

			// #region Description
			// var description = "";
			// subDescription = subDescription.Replace("&", " ");
			// description += "\n Категория: " + subcategoryName +
			// 	"\n Дата и время: " + registeredOn +
			// 	"\n Оператор: " + operatorName +
			// 	"\n Клиент: " + contactName +
			// 	"\n Контакт: " + mobilePhone + phone + email +
			// 	"\n Город: " + cityName +
			// 	"\n Карта ПЛ: " + activeNumberCardPL +
			// 	"\n Происхождение: " + orignName +
			// 	"\n Содержание: " + subDescription +
			// 	"\n Контрагент: " + accountName +
			// 	"\n Филиал: " + shopName +
			// 	"\n Тональность: " + modeName + " ";

			// #endregion

			// #region Subject
			// subject = subcategoryName != "" ? subject + "/" + subcategoryName : subject;
			// subject = serviceItemName != "" ? subject + "/" + serviceItemName : subject;
			// #endregion

			// #region Replace
			// try
			// {  //<parameter><name>category</name><value>categoryInput</value></parameter>
			// 	var waitingForAnswer = "3859c6e7-cbcb-486b-ba53-77808fe6e593";// Ожидает ответа
			// 	if (statusId == waitingForAnswer)// Ожидает ответа
			// 	{
			// 		var category = "Обращения клиентов устные/письменные/звонки";
			// 		url = url.Replace("categoryInput", category + " ");
			// 	}
			// 	else
			// 	{
			// 		url = url.Replace("<parameter><name>category</name><value>categoryInput</value></parameter>", "");
			// 	}
			// 	url = url.Replace("subcategoryNameInput", subcategoryName + " ");//Категория
			// 	url = url.Replace("subjectInput", subject + " ");
			// 	url = url.Replace("descriptionInput", description + " ");
			// 	url = url.Replace("statusNameInput", statusName + " ");
			// 	url = url.Replace("modeNameInput", modeName + " ");
			// 	url = url.Replace("rudenessInput", rudeness + " ");
			// 	url = url.Replace("serviceItemNameInput", serviceItemName + " ");
			// 	url = url.Replace("requesterInput", requester);
			// 	// url = url.Replace("siteInput", site);
			// 	// url = url.Replace("groupInput", group);
			// 	//url = url.Replace("technicianInput", technician);
			// 	//url = url.Replace("categoryNameInput", categoryName);
			// 	// url = url.Replace("createdTimeInput", createdTime);
			// 	//url = url.Replace("resolutionInput", resolution);
			// 	// url = url.Replace("replyToSDSide", socialMessage);
			// 	Logger.Log("TEST URL:", userConnection, url.ToString());
			// }
			// catch (Exception ex)
			// {
			// 	Logger.Log("ERROR:" + ex?.Message, userConnection, "ServiceDesk: SendCase_POST. Method: InsertCaseInSD(). #region Replace");
			// 	return "ERROR_#region Replace:" + ex?.Message + "\n InnerException: " + ex?.InnerException + "\n TargetSite: " + ex?.TargetSite;
			// }
			// #endregion

			// #region GetResponseXml
			// var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
			// httpWebRequest.Method = WebRequestMethods.Http.Post;
			// httpWebRequest.ContentType = "application/xml";
			// httpWebRequest.ServicePoint.Expect100Continue = false;

			// var result = "";
			// try
			// {
			// 	var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
			// 	using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
			// 	{
			// 		result = streamReader.ReadToEnd().ToString();
			// 		var status = "";
			// 		status = getBetween(result, "<status>", "</status>");
			// 		if (status == "Failed")
			// 		{
			// 			return result + "\n URL:" + url;
			// 		}
			// 		Logger.Log("RESPONSE:" + streamReader.ReadToEnd().ToString(), userConnection, "ServiceDesk: SendCase_POST. SUCCESS RESPONSE");
			// 	}
			// }
			// catch (Exception ex)
			// {
			// 	Logger.Log("ERROR RESPONSE:" + ex?.Message + "URL: " + url, userConnection, "ServiceDesk: SendCase_POST. Method: InsertCaseInSD(). ERROR RESPONSE");
			// 	return "Failed to get response. Response: " + ex?.Message + "\n URL: " + url;
			// }

			// #endregion
			// string workorderId = getBetween(result, "<value>", "</value>");
			// contractEntityPayment = schemaCase.CreateEntity(userConnection);
			// if (contractEntityPayment.FetchFromDB(caseId) && workorderId != String.Empty)
			// {
			// 	#region Update
			// 	try
			// 	{
			// 		contractEntityPayment.SetColumnValue("UsrCaseIdToSD", workorderId);
			// 		contractEntityPayment.Save(false);
			// 	}
			// 	catch (Exception e)
			// 	{
			// 		Logger.Log("UPDATE ERROR: " + e.Message + "\n InnerException: " + e?.InnerException, userConnection, "ServiceDesk: SendCase_POST. Method: InsertCaseInSD(). #region: Update");
			// 		return "#region: Update. " + e.Message + "\n InnerException: " + e?.InnerException + "\n TargetSite: " + e?.TargetSite;
			// 	}
			// 	#endregion
			// }
			// return success;
		}
		private string UpdateCaseInSD(Guid caseId, string url)
		{
			var success = "true";
			Guid guidEmpty = new Guid("00000000-0000-0000-0000-000000000000");
			Guid g = new Guid();
			var schemaCase = userConnection.EntitySchemaManager.GetInstanceByName("Case");
			var contractEntityPayment = schemaCase.CreateEntity(userConnection);

			#region Get_Fields
			var subject = GetLookupBpmNameByGuid("Case", "Id", caseId, "Number");
			var activeNumberCardPL = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrActiveNumberCardPL");
			var requester = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrApplicationAuthor");
			var registeredOn = GetLookupBpmNameByGuid("Case", "Id", caseId, "RegisteredOn");
			var remind = GetLookupBpmNameByGuid("Case", "Id", caseId, "YSCSocialUrl");
			var serviceItemId = GetLookupBpmNameByGuid("Case", "Id", caseId, "ServiceItemId");
			g = serviceItemId != "" ? new Guid(serviceItemId) : guidEmpty;
			var serviceItemName = GetLookupBpmNameByGuid("ServiceItem", "Id", g, "Name");
			var categoryId = GetLookupBpmNameByGuid("Case", "Id", caseId, "CategoryId");
			g = categoryId != "" ? new Guid(categoryId) : guidEmpty;
			var subcategoryName = GetLookupBpmNameByGuid("CaseCategory", "Id", g, "Name");
			var rudeness = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrRudeness");
			var modeId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrModeId");
			g = modeId != "" ? new Guid(modeId) : guidEmpty;
			var modeName = GetLookupBpmNameByGuid("UsrMode", "Id", g, "Name");
			var statusId = GetLookupBpmNameByGuid("Case", "Id", caseId, "StatusId");
			g = statusId != "" ? new Guid(statusId) : guidEmpty;
			var statusName = GetLookupBpmNameByGuid("CaseStatus", "Id", g, "UsrSDName");
		//	var subDescription = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrDescription");// описание
			var contactId = GetLookupBpmNameByGuid("Case", "Id", caseId, "ContactId");
			g = contactId != "" ? new Guid(contactId) : guidEmpty;
			var mobilePhone = GetLookupBpmNameByGuid("Contact", "Id", g, "MobilePhone");
			var phone = GetLookupBpmNameByGuid("Contact", "Id", g, "Phone");
			var email = GetLookupBpmNameByGuid("Contact", "Id", g, "Email");
			var contactName = GetLookupBpmNameByGuid("Contact", "Id", g, "Name");
			var cityId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrCityId");
			g = cityId != "" ? new Guid(cityId) : guidEmpty;
			var cityName = GetLookupBpmNameByGuid("City", "Id", g, "Name");
			var orignId = GetLookupBpmNameByGuid("Case", "Id", caseId, "OriginId");
			g = orignId != "" ? new Guid(orignId) : guidEmpty;
			var orignName = GetLookupBpmNameByGuid("CaseOrigin", "Id", g, "Name");
			var operatorId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrOperatorNameId");
			g = operatorId != "" ? new Guid(operatorId) : guidEmpty;
			var operatorName = GetLookupBpmNameByGuid("Contact", "Id", g, "Name");
			var accountId = GetLookupBpmNameByGuid("Case", "Id", caseId, "AccountId");
			g = accountId != "" ? new Guid(accountId) : guidEmpty;
			var accountName = GetLookupBpmNameByGuid("Account", "Id", g, "Name");
			var shopId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrShopId");
			g = shopId != "" ? new Guid(shopId) : guidEmpty;
			var shopName = GetLookupBpmNameByGuid("Account", "Id", g, "Name");
			var orderId = GetLookupBpmNameByGuid("Case", "Id", caseId, "UsrNumberOfOrderId");
			g = orderId != "" ? new Guid(orderId) : guidEmpty;
			var orderNumber = GetLookupBpmNameByGuid("Order", "Id", g, "Number");
			
			#region Rudeness
				string rudnesValue = "";
				if(rudeness == "True")
					rudnesValue = "Да";
				else if(rudeness == "False")
					rudnesValue = "Нет";
				else 	rudnesValue = "Не назначено";
			#endregion
			
			mobilePhone = mobilePhone != "" ? mobilePhone : "";
			phone = phone != "" ? mobilePhone != "" ? ", " + phone : phone : "";
			email = email != "" ? mobilePhone != "" ? ", " + email : phone != "" ? ", " + email : email : "";
			#endregion

			#region Description
			var description = "";
			description += "\n Категория: " + subcategoryName +
				"\n Дата и время: " + registeredOn +
				"\n Оператор: " + operatorName +
				"\n Клиент: " + contactName +
				"\n Контакт: " + mobilePhone + phone + email +
				"\n Город: " + cityName +
				"\n Карта ПЛ: " + activeNumberCardPL +
				"\n Происхождение: " + orignName +
				"\n Контрагент: " + accountName +
				"\n Филиал: " + shopName +
				"\n Тональность: " + modeName +
				"\n Ссылка на упоминание: " + remind + 
				"\n Номер заказа: " + orderNumber;

			#endregion
			
			#region Subject
			subject = subcategoryName != "" ? subject + "/" + subcategoryName : subject;
			subject = serviceItemName != "" ? subject + "/" + serviceItemName : subject;
			#endregion
			
			#region Replace
			try
			{  //<parameter><name>category</name><value>categoryInput</value></parameter>
				var waitingForAnswer = "3859c6e7-cbcb-486b-ba53-77808fe6e593";// Ожидает ответа
				if (statusId == waitingForAnswer)// Ожидает ответа
				{
					var category = "Обращения клиентов устные/письменные/звонки";
					url = url.Replace("categoryInput", category + " ");
				}
				else
				{
					url = url.Replace("<parameter><name>category</name><value>categoryInput</value></parameter>", "");
				}
				url = url.Replace("subcategoryNameInput", subcategoryName );//Категория
				url = url.Replace("subjectInput", subject );
				url = url.Replace("descriptionInput", description );
				url = url.Replace("statusNameInput", statusName );
				url = url.Replace("modeNameInput", modeName);
				url = url.Replace("rudenessInput", rudnesValue );
				url = url.Replace("serviceItemNameInput", serviceItemName );
				url = url.Replace("requesterInput", requester );
				url = url.Replace("orderNumberInput", orderNumber );
				Logger.Log("TEST URL:", userConnection, url.ToString());
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR:" + ex?.Message, userConnection, "ServiceDesk: SendCase_POST. Method: UpdateCaseInSD(). #region Replace");
				return "ERROR_#region Replace:" + ex?.Message + "\n InnerException: " + ex?.InnerException + "\n TargetSite: " + ex?.TargetSite;
			}
			#endregion

			#region GetResponseXml
			var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
			httpWebRequest.Method = WebRequestMethods.Http.Post;
			httpWebRequest.ContentType = "application/xml";
			httpWebRequest.ServicePoint.Expect100Continue = false;

			var result = "";
			try
			{
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					result = streamReader.ReadToEnd().ToString();
					var status = "";
					status = getBetween(result, "<status>", "</status>");
					if (status == "Failed")
					{
						return result;
					}
					Logger.Log("RESPONSE:" + streamReader.ReadToEnd().ToString(), userConnection, "ServiceDesk: SendCase_POST. SUCCESS RESPONSE");
				}
			}
			// catch (WebException wex)
   //         {
   //             string webEx = new StreamReader(wex.Response.GetResponseStream()).ReadToEnd().ToString();
   //             Logger.Log("ERROR RESPONSE:" + webEx, userConnection, "ServiceDesk: SendCase_POST. Method: UpdateCaseInSD(). ERROR RESPONSE");
			// 	return "Failed to get response. WebException Response: " + webEx + "\n URL: " + url;
   //         }
			catch (Exception ex)
			{
				Logger.Log("ERROR RESPONSE:" + ex?.Message, userConnection, "ServiceDesk: SendCase_POST. Method: UpdateCaseInSD(). ERROR RESPONSE");
				return "Failed to get response. Response: " + ex?.Message + "\n URL: " + url;
			}
			#endregion
			return success;
		}

		#region Methods
		public string StripHTML(string input)
		{
			return Regex.Replace(input, "<.*?>", String.Empty);
		}
		public void AddFeed(string message, UserConnection userConnection, Guid recordId)
		{
			if (message == String.Empty)
			{
				return;
			}
			var socialMessageId = GetLookupBpmIdById("SocialMessage", "EntityId", recordId, "Id");
			var entity = userConnection.EntitySchemaManager.GetInstanceByName("SocialMessage").CreateEntity(userConnection);

			if (entity.FetchFromDB(socialMessageId))
			{
				var socialMessage = "<br/>" + message;
				entity.SetColumnValue("Message", socialMessage);
			}
			else
			{
				entity.SetColumnValue("Message", message);
				entity.SetColumnValue("EntityId", recordId);
				entity.SetColumnValue("EntitySchemaUId", "117d32f9-8275-4534-8411-1c66115ce9cd");
				entity.SetColumnValue("ParentId", (Guid?)null);
			}
			try
			{
				entity.Save(false);
			}
			catch (Exception e)
			{
				throw new Exception("Method AddFeed(). " + e.Message + "\n InnerException: " + e?.InnerException + "\n TargetSite: " + e?.TargetSite);
				response.success = false;
				response.error = e.Message;
			}
		}

		public DateTime? GetDateFromString(string value)
		{
			var date = DateTime.Now;
			var isDate = DateTime.TryParse(value, out date);
			return isDate == true ? date : (DateTime?)null;
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
		public Guid GetLookupBpmIdById(string table, string column, Guid value, string columnReturn)
		{
			if (value == Guid.Empty)
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
		public string GetFeedBpmByGuid(string table, string column, Guid value, string columnReturn)
		{
			if (value == Guid.Empty)
			{
				return String.Empty;
			}
			var lookupBPMName = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value))
				.OrderByDesc("CreatedOn") as Select).ExecuteScalar<string>();
			return lookupBPMName;
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
		public string getBetween(string strSource, string strStart, string strEnd)
		{
			int Start, End;
			if (strSource.Contains(strStart) && strSource.Contains(strEnd))
			{
				Start = strSource.IndexOf(strStart, 0) + strStart.Length;
				End = strSource.IndexOf(strEnd, Start);
				return strSource.Substring(Start, End - Start);
			}
			else
			{
				return "";
			}
		}
		public DateTime? FromUnixTime(long unixTime)
		{
			if (unixTime == 0)
			{
				return (DateTime?)null;
			}
			var date = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(unixTime);
			return date;
		}
		private string getTextFromString(string strSource, string strStart)
        {
            var length = strSource.Length;
            int Start;
            if (strSource.Contains(strStart))
            {
                Start = strSource.IndexOf(strStart, 0) + strStart.Length;
                return strSource.Substring(Start, length - Start);
            }
            else
            {
                return strSource;
            }
        }
		#endregion
	}
	#region ParseXml
	[XmlRoot(ElementName = "Template1")]
	public class XmlFile
	{
		[XmlElement(ElementName = "apiKey")]
		public string ApiKey { get; set; }
		[XmlElement(ElementName = "WORKORDERID")]
		public string WorkorderId { get; set; }
		[XmlElement(ElementName = "Title")]
		public string Title { get; set; }
		[XmlElement(ElementName = "Category")]
		public string Category { get; set; }
		[XmlElement(ElementName = "DateResolve")]
		public string DateResolve { get; set; }
		[XmlElement(ElementName = "State")]
		public string State { get; set; }
		[XmlElement(ElementName = "Specialist")]
		public string Specialist { get; set; }
		[XmlElement(ElementName = "Answer")]
		public string Answer { get; set; }
		[XmlElement(ElementName = "Tonality")]
		public string Tonality { get; set; }
		[XmlElement(ElementName = "Decision")]
		public string Decision { get; set; }
		[XmlElement(ElementName = "Rudeness")]
		public string Rudeness { get; set; }
		[XmlElement(ElementName = "DEPTNAME")]// - вже не використовуэться
		public string Deptname { get; set; }// -
		[XmlElement(ElementName = "GroupName")]
		public string GroupName { get; set; }
		[XmlElement(ElementName = "Platform")]
		public string Platform { get; set; }
		[XmlElement(ElementName = "DESCRIPTION")]//--вже не використовуэться
		public string Description { get; set; }
		[XmlElement(ElementName = "Service")]
		public string Service { get; set; }
		[XmlElement(ElementName = "Contractor")]
		public string Contractor { get; set; }
		[XmlElement(ElementName = "PhoneClient")]// -вже не використовуэться
		public string PhoneClient { get; set; }// -
		[XmlElement(ElementName = "Requester")]
		public string Requester { get; set; }
		[XmlElement(ElementName = "DateCreate")]
		public string DateCreate { get; set; }
	}
	#endregion
	[DataContract]
	public class Response
	{
		[DataMember]
		public bool success { get; set; }
		[DataMember]
		public string error { get; set; }
	}
	public class SysSettingException : Exception
	{
		public SysSettingException(string message)
			: base($"SYSSETTING ERROR: SysSetting {message} was not found.") { }
	}

}