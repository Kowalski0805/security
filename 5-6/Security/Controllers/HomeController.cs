using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Security.Managers;
using Security.Models;
using Security.Models.DBModels;
using Security.Models.DBModels.DTOs;

namespace Security.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private UserManager UserManager { get; set; }
        private IConfiguration Configuration { get; set; }
        public HomeController(ILogger<HomeController> logger, UserManager userManager, IConfiguration configuration)
        {
            _logger = logger;
            this.UserManager = userManager;
            this.Configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult Register(string login, string password, string email)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(email))
                return BadRequest();

            AddGetUserDTO userDTO = new AddGetUserDTO() { Login = login, Password = password, Email = email };
            int? newUserId = UserManager.RegisterUser(userDTO);

            if (newUserId != null)
                return Ok("New user id: " + newUserId);
            else
                return BadRequest();
        }

        [HttpPost]
        public IActionResult Login(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return BadRequest();

            AddGetUserDTO userDTO = new AddGetUserDTO() { Login = login, Password = password };
            User loginedUser = UserManager.LoginUser(userDTO);

            if (loginedUser != null)
                return Ok("Logined user id: " + loginedUser.Id + " | email: " + loginedUser.EmailStr);
            else
                return BadRequest();
        }
    }
}
