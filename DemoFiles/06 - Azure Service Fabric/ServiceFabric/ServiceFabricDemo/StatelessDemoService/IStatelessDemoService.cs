using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StatelessDemoService
{
    public interface IStatelessDemoService : IService
    {
        Task<string> GetMessageAsync();
    }
}
