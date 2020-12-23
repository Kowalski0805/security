using Microsoft.EntityFrameworkCore;
using Security.Models.DBModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Database
{
    public class ApplicationContext : DbContext, IDbContext
    {
        public DbSet<User> Users { get; set; }
        public ApplicationContext()
        {
            //Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=SecurityDataBase.mssql.somee.com;user id=fominvlad_SQLLogin_1;pwd=sd3gttt92c;Database=SecurityDataBase;Trusted_Connection=False;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);

            modelBuilder.Entity<User>().HasData(
                new User[]
                {
                new User { Id=1, Login = "Tom" + "\r\n", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() },
                new User { Id=2, Login = "Alice" + "\r\n", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() },
                new User { Id=3, Login = "Sam" + "\r\n", Password = Guid.NewGuid().ToByteArray(), NotSalt = Guid.NewGuid().ToByteArray(), Email = Guid.NewGuid().ToByteArray() }
                });
        }
    }
}
