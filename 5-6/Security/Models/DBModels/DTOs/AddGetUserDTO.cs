using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Models.DBModels.DTOs
{
    public class AddGetUserDTO
    {
        private string login;
        public string Login { 
            get {
                return login;
            }
            set {
                login = value != null ? value.Replace("\n\r", "") : null;
            } 
        }
        public string Password { get; set; }
        public string Email { get; set; }

        public static explicit operator User (AddGetUserDTO addGetUserDTO)
        {
            return new User()
            {
                Login = addGetUserDTO.Login
            };
        }

        public static explicit operator AddGetUserDTO(User user)
        {
            return new AddGetUserDTO()
            {
                Login = user.Login
            };
        }
    }
}
