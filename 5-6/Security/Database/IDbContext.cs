using Microsoft.EntityFrameworkCore;
using Security.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Database
{
    public interface IDbContext
    {
        public DbSet<User> Users { get; set; }
        public int SaveChanges();
    }
}
