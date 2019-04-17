using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using StatefulDemoService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Client;

namespace MonitorApp.Controllers
{
    public class StatefullDemoController:Controller
    {
        public async Task<IActionResult> Index()
        {
            var serviceUrl = new Uri("fabric:/ServiceFabricDemo/StatefulDemoService");
            IStatefullDemoService proxy = ServiceProxy.Create<IStatefullDemoService>(
                serviceUrl,new ServicePartitionKey(1));

            try
            {
                var next = await proxy.NextFibonaciNumber();
                ViewBag.message = next;
            }
            catch (Exception ex)
            {

                throw;
            }
            return View();
        }
    }
}
