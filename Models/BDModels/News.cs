using System;

namespace WebApplicationNewsBlog.Models.BDModels
{
	public class News
	{
		public Guid Id { get; set; }
		public DateTime CreatedOn { get; set; }
		public string Title { get; set; }
		public string SubTitle { get; set; }
		public string Text { get; set; }
		public byte[] Image { get; set; }
	}
}
