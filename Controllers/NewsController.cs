using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebApplicationNewsBlog.Models;
using WebApplicationNewsBlog.Models.BDModels;

namespace WebApplicationNewsBlog.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class NewsController : Controller
	{
		private Context DbContext;

		public NewsController(Context context)
		{
			DbContext = context;
		}

		[HttpPost]
		public News GetNews(News news) => DbContext.News.Find(news.Id);

		public IEnumerable<News> GetNewsCollectionForList(int step, int skipStep)
			=> DbContext.News
			.OrderByDescending(news => news.CreatedOn)
			.Skip(skipStep * step)
			.Take(step)
			.Select(
				news => new News()
				{
					Title = news.Title,
					SubTitle = news.SubTitle,
					Id = news.Id,
					CreatedOn = news.CreatedOn
				}
			);
	}
}
