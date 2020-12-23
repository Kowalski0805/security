using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Security.Helpers
{
    public interface IMessageSender
    {
        Task SendMessage(string context);
    }
}
