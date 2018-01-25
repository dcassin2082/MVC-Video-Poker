using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;
using VideoPoker.Models;
using VideoPoker.Services;
using VideoPoker.ViewModels;

namespace VideoPoker.Controllers
{
    public class JacksOrBetterPayoutsController : Controller
    {
        private VideoPokerEntities dbContext = new VideoPokerEntities();
        private static List<Card> dealCards = new List<Card>();
        private static List<Card> _drawCards = new List<Card>();
        private static UserAccount userAccountInfo = new UserAccount();

        public ActionResult Index()
        {
            int userId = 1;
            userAccountInfo = dbContext.UserAccounts.Where(u => u.UserId == userId).FirstOrDefault();
            GameViewModel gameStatus = new GameViewModel
            {
                Message = "Good Luck",
                GameOver = false,
                Paytable = dbContext.JacksOrBetterPayouts.OrderByDescending(e => e.Id).ToList(),
                Credits = (int)userAccountInfo.Credits
            };
            return View(gameStatus);
        }

        public ActionResult Deal(int bet)
        {
            int userId = 1;
            userAccountInfo = dbContext.UserAccounts.Where(u => u.UserId == userId).FirstOrDefault();
            List<int> _shuffle = ShuffleDeck();
            dealCards = new List<Card>();

            foreach (var item in _shuffle)
            {
                var card = dbContext.Cards.Where(c => c.CardId == item).FirstOrDefault();
                dealCards.Add(card);
            }
            foreach (var item in dealCards)
            {
                item.ImageName = item.ImageName.Insert(0, "/Images/");
            }
            GameViewModel gameStatus = new GameViewModel
            {
                Message = "Hold / Draw 1 to 5 Cards",
                Hand = dealCards.Take(5).ToList(),
                GameOver = false,
                BetAmount = bet
            };
            gameStatus.Paytable = dbContext.JacksOrBetterPayouts.ToList();
            gameStatus.Credits = (int)userAccountInfo.Credits - gameStatus.BetAmount;
            HandInfo.EvaluateHand(gameStatus, dealCards, userAccountInfo);
            return Json(gameStatus, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Draw(int[] arr, int betAmt)
        {
            _drawCards = new List<Card>();
            for (int i = 0; i < arr.Length; i++)
            {
                if (arr[i] == 0)
                {
                    _drawCards.Add(dealCards[i + 5]);
                }
                else
                {
                    _drawCards.Add(dealCards[i]);
                }
            }
            GameViewModel gameStatus = new GameViewModel
            {
                Message = "Game Over",
                Hand = _drawCards,
                GameOver = true,
                Credits = (int)userAccountInfo.Credits,
                BetAmount = betAmt,
                Paytable = dbContext.JacksOrBetterPayouts.ToList()

            };
            HandInfo.EvaluateHand(gameStatus, _drawCards, userAccountInfo);
            return Json(gameStatus, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ChangeBetAmount(int betAmt)
        {
            GameViewModel gameStatus = new GameViewModel
            {
                BetAmount = betAmt
            };
            if (betAmt < 5)
                gameStatus.BetAmount++;
            else
                gameStatus.BetAmount = 1;
            return Json(gameStatus, JsonRequestBehavior.AllowGet);
        }

        public List<int> ShuffleDeck()
        {
            List<int> cards = new List<int>();
            int count = 0;
            Random r = new Random();
            cards.Clear();
            do
            {
                int card = r.Next(1, 53);
                if (!cards.Contains(card))
                {
                    cards.Add(card);
                    count++;
                }

            } while (count < 52);
            return cards.Take(10).ToList();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}