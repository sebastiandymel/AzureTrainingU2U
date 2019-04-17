using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreApp.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace CoreApp.Controllers
{
  public class HomeController : Controller
  {
    private string basePath;

    public HomeController(IHostingEnvironment env)
    {
      //basePath = Path.Combine(env.ContentRootPath, "App_Data"); 
      basePath = "C:/Data";
    }

    public IActionResult Index()
    {
      var vm = Directory.GetFiles(basePath);
      return View(vm);
    }

    [HttpPost]
    public async Task<ActionResult> Index(IFormFile file)
    {
      var filePath = Path.Combine(basePath, file.FileName);

      using (var stream = new FileStream(filePath, FileMode.Create))
      {
        await file.CopyToAsync(stream);
      }

      return RedirectToAction(nameof(Index));
    }
  }
}


public class TrackRemovedIntegrationEvent
{
  public TrackRemovedIntegrationEvent(string trackId, string reason)
  {
    TrackId = trackId;
    Reason = reason;
  }

  public string TrackId { get; }
  public string Reason { get;  }
}

