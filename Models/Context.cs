using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using WebApplicationNewsBlog.Models.BDModels;
using WebApplicationNewsBlog.Models.ViewModels;

namespace WebApplicationNewsBlog.Models
{
	public class Context : DbContext
	{
		private DbSet<User> Users { get; set; }
		public DbSet<News> News { get; set; }

		public Context(DbContextOptions<Context> options, IConfiguration configuration)
			: base(options)
		{
			Database.EnsureCreated();

			InsertAdminUsers(configuration);
		}

		public User GetUserByLogin(LoginModel login)
			=> Users.FirstOrDefault(user => user.Email == login.Email && user.Password == GetHashString(login.Password));

		public News InsertNewsByModel(NewsModel newsModel)
		{
			News news = new()
			{
				SubTitle = newsModel.SubTitle,
				Text = newsModel.Text,
				Title = newsModel.Title,
				Image = GetImageData(newsModel.Image),
				CreatedOn = DateTime.Now,
			};

			News.Add(news);
			return news;
		}

		public News UpdateNewsByModel(NewsModel newsModel)
		{
			News news = News.Find(newsModel.Id);
			news.SubTitle = newsModel.SubTitle;
			news.Text = newsModel.Text;
			news.Title = newsModel.Title;

			if (newsModel.IsChangeImage)
			{
				news.Image = GetImageData(newsModel.Image);
			}

			return news;
		}

		private void InsertAdminUsers(IConfiguration configuration)
		{
			List<IConfigurationSection> notInitAdminUsers = configuration
				.GetSection("AdminUsers")
				.GetChildren()
				.Where(adminUser =>
					Users.Any(user => user.Email == adminUser["0"]) == false
				).ToList();
			notInitAdminUsers.ForEach(user =>
				Users.Add(new User() { Email = user["0"], Password = GetHashString(user["1"]), Role = Roles.Admin })
			);

			if (notInitAdminUsers.Count() > 0)
				SaveChanges();
		}

		private string GetHashString(string inputString)
		{
			StringBuilder sb = new StringBuilder();
			byte[] hash;
			using (HashAlgorithm algorithm = SHA256.Create())
				hash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));

			foreach (byte b in hash)
				sb.Append(b.ToString("X2"));

			return sb.ToString();
		}

		private byte[] GetImageData(IFormFile image)
		{
			byte[] imageData = new byte[0];
			if (image != null)
			{
				using (var binaryReader = new BinaryReader(image.OpenReadStream()))
				{
					imageData = binaryReader.ReadBytes((int)image.Length);
				}
			}

			return imageData;
		}

	}
}
