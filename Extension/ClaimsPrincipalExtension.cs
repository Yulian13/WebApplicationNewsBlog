using System;
using WebApplicationNewsBlog.Models.BDModels;

namespace System.Security.Claims
{
	public static class ClaimsPrincipalExtension
	{
		public static bool IsInRole(this ClaimsPrincipal claimsPrincipal, Roles role)
		{
			return claimsPrincipal.IsInRole(Enum.GetName(typeof(Roles), role));
		}
	}
}
