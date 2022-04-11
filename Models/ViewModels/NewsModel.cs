using Microsoft.AspNetCore.Http;
using System;

namespace WebApplicationNewsBlog.Models.BDModels
{
	public class NewsModel
	{
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string SubTitle { get; set; }
		public string Text { get; set; }
		public IFormFile Image { get; set; }
		public bool IsChangeImage { get; set; }
	}
}
