using Microsoft.EntityFrameworkCore;
using Security.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Database
{
    public class BreakingApplicationContext : DbContext, IDbContext
    {
        public DbSet<User> Users { get; set; }
        public BreakingApplicationContext()
        {
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=BreakingSecurityDataBase.mssql.somee.com;user id = uptioncompany_SQLLogin_1; pwd=4eptsnccsq;Database=BreakingSecurityDataBase;Trusted_Connection=False;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            modelBuilder.Entity<User>().HasData(
                new User[]
                {
                new User { Id=1, Login = "Tom", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() },
                new User { Id=2, Login = "Alice", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() },
                new User { Id=3, Login = "Sam", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() }
                });
        }
    }
}
