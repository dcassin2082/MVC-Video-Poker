$(function () {
    $('#btnChangeBet').click(function () {
        var betAmt = $('#btnChangeBet').attr('value').match(/\d+/);
        $.ajax({
            type: 'GET',
            datatype: 'json',
            contentType: 'application/json',
            url:'/JacksOrBetterPayouts/ChangeBetAmount',
            data: {
                betAmt: betAmt
            },
            traditional: true,
            success: function (result) {
                $('#btnChangeBet').prop('value', 'Bet ' + result.BetAmount);
            }
        });
    });
});
$(function () {
    // handles Deal button click ........
    $('#btnDealDraw').click(function () {
        for (i = 0; i < 6; i++) {
            if (i == 0) {
                $('#tdRoyalFlush' + i).css('color', 'red');
                $('#tdStraightFlush' + i).css('color', 'red');
                $('#tdQuads' + i).css('color', 'red');
                $('#tdFullHouse' + i).css('color', 'red');
                $('#tdFlush' + i).css('color', 'red');
                $('#tdStraight' + i).css('color', 'red');
                $('#tdTrips' + i).css('color', 'red');
                $('#tdTwoPair' + i).css('color', 'red');
                $('#tdJacksOrBetter' + i).css('color', 'red');
            }
            else {
                $('#tdRoyalFlush' + i).css('color', 'white');
                $('#tdStraightFlush' + i).css('color', 'white');
                $('#tdQuads' + i).css('color', 'white');
                $('#tdFullHouse' + i).css('color', 'white');
                $('#tdFlush' + i).css('color', 'white');
                $('#tdStraight' + i).css('color', 'white');
                $('#tdTrips' + i).css('color', 'white');
                $('#tdTwoPair' + i).css('color', 'white');
                $('#tdJacksOrBetter' + i).css('color', 'white');
                $('#thBet' + i).css('color', 'white');
            }
        }
        $("img").toggleClass("img-clickable");
        $("img").on('dragstart', function () { return false; })
        $("#divGameResult").toggleClass("game-start");
        $("#btnDealDraw").toggleClass("btn-deal");
        if (document.getElementById('btnDealDraw').value == 'Deal') {
            var snd = new Audio("../Sounds/tada.wav")
            $('#btnChangeBet').prop('disabled', true);
            betAmt = $('#btnChangeBet').attr('value').match(/\d+/);
            $.ajax({
                type: 'GET',
                datatype: 'json',
                contentType: 'application/json',
                url: '/JacksOrBetterPayouts/Deal',
                data: {
                    bet: betAmt
                },
                traditional: true,
                success: function (result) {
                    for (i = 0; i < result.Hand.length; i++) {
                        var card = '#card' + i;
                        $(card).attr("src", result.Hand[i].ImageName);
                    }
                    $('#btnDealDraw').prop('value', 'Draw');
                    $('#divGameResult').text(result.Message);
                    $('#divCredits').text(result.Credits);
                    clearDivs();
                    switch (result.Message) {
                        case 'JACKS OR BETTER':
                            $('#tdJacksOrBetter0').css('color', 'yellow');
                            $('#tdJacksOrBetter' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case '2 PAIR':
                            $('#tdTwoPair0').css('color', 'yellow');
                            $('#tdTwoPair' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case '3 OF A KIND':
                            $('#tdTrips0').css('color', 'yellow');
                            $('#tdTrips' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case 'STRAIGHT':
                            $('#tdStraight0').css('color', 'yellow');
                            $('#tdStraight' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case 'FLUSH':
                            $('#tdFlush0').css('color', 'yellow');
                            $('#tdFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case 'FULL HOUSE':
                            $('#tdFullHouse0').css('color', 'yellow');
                            $('#tdFullHouse' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case '4 OF A KIND':
                            $('#tdQuads0').css('color', 'yellow');
                            $('#tdQuads' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case 'STRAIGHT FLUSH':
                            $('#tdStraightFlush0').css('color', 'yellow');
                            $('#tdStrightFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                        case 'ROYAL FLUSH':
                            $('#tdRoyalFlush0').css('color', 'yellow');
                            $('#tdRoyalFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            snd.play();
                            break;
                    }
                }
            });
        }
        else {
            // handles Draw button click ........
            $('#btnChangeBet').prop('disabled', false);
            var betAmt = $('#btnChangeBet').attr('value').match(/\d+/);
            $.ajax({
                type: 'GET',
                datatype: 'json',
                contentType: 'application/json',
                url: '/JacksOrBetterPayouts/Draw',
                data: {
                    arr: arr,
                    betAmt: betAmt
                },
                traditional: true,
                success: function (result) {
                    for (i = 0; i < result.Hand.length; i++) {
                        var card = '#card' + i;
                        $(card).attr("src", result.Hand[i].ImageName);
                    }
                    $('#btnDealDraw').prop('value', 'Deal');
                    $('#divGameResult').text(result.Message);
                    $('#divCredits').text(result.Credits);
                    switch (result.Message) {
                        case 'WINNER - JACKS OR BETTER':
                            $('#tdJacksOrBetter0').css('color', 'yellow');
                            $('#tdJacksOrBetter' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - 2 PAIR':
                            $('#tdTwoPair0').css('color', 'yellow');
                            $('#tdTwoPair' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - 3 OF A KIND':
                            $('#tdTrips0').css('color', 'yellow');
                            $('#tdTrips' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - STRAIGHT':
                            $('#tdStraight0').css('color', 'yellow');
                            $('#tdStraight' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - FLUSH':
                            $('#tdFlush0').css('color', 'yellow');
                            $('#tdFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - FULL HOUSE':
                            $('#tdFullHouse0').css('color', 'yellow');
                            $('#tdFullHouse' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - 4 OF A KIND':
                            $('#tdQuads0').css('color', 'yellow');
                            $('#tdQuads' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - STRAIGHT FLUSH':
                            $('#tdStraightFlush0').css('color', 'yellow');
                            $('#tdStrightFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                        case 'WINNER - ROYAL FLUSH':
                            $('#tdRoyalFlush0').css('color', 'yellow');
                            $('#tdRoyalFlush' + result.BetAmount).css('color', 'yellow');
                            $('#thBet' + result.BetAmount).css('color', 'yellow');
                            break;
                    }
                }
            });
        }
    });
});
function clearDivs() {
    document.getElementById('div1').style.visibility = 'hidden'
    document.getElementById('div2').style.visibility = 'hidden'
    document.getElementById('div3').style.visibility = 'hidden'
    document.getElementById('div4').style.visibility = 'hidden'
    document.getElementById('div5').style.visibility = 'hidden'
    initializeArrays();
}

// methods to hold or muck cards ...............................................................
var arr = [];
function initializeArrays() {
    for (i = 0; i < 5; i++) {
        arr[i] = 0;
    }
}
function hold1() {
    var hold = false;
    if (document.getElementById('div1').style.visibility == 'visible') {
        document.getElementById('div1').style.visibility = 'hidden';
        arr[0] = 0;
    }
    else {
        document.getElementById('div1').style.visibility = 'visible';
        document.getElementById('div1').innerHTML = '<h3>Hold</h3>';
        hold = true;
        arr[0] = 1;
    }
}
function hold2() {
    var hold = false;
    if (document.getElementById('div2').style.visibility == 'visible') {
        document.getElementById('div2').style.visibility = 'hidden';
        arr[1] = 0;
    }
    else {
        document.getElementById('div2').style.visibility = 'visible';
        document.getElementById('div2').innerHTML = '<h3>Hold</h3>';
        hold = true;
        arr[1] = 1;
    }
}
function hold3() {
    var hold = false;
    if (document.getElementById('div3').style.visibility == 'visible') {
        document.getElementById('div3').style.visibility = 'hidden';
        arr[2] = 0;
    }
    else {
        document.getElementById('div3').style.visibility = 'visible';
        document.getElementById('div3').innerHTML = '<h3>Hold</h3>';
        hold = true;
        arr[2] = 1;
    }
}
function hold4() {
    var hold = false;
    if (document.getElementById('div4').style.visibility == 'visible') {
        document.getElementById('div4').style.visibility = 'hidden';
        arr[3] = 0;
    }
    else {
        document.getElementById('div4').style.visibility = 'visible';
        document.getElementById('div4').innerHTML = '<h3>Hold</h3>';
        hold = true;
        arr[3] = 1;
    }
}
function hold5() {
    var hold = false;
    if (document.getElementById('div5').style.visibility == 'visible') {
        document.getElementById('div5').style.visibility = 'hidden';
        arr[4] = 0;
    }
    else {
        document.getElementById('div5').style.visibility = 'visible';
        document.getElementById('div5').innerHTML = '<h3>Hold</h3>';
        hold = true;
        arr[4] = 1;
    }
}

// timer stuff .................
var t, max, i;
function Increase(amount) {
    max = amount;
    i = parseInt(document.getElementById("count").value);
    t = setInterval("SetIncrease()", 10);
}

function SetIncrease() {
    document.getElementById("count").value = ++i;
    if (i == max) {
        clearTimeout(t);
    }
}
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var fiveMinutes = 60 * 5,
        display = $('#time');
    startTimer(fiveMinutes, display);
});
