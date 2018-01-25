using System.Web.Mvc;

namespace VideoPoker.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return RedirectToAction("Index", "JacksOrBetterPayouts");
        }
    }
}