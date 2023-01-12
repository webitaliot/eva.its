namespace Terrasoft.Configuration.UsrUserInRole
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
    using System.Globalization;
    using System.Net.Security;
    using System.Security.Cryptography.X509Certificates;
    using System.IO;
    using System.Net;
	using Terrasoft.Web.Http.Abstractions;
    using Terrasoft.Common;
    using Terrasoft.Core;
    using Terrasoft.Core.DB;
    using Terrasoft.Core.Entities;
	using Terrasoft.Web.Common;
    using Newtonsoft;
    using Newtonsoft.Json;

    using System.ComponentModel;

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrUserInRole : BaseService
    {
    	[OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        ResponseFormat = WebMessageFormat.Json)]
		public UserRoles GetRelAU(InputString data)
		{
	        var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager, "SysUserInRole");
	        
	        esq.AddColumn("SysRole");
	        var AuName = esq.AddColumn("SysRole.Name").Name;
	        var ParentName = esq.AddColumn("SysRole.ParentRole.Name").Name;
	        var AuTypeName = esq.AddColumn("SysRole.[SysAdminUnitType:Value:SysAdminUnitTypeValue].Name").Name;
	        
	        esq.SetLocalizationCultureId(new Guid("1A778E3F-0A8E-E111-84A3-00155D054C03"));
	        
	        var filter = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "SysUser",data.UserId);
	        esq.Filters.Add(filter);
	        //throw new Exception(esq.GetSelectQuery(UserConnection).GetSqlText());
	        var Collection = esq.GetEntityCollection(UserConnection);
	        var userRoles = new UserRoles();
	        var res = "";
	        res += "Collection count = " + Collection.Count();
	        foreach(var item in Collection){
	        	var userRole = new Role() {
	        		name = item.GetTypedColumnValue<string>(AuName),
					id = item.GetTypedColumnValue<Guid>("SysRoleId"),
					parentAU = item.GetTypedColumnValue<string>(ParentName)
	        	};
	        	var AuType = item.GetTypedColumnValue<string>(AuTypeName);
	        	res += "AuType = " + AuType + $"   AuName: {userRole.name}    id = {userRole.id}   parentAU = {userRole.parentAU}  \n";
	        	if (AuType == "Division") {
                        userRoles.OrgUnits.Add(userRole);
                } else if (AuType == "Функциональная роль") {
                        userRoles.FuncRoles.Add(userRole);
                } else if (AuType == "Organization") {
                        userRoles.Organizations.Add(userRole);
                } else if (AuType ==  "Manager") {
                        userRoles.Managers.Add(userRole);
                } else if (AuType  ==  "Team") {
                        userRoles.Teams.Add(userRole);
                }
	        }
	        return userRoles;
		}
		
		[OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Bare,
        ResponseFormat = WebMessageFormat.Json)]
		public bool CheckUserInAU(InputString data){
			var userRoles = GetRelAU(data);
			var AUName = data.AUName;
			if(userRoles.FuncRoles.Any(x=> x.name == AUName) || userRoles.OrgUnits.Any(x=> x.name == AUName) 
			|| userRoles.Organizations.Any(x=> x.name == AUName) || userRoles.Managers.Any(x=> x.name == AUName) 
			|| userRoles.Teams.Any(x=> x.name == AUName)){
				return true;
			}
			else return false;
		}
		
		public class UserRoles
		{
			public List<Role> FuncRoles {get;set;} = new List<Role>();
			public List<Role> OrgUnits {get;set;} = new List<Role>();
			public List<Role> Organizations {get;set;} = new List<Role>();
			public List<Role> Managers {get;set;} = new List<Role>();
			public List<Role> Teams {get;set;} = new List<Role>();
		}
		
		public class Role
		{
			public string name {get;set;}
			public Guid id {get;set;}
			public string parentAU {get;set;}
		}
		public class InputString{
			public string AUName  {get;set;}
			public string UserId {get;set;}
		}
    }
}