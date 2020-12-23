using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Queue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Helpers
{
    public class AzureQueueSender : IMessageSender
    {
        public IConfiguration Configuration { get; set; }
        public AzureQueueSender(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public async Task SendMessage(string context)
        {
            var connectionString = Configuration.GetValue<string>("QueueConnectionString");
            await Send(connectionString);
        }

        private static async Task Send(string connectionString)
        {
            var storageAccount = CloudStorageAccount.Parse(connectionString);

            storageAccount.CreateCloudQueueClient();
            var queueClient = storageAccount.CreateCloudQueueClient();

            var queue = queueClient.GetQueueReference("youtube");

            var message = new CloudQueueMessage("Hello world!");
            await queue.AddMessageAsync(message);
        }
    }
}
