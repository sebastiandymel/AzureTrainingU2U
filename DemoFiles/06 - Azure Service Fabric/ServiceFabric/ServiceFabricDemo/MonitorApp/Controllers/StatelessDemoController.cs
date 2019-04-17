using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using StatelessDemoService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MonitorApp.Controllers
{
    public class StatelessDemoController : Controller
    {
        public async Task<IActionResult> Index()
        {

            var serviceUrl = new Uri("fabric:/ServiceFabricDemo/StatelessDemoService");
            IStatelessDemoService proxy = ServiceProxy.Create<IStatelessDemoService>(
                serviceUrl);
            ViewBag.message = await proxy.GetMessageAsync();
            
            return View();
        }
    }
}
