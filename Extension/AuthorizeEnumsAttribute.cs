using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApplicationNewsBlog.Models.BDModels;

namespace WebApplicationNewsBlog.Attributes
{
	public class AuthorizeEnumsAttribute : AuthorizeAttribute
	{
		public AuthorizeEnumsAttribute(params Roles[] allowedRoles)
		{
			IEnumerable<string> allowedRolesAsStrings = allowedRoles.Select(role => Enum.GetName(typeof(Roles), role));
			Roles = String.Join(",", allowedRolesAsStrings);
		}
	}
}
