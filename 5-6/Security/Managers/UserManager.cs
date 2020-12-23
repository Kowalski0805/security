using Konscious.Security.Cryptography;
using Microsoft.Extensions.Configuration;
using Security.Helpers;
using Security.Models.DBModels;
using Security.Models.DBModels.DTOs;
using Security.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Security.Managers
{
    public class UserManager
    {
        private UserRepository UserRepository { get; set; }
        private IConfiguration Configuration { get; set; }
        public UserManager(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }
        private bool IsSqlInjection(string str)
        {
            string pattern = @"/[;\(\)<>\'*]|--|\/\/|select|insert|update|union/ix";
            return Regex.IsMatch(str, pattern, RegexOptions.IgnoreCase);
        }

        public int? RegisterUser(AddGetUserDTO addGetUserDTO)
        {
            bool IsBreaking = IsSqlInjection(addGetUserDTO.Login) || IsSqlInjection(addGetUserDTO.Password) || IsSqlInjection(addGetUserDTO.Email);
            this.UserRepository = new UserRepository(IsBreaking);

            User user = (User)addGetUserDTO;
            user.NotSalt = CreateSalt();
            //user.NotSalt = Guid.NewGuid().ToString();
            //user.Password = GetPasswordHash(addGetUserDTO.Password + user.NotSalt);
            user.Password = HashPassword(addGetUserDTO.Password, user.NotSalt);
            user.Email = GetPersonalDataHash(addGetUserDTO.Email);

            return UserRepository?.Create(user);
        }

        private byte[] CreateSalt()
        {
            var buffer = new byte[16];
            var rng = new RNGCryptoServiceProvider();
            rng.GetBytes(buffer);
            return buffer;
        }

        private byte[] HashPassword(string password, byte[] salt)
        {
            var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password));

            argon2.Salt = salt;
            argon2.DegreeOfParallelism = 8; // four cores
            argon2.Iterations = 4;
            argon2.MemorySize = 1024 * 1024; // 1 GB

            return argon2.GetBytes(16);
        }

        private bool VerifyHash(string password, byte[] salt, byte[] hash)
        {
            var newHash = HashPassword(password, salt);
            return hash.SequenceEqual(newHash);
        }

        private byte[] GetPasswordHash(string passwordToHash)
        {
            byte[] key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SecurityLabKey"));
            byte[] IV = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SecurityLabIV"));

            using (Aes myAes = Aes.Create())
            {
                return AesHelper.EncryptStringToBytes_Aes(passwordToHash, key, IV);
            }
        }

        private byte[] GetPersonalDataHash(string dataToHash)
        {
            byte[] key = Encoding.UTF8.GetBytes(Configuration["MyKey"]);
            byte[] IV = Encoding.UTF8.GetBytes(Configuration["MyIV"]);

            using (Aes myAes = Aes.Create())
            {
                return AesHelper.EncryptStringToBytes_Aes(dataToHash, key, IV);
            }
        }

        private string GetPersonalDataFromHash(byte[] hash)
        {
            byte[] key = Encoding.UTF8.GetBytes(Configuration["MyKey"]);
            byte[] IV = Encoding.UTF8.GetBytes(Configuration["MyIV"]);

            using (Aes myAes = Aes.Create())
            {
                return AesHelper.DecryptStringFromBytes_Aes(hash, key, IV);
            }
        }

        public User LoginUser(AddGetUserDTO addGetUserDTO)
        {
            bool IsBreaking = IsSqlInjection(addGetUserDTO.Login) || IsSqlInjection(addGetUserDTO.Password);
            this.UserRepository = new UserRepository(IsBreaking);

            User user = UserRepository?.Get(addGetUserDTO.Login);

            if (user == null)
                return null;

            //byte[] inputedPasshordHash = GetPasswordHash(addGetUserDTO.Password + user.NotSalt);
            //byte[] inputedPasshordHash = 

            //if (inputedPasshordHash.SequenceEqual(user.Password))
            if(VerifyHash(addGetUserDTO.Password, user.NotSalt, user.Password))
            {
                user.EmailStr = GetPersonalDataFromHash(user.Email);
                return user;
            }
            else
            {
                return null;
            }
        }
    }
}
