using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoPoker.Services
{
    public class GameAction
    {
        public static List<int> ShuffleDeck()
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
    }
}