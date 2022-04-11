using Microsoft.AspNetCore.Mvc;
using System;
using WebApplicationNewsBlog.Models;
using WebApplicationNewsBlog.Models.BDModels;

namespace WebApplicationNewsBlog.Controllers
{
	public class HomeController : Controller
	{
		private Context DbContext;

		public HomeController(Context db)
		{
			DbContext = db;
		}

		public IActionResult Index()
		{
			return View();
		}

		public IActionResult News(Guid id)
		{
			News news = DbContext.News.Find(id);
			return (news != null) ? View(news) : NotFound();
		}

		public IActionResult NewsList()
		{
			return View();
		}
	}
}
