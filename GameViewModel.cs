using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VideoPoker.Models;

namespace VideoPoker.ViewModels
{
    public class GameViewModel
    {
        public List<Card> Hand { get; set; }
        public List<JacksOrBetterPayout> Paytable { get; set; }
        public string Message { get; set; }
        public bool GameOver { get; set; }
        public int Credits { get; set; }
        public int BetAmount { get; set; }
        public int WinAmount { get; set; }

        [Display(Name = "")]
        public string HandName { get; set; }

        [Display(Name = "Bet 1 Pays")]
        public Nullable<int> Bet1Pays { get; set; }

        [Display(Name = "Bet 2 Pays")]
        public Nullable<int> Bet2Pays { get; set; }

        [Display(Name = "Bet 3 Pays")]
        public Nullable<int> Bet3Pays { get; set; }

        [Display(Name = "Bet 4 Pays")]
        public Nullable<int> Bet4Pays { get; set; }

        [Display(Name = "Bet 5 Pays")]
        public Nullable<int> Bet5Pays { get; set; }

        public string PaytableDisplay { get; set; }

    }
}