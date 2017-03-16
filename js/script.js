/**
 * Created by antone on 14/3/17.
 */
function luhnAlgo(cardNumber) {
    //Check whether entered card is valid or not using Luhn Algorithm
    //cardNumber: type=string

    if(cardNumber.length < 13)
        return false;

    // var tmpNum = cardNumber;
    var  n = cardNumber.length - 1;
    var sumArr = []; //Array to store values

    while (n >= 0)
    {
        //Int value not to double the value
        sumArr.push(parseInt(cardNumber[n]));

        //required if card number length is even
        if (n == 0)
            break;

        //Int value to double the value
        var tmp = parseInt(cardNumber[n-1]);
        tmp = tmp*2;
        if (tmp > 9)
            tmp = tmp - 9;

        //pushing temp value to array
        sumArr.push(tmp);

        n -= 2;
    }

    //variable to store the sum to check modulus of 10
    var sum = 0;

    //calculate sum of all the elements of array
    sumArr.forEach(function(val){
        sum += val;
    });

    if (sum % 10 == 0)
        return true;

    return false;
}


function scanCCNumber(ccType, cardNum, replyClass) {
    //Function to get card Type according to prefix

    ccLen = cardNum.length;

    if (ccLen < 13)
    {
        $(ccType).text("");
        return;
    }

    if (cardNum.substr(0,2) == '51' || cardNum.substr(0,2) == '55')
    {
        if (ccLen == 16)
            $(ccType).text("Master Card");
    }
    else if (cardNum[0] == '4')
    {
        if (ccLen == 13 || ccLen == 16)
            $(ccType).text("VISA");
    }
    else if (cardNum.substr(0,2) == '34' || cardNum.substr(0,2) == '37')
    {
        if (ccLen == 15)
            $(ccType).text("AMEX");
    }
    else if (cardNum.substr(0,4) == '6011')
    {
        if (ccLen == 16)
            $(ccType).text("Discover");
    }
    else
        $(ccType).text("");


    if (luhnAlgo(cardNum))
        $(replyClass).removeClass("error").addClass("success").text("Valid Card Number");
    else
        $(replyClass).removeClass("success").addClass("error").text("Invalid Card Number");
}


$('.cc-num').on('keyup change', function() {
    $t = $(this);

    if ($t.val().length > 3) {
        $t.next().focus();
    }

    var card_number = '';
    var ccNum = card_number;
    $('.cc-num').each(function () {
        card_number += $(this).val() + ' ';
        ccNum += $(this).val();
        if ($(this).val().length == 4) {
            $(this).next().focus();
        }
    });

    $('.cc-view-number').text(card_number);

    scanCCNumber(".cc-type", ccNum, ".response-msg");
});

$('#cc-expMonth ,#cc-expYear').on('change keyup', function () {
    var month = $('#cc-expMonth').val();
    var year = $('#cc-expYear').val();
    $('.cc-view-exp').text(month + '/' + year);

    var today = new Date();
    if (year < today.getFullYear())
        $(".response-msg").removeClass("success").addClass("error").text("Invalid Year for Expiry Date");
    else if (year == today.getFullYear())
    {
        if(month < today.getMonth()+1)
            $(".response-msg").removeClass("success").addClass("error").text("Invalid Month for Expiry Date.");
        else
            $(".response-msg").removeClass("success error").text("");
    }
    else
        $(".response-msg").removeClass("success error").text("");
});


$('.cc-cvvNum').on('change keyup mouseup', function (key) {
    $('.cc-view-cvv').text(this.value);
});

$('.cc-name').on('keydown', function (key) {
    if (key.keyCode < 65 && key.keyCode > 90)
        key.preventDefault()
});

// $('.cc-name').on('change mouseup', function (key) {
//     $('.cc-view-name').text(this.value);
// });