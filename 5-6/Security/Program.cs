using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Security
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((context, config) =>
    {
        var root = config.Build();
        var vault = root["KeyVault:Vault"];
        if (!string.IsNullOrEmpty(vault))
        {
            config.AddAzureKeyVault(
            $"https://{root["KeyVault:Vault"]}.vault.azure.net/",
            root["KeyVault:ClientId"],
            root["KeyVault:ClientSecret"]);
        }

    })
    .UseStartup<Startup>();
    }
}
