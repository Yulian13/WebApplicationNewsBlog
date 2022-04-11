using Microsoft.AspNetCore.Mvc;
using System;
using WebApplicationNewsBlog.Attributes;
using WebApplicationNewsBlog.Models;
using WebApplicationNewsBlog.Models.BDModels;

namespace WebApplicationNewsBlog.Controllers
{
	[AuthorizeEnumsAttribute(Roles.Admin)]
	public class AdminController : Controller
	{
		private Context DbContext;

		public AdminController(Context db)
		{
			DbContext = db;
		}

		public IActionResult NewsForm(Guid id)
		{
			ViewData["NewsId"] = id;
			ViewData["Title"] = (id != Guid.Empty) ? DbContext.News.Find(id).Title : "";
			return View();
		}

		[HttpPost]
		public IActionResult SaveNews(NewsModel newsModel)
		{
			News news;

			news = (newsModel.Id == Guid.Empty) ? 
				DbContext.InsertNewsByModel(newsModel)
				: 
				DbContext.UpdateNewsByModel(newsModel);

			DbContext.SaveChanges();
			return RedirectToAction("News", "Home", new { id = news.Id });
		}

		[HttpPost]
		public IActionResult DeleteNews(News news)
		{
			DbContext.News.Remove(
				DbContext.News.Find(news.Id)
			);
			DbContext.SaveChanges();
			return RedirectToAction("NewsList", "Home");
		}
	}
}
