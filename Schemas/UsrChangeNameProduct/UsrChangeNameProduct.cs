namespace Terrasoft.Configuration
{
    using System;
    using System.Text;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Data;
	using System.Data.SqlClient;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities; 

    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrChangeNameService : Terrasoft.Web.Common.BaseService
    {
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public string ChangeProductName() 
        {
            var sel2 = (new Select(UserConnection)
            	.Column("Name")
            	.Column("Code")
            	.From("Product")
            	.Where("Product", "CreatedOn").ConsistsWith(Column.Const("2018-07-16%"))
            	.And("Product", "ModifiedOn").ConsistsWith(Column.Const("2018-07-16%"))) as Select;
            
            List<MyProduct> badNames = new List<MyProduct>();	
            using (var dbExecutor = UserConnection.EnsureDBConnection()) 
            {
        		using (var reader = sel2.ExecuteReader(dbExecutor)) 
        		{
                	while(reader.Read()) 
                	{
                        int columnOrdinalName = reader.GetOrdinal("Name");
                        int columnOrdinalCode = reader.GetOrdinal("Code");
                        badNames.Add(new MyProduct
                        {
                        	Name_ = reader.GetString(columnOrdinalName),
              				Code_ = reader.GetString(columnOrdinalCode),
                        });
                	}
        		}
            }
            
            var enc1251 = Encoding.GetEncoding(1251);
            var enc8859 = Encoding.GetEncoding("iso-8859-1");
            byte[] bytes;
            for (int i = 0; i < badNames.Count; i++)
            {
                bytes = enc8859.GetBytes(badNames[i].Name_);
                badNames[i].Name_ = enc1251.GetString(bytes);
            }
            
            for(int i=0; i < badNames.Count; i++)
            {
            	var update = new Update(UserConnection, "Product")
        			.Set("Name", Column.Parameter(badNames[i].Name_))
        			.Where ("Code").IsEqual(Column.Parameter(badNames[i].Code_));
    			update.Execute();
            }
            
            return $"{badNames.Count} rows affected";
        }
    }
    
    public class MyProduct
    {
    	public string Name_ {get; set;}
    	public string Code_ {get; set;}
    }
}