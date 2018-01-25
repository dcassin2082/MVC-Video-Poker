using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VideoPoker.Enums
{
    public enum HandRanking
    {
        Nothing = 0, JacksOrBetter, TwoPair, Trips, Straight, BroadwayStraight, Flush, FullHouse,
        Quads, StraightFlush, RoyalFlush, WildRoyalFlush, FiveOfAKind, KingsOrBetter, FourDeuces
    }
}