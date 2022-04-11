using System;

namespace WebApplicationNewsBlog.Models.BDModels
{
	public class User
	{
		public Guid Id { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public Roles Role { get; set; }
	}

	public enum Roles
	{
		Admin,
		User,
	}
}
