using System;

namespace Terrasoft.Common
{
	public static class UsrConstantsServer
	{
		public static class AddressType
		{
			public static readonly Guid Shipping = new Guid("760BF68C-4B6E-DF11-B988-001D60E938C6");
		}
		public static class FileType
		{
			public static readonly Guid File = new Guid("529BC2F8-0EE0-DF11-971B-001D60E938C6");
		}
		public static class DeliveryType 
		{
			public static readonly Guid AddressDelivery = new Guid("50DF77D0-7B1F-4DBC-A02D-7B6EBB95DFD0");
			public static readonly Guid StockCarrier = new Guid("AB31305F-7C6D-4158-BD0A-760AC7897755");
		}
	}
}
