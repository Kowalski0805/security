using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Models.DBModels
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public byte[] Password { get; set; }
        public byte[] Email { get; set; }
        [NotMapped]
        public string EmailStr { get; set; }
        //public string NotSalt { get; set; }
        public byte[] NotSalt { get; set; }
    }
}
