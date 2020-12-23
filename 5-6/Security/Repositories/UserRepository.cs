using Security.Database;
using Security.Models.DBModels;
using Security.Models.DBModels.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Repositories
{
    public class UserRepository
    {
        private IDbContext dbContext { get; set; }
        public UserRepository(bool IsBreaked = false)
        {
            if (IsBreaked)
                dbContext = new BreakingApplicationContext();
            else
                dbContext = new ApplicationContext();
        }

        public int Create(User user)
        {
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return user.Id;
        }

        public User Get(string login)
        {
            return dbContext.Users.Where(u => u.Login == login).FirstOrDefault();
        }
    }
}
