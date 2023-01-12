namespace Terrasoft.Configuration.ViberSms
{
	using System.Runtime.Serialization;
	using Newtonsoft.Json;
	
	[DataContract]
	public class Response
	{
		[DataMember]
        [JsonProperty("message_id")]
		public string message_id {get;set;}
		[DataMember]
        [JsonProperty("error_code")]
		public long? error_code {get;set;}
		[DataMember]
        [JsonProperty("error_text")]
		public string error_text {get;set;}
	}
}