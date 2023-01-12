namespace Terrasoft.Configuration.UsrProcessingIntegration
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
	using Newtonsoft;
	using Newtonsoft.Json;
	using System.Security.Cryptography;
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
	
	public class UsrProcessingIntegration
	{
		private AppConnection appConnection;
		private UserConnection userConnection;

		public UsrProcessingIntegration()
		{
			appConnection = HttpContext.Current.Application["AppConnection"] as AppConnection;
			userConnection = appConnection.SystemUserConnection;
		}

		public UsrProcessingIntegration(UserConnection userConnection)
		{
			this.userConnection = userConnection;
		}
		
		public AuthorizationResponse Authorization()
		{
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProccesingAuthorizationMethod"));
				var ipAddress = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingIPAdress"));
				var loginSys = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingAuthorizationLogin"));
				var password = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingAuthorizationPassword"));
				var cryptedPass = Crypt(password);
				var timeout = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingAuthorizationTimeout"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-CLIENT-ADDR", ipAddress);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						login = loginSys,
						passwordHash = cryptedPass,
						sessionTimeout = timeout
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "Authorization");
					var authorizationResponse = JsonConvert.DeserializeObject<AuthorizationResponse>(result.ToString());
					if(authorizationResponse.res == 1)
					{
						return authorizationResponse;
					}
					else
					{
						return null;
					}
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "Authorization error");
				return null;
			}
		}
		
		public LoginResponse LoginOnPhone(string cardNumber, string phoneNumber, string sessionId)
		{
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProccesingLoginMethod"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						phone = phoneNumber
						//passwordHash = password,
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "LoginOnPhone");
					var loginResponse = JsonConvert.DeserializeObject<LoginResponse>(result.ToString());
					return loginResponse;
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "LoginOnPhone error");
				return null;
			}
		}
		public SearchResponse Search(string number, string sessionId, int code)
		{
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProccesingSerchMethod"));
				SearchResponse searchResponse = new SearchResponse();
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				if(code == 1)
				{
					using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
					{
						string json = JsonConvert.SerializeObject(new
						{
							cardNum = number,
						}).ToString();
						streamWriter.Write(json);
						streamWriter.Flush();
						streamWriter.Close();
					}
				}
				if(code == 2)
				{
					using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
					{
						string json = JsonConvert.SerializeObject(new
						{
							phone = number,
						}).ToString();
						streamWriter.Write(json);
						streamWriter.Flush();
						streamWriter.Close();
					}
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "Search");
					searchResponse = JsonConvert.DeserializeObject<SearchResponse>(result.ToString());
					if(searchResponse.res==1)
					{
						return searchResponse;
					}
					else
					{
						return null;
					}
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "Search error");
				return null;
			}

		}
		public bool GetTransactions(string uId, string sessionId, Guid contactId, bool isAdvancedInfo)
		{
			TransactionsResponse transactionResponse = new TransactionsResponse();
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var limitTran = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrMaxTransactionsCount"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingGetTransaction"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						uid = uId,
						orderBy = "date",
						limit = limitTran
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "GetTransactions");
					transactionResponse = JsonConvert.DeserializeObject<TransactionsResponse>(result.ToString());
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "GetTransactions error");
			}
			if(transactionResponse.res == 1)
			{
				Guid foundedTransaction = Guid.Empty;
				foreach(var transaction in transactionResponse.transactions)
				{
					foundedTransaction = GetLookupBpmIdByString("UsrTransaction", "UsrTransactionId", transaction.transactionId, "Id");
					if(foundedTransaction==Guid.Empty)
					{
						var entityTransaction = userConnection.EntitySchemaManager.GetInstanceByName("UsrTransaction").CreateEntity(userConnection);
						entityTransaction.SetDefColumnValues();
						Guid TransactionNewId = Guid.NewGuid();
						entityTransaction.SetColumnValue("Id", TransactionNewId);
						if(contactId!=Guid.Empty)
						{
							entityTransaction.SetColumnValue("UsrContactIdId", contactId);
						}
						if(!String.IsNullOrEmpty(transaction.transactionId))
						{
							entityTransaction.SetColumnValue("UsrTransactionId", transaction.transactionId);
							entityTransaction.SetColumnValue("Name", transaction.transactionId);
						}
						if(!String.IsNullOrEmpty(transaction.uid))
						{
							entityTransaction.SetColumnValue("UsrUid", transaction.uid);
						}
						if(!String.IsNullOrEmpty(transaction.date))
						{
							entityTransaction.SetColumnValue("UsrDate", GetDateFromString(transaction.date));
						}
						if(!String.IsNullOrEmpty(transaction.type))
						{
							var type = GetLookupBpmIdByString("UsrTransactionType", "Description", transaction.type, "Id");
							if(type!=Guid.Empty)
							{
								entityTransaction.SetColumnValue("UsrTypeId", type);
							}
						}
						if(!String.IsNullOrEmpty(transaction.cardNum))
						{
							entityTransaction.SetColumnValue("UsrCardNumber", transaction.cardNum);
						}
						if(!String.IsNullOrEmpty(transaction.amount))
						{
							entityTransaction.SetColumnValue("UsrAmount", Convert.ToDecimal(transaction.amount)/100);
						}
						if(!String.IsNullOrEmpty(transaction.amountBonus))
						{
							entityTransaction.SetColumnValue("UsrAmountBonus", Convert.ToDecimal(transaction.amountBonus)/100);
						}
						if(!String.IsNullOrEmpty(transaction.amountDiscount))
						{
							entityTransaction.SetColumnValue("UsrAmountDiscount", Convert.ToDecimal(transaction.amountDiscount)/100);
						}
						if(!String.IsNullOrEmpty(transaction.amountCharge))
						{
							entityTransaction.SetColumnValue("UsrAmountCharge", Convert.ToDecimal(transaction.amountCharge)/100);
						}
						if(!String.IsNullOrEmpty(transaction.amountTotal))
						{
							entityTransaction.SetColumnValue("UsrAmountTotal", Convert.ToDecimal(transaction.amountTotal)/100);
						}
						if(!String.IsNullOrEmpty(transaction.storeName))
						{
							entityTransaction.SetColumnValue("UsrStoreName", transaction.storeName);
						}
						if(!String.IsNullOrEmpty(transaction.items))
						{
							entityTransaction.SetColumnValue("UsrItems", transaction.items);
						}
						try
						{
							entityTransaction.Save(false);
						}
						catch (Exception ex)
						{
							Logger.Log("ERROR: " + ex.Message, userConnection, "GetTransactions Set error");
						}
						if(transaction.transactionId!=String.Empty&&isAdvancedInfo)
						{
							TransactionItemResponse transactionItemResponse = GetTransactionAdwansedInfo(uId, sessionId, transaction.transactionId);
							Guid foundedItem = Guid.Empty;
							foreach(var item in transactionItemResponse.transaction.items)
							{
								foundedItem = GetLookupBpmIdByString("UsrProductInTransaction", "UsrTransactionItemId", item.transactionItemId, "Id");
								if(foundedItem==Guid.Empty)
								{
									var entityItem = userConnection.EntitySchemaManager.GetInstanceByName("UsrProductInTransaction").CreateEntity(userConnection);
									entityItem.SetDefColumnValues();
									if(contactId!=Guid.Empty)
									{
										entityItem.SetColumnValue("UsrContactId", contactId);
									}
									if(TransactionNewId!=Guid.Empty)
									{
										entityItem.SetColumnValue("UsrTransactionId", TransactionNewId);
									}
									if(!String.IsNullOrEmpty(item.productName))
									{
										entityItem.SetColumnValue("Name", item.productName);
									}
									if(!String.IsNullOrEmpty(item.transactionItemId))
									{
										entityItem.SetColumnValue("UsrTransactionItemId", item.transactionItemId);
									}
									if(!String.IsNullOrEmpty(item.pos))
									{
										entityItem.SetColumnValue("UsrPosition", item.pos);
									}
									if(!String.IsNullOrEmpty(item.SKU))
									{
										entityItem.SetColumnValue("UsrSKU", item.SKU);
									}
									if(!String.IsNullOrEmpty(item.qty))
									{
										entityItem.SetColumnValue("UsrQuantit", item.qty);
									}
									if(!String.IsNullOrEmpty(item.price))
									{
										entityItem.SetColumnValue("UsrPrice", Convert.ToDecimal(item.price)/100);
									}
									if(!String.IsNullOrEmpty(item.discount))
									{
										entityItem.SetColumnValue("UsrDiscount", Convert.ToDecimal(item.discount)/100);
									}
									if(!String.IsNullOrEmpty(item.bonus))
									{
										entityItem.SetColumnValue("UsrBonus", Convert.ToDecimal(item.bonus)/100);
									}
									if(!String.IsNullOrEmpty(item.marketingRuleId))
									{
										entityItem.SetColumnValue("UsrMarketingRuleId", Convert.ToInt32(item.marketingRuleId));
									}
									if(!String.IsNullOrEmpty(item.charge))
									{
										entityItem.SetColumnValue("UsrCharge", Convert.ToDecimal(item.charge)/100);
									}
									try
									{
										entityItem.Save(false);
									}
									catch (Exception ex)
									{
										Logger.Log("ERROR: " + ex.Message, userConnection, "GetTransactionItem Set error");
									}
								}
								foundedItem = Guid.Empty;
							}
						}
					}
					foundedTransaction = Guid.Empty;
				}
				return true;
			}
			else
			{
				return false;
			}
		}
		public TransactionItemResponse GetTransactionAdwansedInfo(string uId, string sessionId, string transactionIdPar)
		{
			TransactionItemResponse transactionResponse = new TransactionItemResponse();
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingGetTransactionItem"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						uid = uId,
						transactionId = transactionIdPar
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "GetTransactions");
					transactionResponse = JsonConvert.DeserializeObject<TransactionItemResponse>(result.ToString());
					return transactionResponse;
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "GetTransactions error");
				return transactionResponse;
			}
		}
		public bool GetInfo(string uId, Guid contactId, string sessionId)
		{
			InfoResponse infoResponse = new InfoResponse();
			string errors = "";
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingGetInfo"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						uid = uId
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "GetInfo");
					infoResponse = JsonConvert.DeserializeObject<InfoResponse>(result.ToString());
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "GetInfo error");
			}
			if(infoResponse.res == 1)
			{
				try{
					var entity = userConnection.EntitySchemaManager.GetInstanceByName("Contact").CreateEntity(userConnection);
					if(entity.FetchFromDB(contactId))
					{
						if(!String.IsNullOrEmpty(infoResponse.buyer.firstName)||!String.IsNullOrEmpty(infoResponse.buyer.lastName))
						{
							entity.SetColumnValue("Name", infoResponse.buyer.lastName + " " + infoResponse.buyer.firstName + " " + infoResponse.buyer.middleName);
							errors += "Name added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.lastName))
						{
							entity.SetColumnValue("Surname", infoResponse.buyer.lastName);
							errors += "Surname added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.firstName))
						{
							entity.SetColumnValue("GivenName", infoResponse.buyer.firstName);
							errors += "GivenName added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.middleName))
						{
							entity.SetColumnValue("MiddleName", infoResponse.buyer.middleName);
							errors += "MiddleName added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.sex))
						{
							var gender = GetLookupBpmIdByString("Gender", "Name", "Мужской", "Id");
							if(infoResponse.buyer.sex == "2")
							{
								gender = GetLookupBpmIdByString("Gender", "Name", "Женский", "Id");
							}
							if(gender!=Guid.Empty)
							{
								entity.SetColumnValue("GenderId", gender);
								errors += "GenderId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.birthDate))
						{
							entity.SetColumnValue("BirthDate", GetDateFromString(infoResponse.buyer.birthDate));
							errors += "BirthDate added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.registrationDate))
						{
							entity.SetColumnValue("UsrDateRegistrationCard", GetDateFromString(infoResponse.buyer.registrationDate));
							errors += "UsrDateRegistrationCard added\n";
						}
						
						
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrZIP))
						{
							entity.SetColumnValue("Zip", infoResponse.buyer.addrZIP);
							errors += "Zip added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrRegion))
						{
							var region = GetLookupBpmIdByString("Region", "Name", infoResponse.buyer.addrRegion, "Id");
							if(region!=Guid.Empty)
							{
								entity.SetColumnValue("RegionId", region);
								errors += "RegionId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrCity))
						{
							var city = GetLookupBpmIdByString("City", "Name", infoResponse.buyer.addrCity, "Id");
							if(city!=Guid.Empty)
							{
								entity.SetColumnValue("CityId", city);
								errors += "CityId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrStreet))
						{
							entity.SetColumnValue("Address", infoResponse.buyer.addrStreet + ", " + infoResponse.buyer.addrBuilding + ", " + infoResponse.buyer.addrHousing + ", " + infoResponse.buyer.addrFlat);
						
							errors += "Address added\n";
						}
						/*if(!String.IsNullOrEmpty(infoResponse.buyer.addrStreet))
						{
							var contactaddId = GetLookupBpmIdByGuid("ContactAddress", "ContactId", contactId, "Id");
							var entityCC = userConnection.EntitySchemaManager.GetInstanceByName("ContactAddress").CreateEntity(userConnection);
							if(entityCC.FetchFromDB(contactaddId))
							{
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrCity))
									{
										var city = GetLookupBpmIdByString("City", "Name", infoResponse.buyer.addrCity, "Id");
										if(city!=Guid.Empty)
										{
											entityCC.SetColumnValue("CityId", city);
										}
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrRegion))
									{
										var region = GetLookupBpmIdByString("Region", "Name", infoResponse.buyer.addrRegion, "Id");
										if(region!=Guid.Empty)
										{
											entityCC.SetColumnValue("RegionId", region);
										}
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrZIP))
									{
										entityCC.SetColumnValue("Zip", infoResponse.buyer.addrZIP);
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrStreet))
									{
										entityCC.SetColumnValue("Address", infoResponse.buyer.addrStreet);
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrBuilding))
									{
										entityCC.SetColumnValue("UsrHouse", infoResponse.buyer.addrBuilding);
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrHousing))
									{
										entityCC.SetColumnValue("UsrCorps", infoResponse.buyer.addrHousing);
									}
									if(!String.IsNullOrEmpty(infoResponse.buyer.addrFlat))
									{
										entityCC.SetColumnValue("UsrApartment", infoResponse.buyer.addrFlat);
									}
									try
									{
										entityCC.Save(false);
									}
									catch (Exception ex)
									{
										Logger.Log("ERROR: " + ex.Message, userConnection, "GetInfo Set error");
										return false;
									}
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrZIP))
						{
							entity.SetColumnValue("Zip", infoResponse.buyer.addrZIP);
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrRegion))
						{
							var region = GetLookupBpmIdByString("Region", "Name", infoResponse.buyer.addrRegion, "Id");
							if(region!=Guid.Empty)
							{
								entity.SetColumnValue("RegionId", region);
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrCity))
						{
							var city = GetLookupBpmIdByString("City", "Name", infoResponse.buyer.addrCity, "Id");
							if(city!=Guid.Empty)
							{
								entity.SetColumnValue("CityId", city);
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrStreet))
						{
							entity.SetColumnValue("Address", infoResponse.buyer.addrStreet);
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrBuilding))
						{
							entity.SetColumnValue("UsrHouse", infoResponse.buyer.addrBuilding);
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrHousing))
						{
							entity.SetColumnValue("UsrCorps", infoResponse.buyer.addrHousing);
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.addrFlat))
						{
							entity.SetColumnValue("UsrApartment", infoResponse.buyer.addrFlat);
						}*/
						if(!String.IsNullOrEmpty(infoResponse.buyer.cellphone))
						{
							entity.SetColumnValue("MobilePhone", infoResponse.buyer.cellphone);
							errors += "MobilePhone added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.sendSMS))
						{
							var agreeSMS = GetLookupBpmIdByString("UsrAcceptanceSendingSMS", "Name", "Не отправлять", "Id");
							if(infoResponse.buyer.sendSMS == "1")
							{
								agreeSMS = GetLookupBpmIdByString("UsrAcceptanceSendingSMS", "Name", "Информационные", "Id");
							}
							if(infoResponse.buyer.sendSMS == "3")
							{
								agreeSMS = GetLookupBpmIdByString("UsrAcceptanceSendingSMS", "Name", "Информационные и рекламные", "Id");
							}
							if(agreeSMS!=Guid.Empty)
							{
								entity.SetColumnValue("UsrAcceptanceSMSPlId", agreeSMS);
								errors += "UsrAcceptanceSMSPlId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.sendEmail))
						{
							var agreeEmail = GetLookupBpmIdByString("UsrAcceptanceSendingEmail", "Name", "Не согласен", "Id");
							if(infoResponse.buyer.sendEmail == "1")
							{
								agreeEmail = GetLookupBpmIdByString("UsrAcceptanceSendingEmail", "Name", "Служебные", "Id");
							}
							if(infoResponse.buyer.sendEmail == "3")
							{
								agreeEmail = GetLookupBpmIdByString("UsrAcceptanceSendingEmail", "Name", "Служебные и рекламные", "Id");
							}
							if(agreeEmail!=Guid.Empty)
							{
								entity.SetColumnValue("UsrAcceptanceEmailPlId", agreeEmail);
								errors += "UsrAcceptanceEmailPlId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.preferredContact))
						{
							var prefared = GetLookupBpmIdByString("UsrPreferCommunication", "Name", infoResponse.buyer.preferredContact, "Id");
							if(prefared!=Guid.Empty)
							{
								entity.SetColumnValue("UsrPrefareCommunicationId", prefared);
								errors += "UsrPrefareCommunicationId added\n";
							}
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.buyerStatus))
						{
							var status = GetLookupBpmIdByString("UsrContactStatus", "Name", infoResponse.buyer.buyerStatus, "Id");
							if(status!=Guid.Empty)
							{
								entity.SetColumnValue("UsrContactStatusId", status);
								errors += "UsrContactStatusId added\n";
							}
						}
						string cards=infoResponse.buyer.cards;
						string[] str = cards.Split(',');
						CardInfo cardInfo = new CardInfo();
						if(!String.IsNullOrEmpty(cards))
						{
							cardInfo = SetCard(str, contactId, sessionId);
							Logger.Log("CardNum: " + cardInfo.cardNum + " CardType: " + cardInfo.cardStatus, userConnection, "CardTypeInfo");
							entity.SetColumnValue("UsrNumberActiveCard", cardInfo.cardNum);
							if(!string.IsNullOrEmpty(cardInfo.cardStatus)){
								Guid cardType = GetLookupBpmIdByString("UsrCardType", "Name", cardInfo.cardStatus, "Id");
								Logger.Log("cardTypeBpmId: " + cardType, userConnection, "CardTypeId");
								if(cardType != Guid.Empty){
									entity.SetColumnValue("UsrCardTypeId", cardType);
									errors += "UsrCardTypeId added\n";
								}
							}
						}
						
						CabinetResponse cabinetInfo = new CabinetResponse();
						cabinetInfo = GetCabinetInfo(uId, contactId, sessionId);
						Logger.Log("cabinetInfo.buyer.subscriptions.Count(): " + cabinetInfo.buyer.subscriptions.Count(), userConnection, "CabinetInfoCount");
						if(!String.IsNullOrEmpty(infoResponse.buyer.oddMoneyBalance))
						{
							entity.SetColumnValue("UsrWalletBalance", Convert.ToDecimal(infoResponse.buyer.oddMoneyBalance)/100);
							errors += "UsrWalletBalance added\n";
						}
						
						if(cabinetInfo.buyer.subscriptions.Count() > 0){
							entity.SetColumnValue("UsrSymptomParticipationClub", true);
							
							if (!string.IsNullOrEmpty(cabinetInfo.buyer.subscriptions[0].sendEmail))
			                {
			                	Guid baseEmailId = GetLookupBpmIdByString("UsrAcceptanceSendingEmail", "UsrCodeId", "0", "Id");
								Guid sendEmailId = GetLookupBpmIdByString("UsrAcceptanceSendingEmail", "UsrCodeId", cabinetInfo.buyer.subscriptions[0].sendEmail.ToString(), "Id");
								if(sendEmailId != Guid.Empty){
									entity.SetColumnValue("UsrAcceptanceEmailKmId", sendEmailId);
									errors += "UsrAcceptanceEmailKmId added\n";
								}
								else{
									entity.SetColumnValue("UsrAcceptanceEmailKmId", baseEmailId);
									errors += "UsrAcceptanceEmailKmId added\n";
								}
			                }
			                
			                if (!string.IsNullOrEmpty(cabinetInfo.buyer.subscriptions[0].sendSMS))
			                {
								Guid baseSMSId = GetLookupBpmIdByString("UsrAcceptanceSendingSMS", "UsrCodeId", "0", "Id");
								Guid sendSMSId = GetLookupBpmIdByString("UsrAcceptanceSendingSMS", "UsrCodeId", cabinetInfo.buyer.subscriptions[0].sendSMS.ToString(), "Id");
								if(sendSMSId != Guid.Empty){
									entity.SetColumnValue("UsrAcceptanceSMSKmId", sendSMSId);
									errors += "UsrAcceptanceSMSKmId added\n";
								}
								else{
									entity.SetColumnValue("UsrAcceptanceSMSKmId", baseSMSId);
									errors += "UsrAcceptanceSMSKmId added\n";
								}
			                }
						}
						
						if(!String.IsNullOrEmpty(infoResponse.buyer.activeBalance))
						{
							entity.SetColumnValue("UsrBalanceTrade", Convert.ToDecimal(infoResponse.buyer.activeBalance)/100);
							errors += "UsrBalanceTrade added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.inactiveBalance))
						{
							entity.SetColumnValue("UsrInactiveBalance", Convert.ToDecimal(infoResponse.buyer.inactiveBalance)/100);
							errors += "UsrInactiveBalance added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.oddMoneyBalance))
						{
							entity.SetColumnValue("UsrOddMoneyBalance", Convert.ToDecimal(infoResponse.buyer.oddMoneyBalance)/100);
							errors += "UsrOddMoneyBalance added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.oddMoneyFlags))
						{
							var oddMoneyFlags = false;
							if(infoResponse.buyer.oddMoneyFlags == "1")
							{
								oddMoneyFlags = true;;
							}
							entity.SetColumnValue("UsrOddMoneyFlags", oddMoneyFlags);
							errors += "UsrOddMoneyFlags added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.phoneConfirmed))
						{
							var phoneConfirmed = false;
							if(infoResponse.buyer.phoneConfirmed == "1")
							{
								phoneConfirmed = true;;
							}
							entity.SetColumnValue("UsrPhoneConfirmed", phoneConfirmed);
							errors += "UsrPhoneConfirmed added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.emailConfirmed))
						{
							var emailConfirmed = false;
							if(infoResponse.buyer.emailConfirmed == "1")
							{
								emailConfirmed = true;;
							}
							entity.SetColumnValue("UsrEmailConfirmed", emailConfirmed);
							errors += "UsrEmailConfirmed added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.spendAllowed))
						{
							var spendAllowed = false;
							if(infoResponse.buyer.spendAllowed == "1")
							{
								spendAllowed = true;;
							}
							entity.SetColumnValue("UsrSpendAllowed", spendAllowed);
							errors += "UsrSpendAllowed added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.passportSeries))
						{
							entity.SetColumnValue("UsrPassportSeries", infoResponse.buyer.passportSeries);
							errors += "UsrPassportSeries added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.passportNumber))
						{
							entity.SetColumnValue("UsrPassportNumber", infoResponse.buyer.passportNumber);
							errors += "UsrPassportNumber added\n";
						}
						if(!String.IsNullOrEmpty(infoResponse.buyer.passportIssueAuthority))
						{
							entity.SetColumnValue("UsrPassportIssueAuthority", infoResponse.buyer.passportIssueAuthority);
							errors += "UsrPassportIssueAuthority added\n";
						}
						entity.SetColumnValue("UsrPassportIssueDate", GetDateFromString(infoResponse.buyer.passportIssueDate));
						try
						{
							entity.Save(false);
							Logger.Log("Success inserted", userConnection, "SaveContact");
						}
						catch (Exception ex)
						{
							Logger.Log("ERROR: " + ex.Message, userConnection, "GetInfo Set error");
							return false;
						}

					if(infoResponse.balances!=null)
					{
						foreach(var balance in infoResponse.balances)
						{
							var entityBalance = userConnection.EntitySchemaManager.GetInstanceByName("UsrContactBalance").CreateEntity(userConnection);
							if(contactId!=Guid.Empty)
							{
								entityBalance.SetColumnValue("UsrContactId", contactId);
							}
							if(!String.IsNullOrEmpty(balance.balanceTypeId))
							{
								entityBalance.SetColumnValue("UsrBalanceTypeId", balance.balanceTypeId);
							}
							if(!String.IsNullOrEmpty(balance.balanceTypeName))
							{
								entityBalance.SetColumnValue("UsrBalanceTypeName", balance.balanceTypeName);
							}
							if(!String.IsNullOrEmpty(balance.balance))
							{
								entityBalance.SetColumnValue("UsrBalance", balance.balance);
							}
							try
							{
								entityBalance.Save(false);
							}
							catch (Exception ex)
							{
								Logger.Log("ERROR: " + ex.Message, userConnection, "GetInfo Set Balance error");
								return false;
							}
						}
					}
					return true;
				}
				else
				{
					return false;
				}
				}
				catch(Exception ex){
					Logger.Log("ERROR: " + ex.Message + "\n" + "Errors/added : " + errors, userConnection, "GetInfo main block");
					return false;
				}
				
			}
			else
			{
				return false;
			}
		}
		
		public CabinetResponse GetCabinetInfo(string uId, Guid contactId, string sessionId)
		{
			CabinetResponse cabinetInfo = new CabinetResponse();
			try{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingGetCabinetInfo"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
                httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
                httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
                httpWebRequest.Headers.Add("Cache-Control", "no-cache");
                httpWebRequest.Method = "POST";
                httpWebRequest.ServicePoint.Expect100Continue = false;
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						uid = uId
					}).ToString();
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "GetCabinetInfo");
					cabinetInfo = JsonConvert.DeserializeObject<CabinetResponse>(result.ToString());
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "GetCabinetInfo error");
				return null;
			}
			return cabinetInfo;
		}
		
		public CardInfo SetCard(string[] str, Guid contactId, string sessionId)
		{
			string nameActCacd3="";
			CardInfo activeCardInfo = new CardInfo();
			activeCardInfo.cardNum = "";
			foreach(var card in str)
			{
				var IdcardDelet = GetLookupBpmIdCardInStatus1Or2(contactId, card);
				var entity = userConnection.EntitySchemaManager.GetInstanceByName("UsrContactInactiveCard").CreateEntity(userConnection);
				if(entity.FetchFromDB(IdcardDelet))
				{
					try
					{
						entity.Delete();
					}
					catch (Exception ex)
					{
						Logger.Log("ERROR: " + ex.Message, userConnection, "Card Delete error");
						return null;
					}
				}
				var IdCard = GetLookupBpmIdByGuidAndString("UsrContactInactiveCard", "UsrContactId", "UsrCardNumber", contactId, card, "Id");
				if(IdCard!=Guid.Empty){continue;}
				CardInfo cardInfo = new CardInfo();
				
				try
				{
					var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
					var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingGetCardInfo"));
					var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
					
					httpWebRequest.ContentType = "application/x-www-form-urlencoded";
					httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
					httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
					httpWebRequest.Headers.Add("Cache-Control", "no-cache");
					httpWebRequest.Method = "POST";
					httpWebRequest.ServicePoint.Expect100Continue = false;
					using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
					{
						string json = JsonConvert.SerializeObject(new
						{
							cardNum = card
						}).ToString();
						streamWriter.Write(json);
						streamWriter.Flush();
						streamWriter.Close();
					}
					var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
					using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
					{
						var result = streamReader.ReadToEnd();
						Logger.Log("RESPONSE: " + result.ToString(), userConnection, "GetCardInfo");
						cardInfo = JsonConvert.DeserializeObject<CardInfo>(result.ToString());
					}
				}
				catch (Exception ex)
				{
					Logger.Log("ERROR: " + ex.Message, userConnection, "CardInfo error");
				}
				if(cardInfo.res == 1 && cardInfo.state == 3){activeCardInfo = cardInfo; activeCardInfo.cardNum = card; nameActCacd3=card;}
				if(cardInfo.res == 1 && cardInfo.state != 3)
				{
					var cardStatId = GetLookupBpmIdByInt("UsrStatusCard", "UsrCodeId", cardInfo.state, "Id");
					var entityInactiveCard = userConnection.EntitySchemaManager.GetInstanceByName("UsrContactInactiveCard").CreateEntity(userConnection);
					entityInactiveCard.SetDefColumnValues();
					entityInactiveCard.SetColumnValue("UsrCardNumber", card);
					entityInactiveCard.SetColumnValue("UsrStatusCardId", cardStatId != Guid.Empty ? cardStatId : (Guid?)null);
					entityInactiveCard.SetColumnValue("UsrContactId", contactId != Guid.Empty ? contactId : (Guid?)null);
					try
					{
						entityInactiveCard.Save(false);
					}
					catch (Exception ex)
					{
						Logger.Log("ERROR: " + ex.Message, userConnection, "Set Card error");
						return null;
					}
				}
			}
			return activeCardInfo;
		}
		
		public void UpdateContact(string uId, Guid contactId, string sessionId)
		{
			UpdateResponse updateResponse = new UpdateResponse();
			try
			{
				var url = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrAutorizationProcessingUrl"));
				var method = Convert.ToString(Terrasoft.Core.Configuration.SysSettings.GetValue(userConnection, "UsrProcessingUpdateContact"));
				var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.Headers.Add("X-FXAPI-RQ-METHOD", method);
				httpWebRequest.Headers.Add("X-FXAPI-SID", sessionId);
				httpWebRequest.Headers.Add("Cache-Control", "no-cache");
				httpWebRequest.Method = "POST";
				httpWebRequest.ServicePoint.Expect100Continue = false;
				
				string sexDB = null;
				string addrRegionDB = null;
				string addrCityDB = null;
				string sendSMSDB = null;
				string sendEmailDB = null;
				string preferredContactDB = null;
				var emailDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "Email");
				var lastNameDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "Surname");
				var firstNameDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "GivenName");
				var middleNameDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "MiddleName");
				Guid sexId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "GenderId");
				if(sexId!=Guid.Empty)
				{
					sexDB = GetLookupBpmNameByGuid("Gender", "Id", sexId, "UsrCode");
				}
				var birthDateCode = GetDateTimeByGuid("Contact", "Id", contactId, "BirthDate");
				var birthDateDB = birthDateCode.ToString("yyyy-MM-dd HH:mm:ss.fff");
				var addrZIPDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "Zip");
				Guid addrRegionId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "RegionId");
				if(addrRegionId!=Guid.Empty)
				{
					addrRegionDB = GetLookupBpmNameByGuid("Region", "Id", addrRegionId, "Name");
				}
				Guid addrCityId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "CityId");
				if(addrCityId!=Guid.Empty)
				{
					addrCityDB = GetLookupBpmNameByGuid("City", "Id", addrCityId, "Name");
				}
				var contactaddId = GetLookupBpmIdByGuid("ContactAddress", "ContactId", contactId, "Id");
				if(contactaddId!=Guid.Empty)
				{
					//-----------------------------
				}
				var addrStreetDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "Address");
				var addrBuildingDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "UsrHouse");
				var addrHousingDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "UsrCorps");
				var addrFlatDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "UsrApartment");
				var phoneDB = GetLookupBpmNameByGuid("Contact", "Id", contactId, "MobilePhone");
				Guid sendSMSId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "UsrAcceptanceSMSPlId");
				if(sendSMSId!=Guid.Empty)
				{
					sendSMSDB = GetLookupBpmNameByGuid("UsrAcceptanceSendingSMS", "Id", sendSMSId, "UsrCodeId");
				}
				Guid sendEmailId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "UsrAcceptanceEmailPlId");
				if(sendEmailId!=Guid.Empty)
				{
					sendEmailDB = GetLookupBpmNameByGuid("UsrAcceptanceSendingEmail", "Id", sendEmailId, "UsrCodeId");
				}
				Guid preferredContactId  = GetLookupBpmIdByGuid("Contact", "Id", contactId, "UsrPrefareCommunicationId");
				if(preferredContactId!=Guid.Empty)
				{
					preferredContactDB = GetLookupBpmNameByGuid("UsrPreferCommunication", "Id", preferredContactId, "Name");
				}
				using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
				{
					string json = JsonConvert.SerializeObject(new
					{
						uid = uId,
						buyer = new
						{
							email = emailDB,
							lastName = lastNameDB,
							firstName = firstNameDB,
							middleName = middleNameDB,
							sex = sexDB,
							birthDate = birthDateDB,
							addrZIP = addrZIPDB,
							addrRegion = addrRegionDB,
							addrCity = addrCityDB,
							addrStreet = addrStreetDB,
							/*addrBuilding = addrBuildingDB,
							addrHousing = addrHousingDB,
							addrFlat = addrFlatDB,*/
							phone = phoneDB,
							sendSMS = sendSMSDB,
							sendEmail = sendEmailDB,
							preferredContact = preferredContactDB
						}
					}).ToString();
					Logger.Log("REQUEST: " + json, userConnection, "UpdateContact");
					streamWriter.Write(json);
					streamWriter.Flush();
					streamWriter.Close();
				}
				var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
				{
					var result = streamReader.ReadToEnd();
					Logger.Log("RESPONSE: " + result.ToString(), userConnection, "UpdateContact");
					updateResponse = JsonConvert.DeserializeObject<UpdateResponse>(result.ToString());
				}
			}
			catch (Exception ex)
			{
				Logger.Log("ERROR: " + ex.Message, userConnection, "UpdateContact error");
			}
		}
		
		public void ContactNotFoundOnServer()
		{
			Logger.Log("ERROR: Contact with suth numer not fount on server", userConnection, "UpdateContact error");
		}
		public void AuthorizationFailed()
		{
			Logger.Log("ERROR: Authorization failed", userConnection, "UpdateContact error");
		}
		public string Crypt(string source)
		{
			string hash;
			using (MD5 md5Hash = MD5.Create())
			{
				hash = GetMd5Hash(md5Hash, source);
			}
			return hash;
		}
		static string GetMd5Hash(MD5 md5Hash, string input)
		{
			byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
			StringBuilder sBuilder = new StringBuilder();
			for (int i = 0; i < data.Length; i++)
			{
				sBuilder.Append(data[i].ToString("x2"));
			}
			return sBuilder.ToString();
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
		public Guid GetLookupBpmIdByGuid(string table, string column, Guid value, string columnReturn)
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
		public string GetStringValueByString(string table, string column, string value, string columnReturn)
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
		public DateTime GetDateTimeByGuid(string table, string column, Guid value, string columnReturn)
		{
			var lookupBPMName = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<DateTime>();
			return lookupBPMName;
		}
		public Guid GetLookupBpmIdByGuidAndString(string table, string column, string column2, Guid value, string value2, string columnReturn)
		{
			if (value == Guid.Empty || value == null)
			{
				return Guid.Empty;
			}
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column(columnReturn)
				.From(table)
				.Where(column).IsEqual(Terrasoft.Core.DB.Column.Parameter(value))
				.And(column2).IsEqual(Terrasoft.Core.DB.Column.Parameter(value2)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
		public Guid GetLookupBpmIdCardInStatus1Or2(Guid value, string card)
		{
			if (card == string.Empty || card == null)
			{
				return Guid.Empty;
			}
			var statusCard1 = 1;
			var statusCard2 = 2;
			var lookupBPMId = (new Select(userConnection).Top(1)
				.Column("Id")
				.From("UsrContactInactiveCard")
				.Where()
				.OpenBlock("UsrStatusCardId").IsEqual(new Select(userConnection)
						.Column("Id")
						.From("UsrStatusCard")
						.Where("UsrCodeId").IsEqual(Terrasoft.Core.DB.Column.Parameter(statusCard1)))
					.Or("UsrStatusCardId").IsEqual(new Select(userConnection)
						.Column("Id")
						.From("UsrStatusCard")
						.Where("UsrCodeId").IsEqual(Terrasoft.Core.DB.Column.Parameter(statusCard2)))
				.CloseBlock()
				.And("UsrCardNumber").IsEqual(Terrasoft.Core.DB.Column.Parameter(card))
				.And("UsrContactId").IsEqual(Terrasoft.Core.DB.Column.Parameter(value)) as Select).ExecuteScalar<Guid>();
			return lookupBPMId;
		}
	}
	[DataContract]
	public class AuthorizationResponse
	{
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
		[DataMember]
		[JsonProperty("sid")]
		public string sid { get; set; }
		[DataMember]
		[JsonProperty("role")]
		public string role { get; set; }
		[DataMember]
		[JsonProperty("permissions")]
		public int permissions { get; set; }
	}
	[DataContract]
	public class LoginResponse
	{
		[DataMember]
		[JsonProperty("uid")]
		public string uid { get; set; }
		[DataMember]
		[JsonProperty("first")]
		public int first { get; set; }
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	
	[DataContract]
	public class CabinetResponse{
		[DataMember]
		[JsonProperty("cards")]
		public List<CardKM> cards { get; set; }
		[DataMember]
		[JsonProperty("balances")]
		public List<BalanceKM> balances { get; set; }
		[DataMember]
		[JsonProperty("buyer")]
		public BuyerKM buyer { get; set; }
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	
	[DataContract]
	public class TransactionsResponse
	{
		[DataMember]
		[JsonProperty("transactions")]
		public List<Transaction> transactions { get; set; }
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	[DataContract]
	public class SearchResponse
	{
		[DataMember]
		[JsonProperty("uid")]
		public string uid { get; set; }
		[DataMember]
		[JsonProperty("buyer")]
		public Buyer buyer { get; set; }
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	public class Buyer
	{
		[DataMember]
		[JsonProperty("firstName")]
		public string firstName  { get; set; }
		[DataMember]
		[JsonProperty("lastName")]
		public string lastName { get; set; }
		[DataMember]
		[JsonProperty("middleName")]
		public string middleName { get; set; }
		[DataMember]
		[JsonProperty("birthDate")]
		public string birthDate { get; set; }
		[DataMember]
		[JsonProperty("email")]
		public string email { get; set; }
		[DataMember]
		[JsonProperty("cellphone")]
		public string cellphone { get; set; }
		[DataMember]
		[JsonProperty("trustedPhone")]
		public string trustedPhone { get; set; }
		[DataMember]
		[JsonProperty("activeBalance")]
		public string activeBalance { get; set; }
		[DataMember]
		[JsonProperty("inactiveBalance")]
		public string inactiveBalance { get; set; }
		[DataMember]
		[JsonProperty("oddMoneyBalance")]
		public string oddMoneyBalance { get; set; }
		[DataMember]
		[JsonProperty("oddMoneyFlags")]
		public string oddMoneyFlags { get; set; }
		[DataMember]
		[JsonProperty("phoneConfirmed")]
		public string phoneConfirmed { get; set; }
		[DataMember]
		[JsonProperty("emailConfirmed")]
		public string emailConfirmed { get; set; }
		[DataMember]
		[JsonProperty("printName")]
		public string printName { get; set; }
		[DataMember]
		[JsonProperty("sex")]
		public string sex { get; set; }
		[DataMember]
		[JsonProperty("registrationDate")]
		public string registrationDate { get; set; }
		[DataMember]
		[JsonProperty("lastAuthDate")]
		public string lastAuthDate { get; set; }
		[DataMember]
		[JsonProperty("addrZIP")]
		public string addrZIP { get; set; }
		[DataMember]
		[JsonProperty("addrRegion")]
		public string addrRegion { get; set; }
		[DataMember]
		[JsonProperty("addrCity")]
		public string addrCity { get; set; }
		[DataMember]
		[JsonProperty("addrStreet")]
		public string addrStreet { get; set; }
		[DataMember]
		[JsonProperty("addrBuilding")]
		public string addrBuilding { get; set; }
		[DataMember]
		[JsonProperty("addrHousing")]
		public string addrHousing { get; set; }
		[DataMember]
		[JsonProperty("addrFlat")]
		public string addrFlat { get; set; }
		[DataMember]
		[JsonProperty("sendSMS")]
		public string sendSMS { get; set; }
		[DataMember]
		[JsonProperty("sendEmail")]
		public string sendEmail { get; set; }
		[DataMember]
		[JsonProperty("preferredContact")]
		public string preferredContact { get; set; }
		[DataMember]
		[JsonProperty("cards")]
		public string cards { get; set; }
		[DataMember]
		[JsonProperty("buyerStatus")]
		public string buyerStatus { get; set; }
		[DataMember]
		[JsonProperty("spendAllowed")]
		public string spendAllowed { get; set; }
		[DataMember]
		[JsonProperty("passportSeries")]
		public string passportSeries { get; set; }
		[DataMember]
		[JsonProperty("passportNumber")]
		public string passportNumber { get; set; }
		[DataMember]
		[JsonProperty("passportIssueDate")]
		public string passportIssueDate { get; set; }
		[DataMember]
		[JsonProperty("passportIssueAuthority")]
		public string passportIssueAuthority { get; set; }
		[DataMember]
		[JsonProperty("subscriptions")]
		public List<Subscription> subscriptions { get; set; }
	}
	[DataContract]
	public class Balance
	{
		[DataMember]
		[JsonProperty("balanceTypeId")]
		public string balanceTypeId { get; set; }
		[DataMember]
		[JsonProperty("balanceTypeName")]
		public string balanceTypeName { get; set; }
		[DataMember]
		[JsonProperty("balance")]
		public string balance { get; set; }
	}
	[DataContract]
	public class Subscription
	{
		[DataMember]
		[JsonProperty("subscriptionId")]
		public string subscriptionId { get; set; }
		[DataMember]
		[JsonProperty("listId")]
		public string listId { get; set; }
		[DataMember]
		[JsonProperty("dateCreated")]
		public string dateCreated { get; set; }
		[DataMember]
		[JsonProperty("sendEmail")]
		public string sendEmail { get; set; }
		[DataMember]
		[JsonProperty("sendSMS")]
		public string sendSMS { get; set; }
	}
	
	[DataContract]
	public class SubscriptionKM
	{
		[DataMember]
		[JsonProperty("subscriptionId")]
		public string subscriptionId { get; set; }
		[DataMember]
		[JsonProperty("listId")]
		public string listId { get; set; }
		[DataMember]
		[JsonProperty("dateCreated")]
		public string dateCreated { get; set; }
		[DataMember]
		[JsonProperty("sendEmail")]
		public string sendEmail { get; set; }
		[DataMember]
		[JsonProperty("sendSMS")]
		public string sendSMS { get; set; }
	}
	[DataContract]
	public class CardKM{
		[DataMember]
		[JsonProperty("cardNum")]
	    public string cardNum { get; set; }
	    [DataMember]
		[JsonProperty("state")]
	    public int state { get; set; }
	    [DataMember]
		[JsonProperty("cardStatus")]
	    public string cardStatus { get; set; }
	}
	[DataContract]
	public class BalanceKM{
		[DataMember]
		[JsonProperty("balanceTypeId")]
	    public string balanceTypeId { get; set; }
	    [DataMember]
		[JsonProperty("balanceTypeName")]
	    public string balanceTypeName { get; set; }
	    [DataMember]
		[JsonProperty("balance")]
	    public int balance { get; set; }
	}
	[DataContract]
	public class BuyerKM{
		[DataMember]
		[JsonProperty("email")]
		public string email { get; set; }
		[DataMember]
		[JsonProperty("lastName")]
	    public string lastName { get; set; }
	    [DataMember]
		[JsonProperty("firstName")]
	    public string firstName { get; set; }
	    [DataMember]
		[JsonProperty("middleName")]
	    public string middleName { get; set; }
	    [DataMember]
		[JsonProperty("sex")]
	    public string sex { get; set; }
	    [DataMember]
		[JsonProperty("birthDate")]
	    public string birthDate { get; set; }
	    [DataMember]
		[JsonProperty("registrationDate")]
	    public string registrationDate { get; set; }
	    [DataMember]
		[JsonProperty("lastAuthDate")]
	    public string lastAuthDate { get; set; }
	    [DataMember]
		[JsonProperty("addrZIP")]
	    public string addrZIP { get; set; }
	    [DataMember]
		[JsonProperty("addrRegion")]
	    public string addrRegion { get; set; }
	    [DataMember]
		[JsonProperty("addrCity")]
	    public string addrCity { get; set; }
	    [DataMember]
		[JsonProperty("addrStreet")]
	    public string addrStreet { get; set; }
	    [DataMember]
		[JsonProperty("addrBuilding")]
	    public string addrBuilding { get; set; }
	    [DataMember]
		[JsonProperty("addrHousing")]
	    public string addrHousing { get; set; }
	    [DataMember]
		[JsonProperty("addrFlat")]
	    public string addrFlat { get; set; }
	    [DataMember]
		[JsonProperty("cellphone")]
	    public string cellphone { get; set; }
	    [DataMember]
		[JsonProperty("sendSMS")]
	    public string sendSMS { get; set; }
	    [DataMember]
		[JsonProperty("sendEmail")]
	    public string sendEmail { get; set; }
	    [DataMember]
		[JsonProperty("preferredContact")]
	    public string preferredContact { get; set; }
	    [DataMember]
		[JsonProperty("keyword")]
	    public string keyword { get; set; }
	    [DataMember]
		[JsonProperty("cards")]
	    public string cards { get; set; }
	    [DataMember]
		[JsonProperty("buyerStatus")]
	    public object buyerStatus { get; set; }
	    [DataMember]
		[JsonProperty("phoneConfirmed")]
	    public string phoneConfirmed { get; set; }
	    [DataMember]
		[JsonProperty("emailConfirmed")]
	    public string emailConfirmed { get; set; }
	    [DataMember]
		[JsonProperty("spendAllowed")]
	    public string spendAllowed { get; set; }
	    [DataMember]
		[JsonProperty("passportSeries")]
	    public object passportSeries { get; set; }
	    [DataMember]
		[JsonProperty("passportNumber")]
	    public object passportNumber { get; set; }
	    [DataMember]
		[JsonProperty("passportIssueDate")]
	    public object passportIssueDate { get; set; }
	    [DataMember]
		[JsonProperty("passportIssueAuthority")]
	    public object passportIssueAuthority { get; set; }
	    [DataMember]
		[JsonProperty("oddMoneyBalance")]
	    public string oddMoneyBalance { get; set; }
	    [DataMember]
		[JsonProperty("oddMoneyFlags")]
	    public string oddMoneyFlags { get; set; }
	    [DataMember]
		[JsonProperty("fullRegistrationDate")]
	    public string fullRegistrationDate { get; set; }
	    [DataMember]
		[JsonProperty("bonusReceived")]
	    public string bonusReceived { get; set; }
	    [DataMember]
		[JsonProperty("correctName")]
	    public string correctName { get; set; }
	    [DataMember]
		[JsonProperty("printName")]
	    public string printName { get; set; }
	    [DataMember]
		[JsonProperty("_lastBirthDay")]
	    public object _lastBirthDay { get; set; }
	    [DataMember]
		[JsonProperty("title")]
	    public string title { get; set; }
	    [DataMember]
		[JsonProperty("group1")]
	    public string group1 { get; set; }
	    [DataMember]
		[JsonProperty("group2")]
	    public string group2 { get; set; }
	    [DataMember]
		[JsonProperty("group3")]
	    public string group3 { get; set; }
	    [DataMember]
		[JsonProperty("group4")]
	    public string group4 { get; set; }
	    [DataMember]
		[JsonProperty("subscriptions")]
	    public List<SubscriptionKM> subscriptions { get; set; }
	    [DataMember]
		[JsonProperty("offers")]
	    public List<object> offers { get; set; }
	}
	[DataContract]
	public class InfoResponse
	{
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
		[DataMember]
		[JsonProperty("buyer")]
		public Buyer buyer { get; set; }
		[DataMember]
		[JsonProperty("balances")]
		public List<Balance> balances { get; set; }
	}
	[DataContract]
	public class UpdateResponse
	{
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	[DataContract]
	public class Transaction
	{
		[DataMember]
		[JsonProperty("transactionId")]
		public string transactionId { get; set; }
		[DataMember]
		[JsonProperty("uid")]
		public string uid { get; set; }
		[DataMember]
		[JsonProperty("date")]
		public string date { get; set; }
		[DataMember]
		[JsonProperty("cardNum")]
		public string cardNum { get; set; }
		[DataMember]
		[JsonProperty("type")]
		public string type { get; set; }
		[DataMember]
		[JsonProperty("amount")]
		public string amount { get; set; }
		[DataMember]
		[JsonProperty("amountBonus")]
		public string amountBonus { get; set; }
		[DataMember]
		[JsonProperty("amountDiscount")]
		public string amountDiscount { get; set; }
		[DataMember]
		[JsonProperty("amountCharge")]
		public string amountCharge { get; set; }
		[DataMember]
		[JsonProperty("amountTotal")]
		public string amountTotal { get; set; }
		[DataMember]
		[JsonProperty("balance")]
		public string balance { get; set; }
		[DataMember]
		[JsonProperty("reference")]
		public string reference { get; set; }
		[DataMember]
		[JsonProperty("storeName")]
		public string storeName { get; set; }
		[DataMember]
		[JsonProperty("items")]
		public string items { get; set; }
	}
	[DataContract]
	public class TransactionItemResponse
	{
		[DataMember]
		[JsonProperty("transaction")]
		public TransactionForUpdateItem transaction { get; set; }
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
	}
	[DataContract]
	public class CardInfo
	{
		[DataMember]
		[JsonProperty("res")]
		public int res { get; set; }
		[DataMember]
		[JsonProperty("state")]
		public int state { get; set; }
		[DataMember]
		[JsonProperty("cardStatus")]
		public string cardStatus { get; set;}
		[DataMember]
		public string cardNum { get; set;}
	}
	[DataContract]
	public class TransactionForUpdateItem
	{
		[DataMember]
		[JsonProperty("items")]
		public List<Item> items { get; set; }
		[DataMember]
		[JsonProperty("bonuses")]
		public List<Bonus> bonuses { get; set; }
	}
	[DataContract]
	public class Item
	{
		[DataMember]
		[JsonProperty("transactionItemId")]
		public string transactionItemId { get; set; }
		[DataMember]
		[JsonProperty("transactionId")]
		public string transactionId { get; set; }
		[DataMember]
		[JsonProperty("pos")]
		public string pos { get; set; }
		[DataMember]
		[JsonProperty("SKU")]
		public string SKU { get; set; }
		[DataMember]
		[JsonProperty("qty")]
		public string qty { get; set; }
		[DataMember]
		[JsonProperty("price")]
		public string price { get; set; }
		[DataMember]
		[JsonProperty("discount")]
		public string discount { get; set; }
		[DataMember]
		[JsonProperty("bonus")]
		public string bonus { get; set; }
		[DataMember]
		[JsonProperty("marketingRuleId")]
		public string marketingRuleId { get; set; }
		[DataMember]
		[JsonProperty("charge")]
		public string charge { get; set; }
		[DataMember]
		[JsonProperty("productName")]
		public string productName { get; set; }
	}
	[DataContract]
	public class Bonus
	{
		[DataMember]
		[JsonProperty("bonusRemain")]
		public string bonusRemain { get; set; }
		[DataMember]
		[JsonProperty("burningDate")]
		public string burningDate { get; set; }
		[DataMember]
		[JsonProperty("activationDate")]
		public string activationDate { get; set; }
	}
}