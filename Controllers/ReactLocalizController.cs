using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Collections.Generic;
using System.Linq;

namespace WebApplicationNewsBlog.Controllers
{
	[ApiController]
	[Route("api/[controller]/[action]")]
	public class ReactLocalizController : Controller
	{
		private readonly IStringLocalizer<ReactLocalizController> Localizer;

		public ReactLocalizController(IStringLocalizer<ReactLocalizController> localizer)
		{
			Localizer = localizer;
		}

		[HttpPost]
		public Dictionary<string, string> GetLocalizs()
			=> new Dictionary<string, string>(
				Localizer
				.GetAllStrings()
				.Select(loc =>
					new KeyValuePair<string, string>(loc.Name, loc.Value)
				)
			);
	}
}
