//User enters location, have Google Maps pull data from said location
var map= document.querySelector("submit");
var locate = document.querySelector("locate");
var bill = document.getElementById("bill");
var btn18 = document.querySelector("#eighteen");
btn18.addEventListener("click", function (event) {percentage = .18;
billPay(percentage)});
var btn20 = document.querySelector("#twenty");
btn20.addEventListener("click", function (event) {percentage = .20;
    billPay(percentage)});
var btn22 = document.querySelector("#twentytwo");
btn22.addEventListener("click", function (event) {percentage = .22;
    billPay(percentage)});
var btn25 = document.querySelector("#twentyfive");
btn25.addEventListener("click", function (event) {percentage = .25;
    billPay(percentage)});
var tip = document.querySelector("#tip");
var total = document.querySelector("#total");
var percentage = 0;

//Use other API to pull restaurant reviews and display


//User enters amount and selects tip rate, then display totals
function billPay (percentage) {
    var num = bill.value;
    var tipTotal = num * percentage;
    var finalTotal = num;
    var interger = parseInt(finalTotal);
    console.log (interger);

    finalTotal = interger + tipTotal
    tip.value = "$"+ tipTotal.toFixed(2);
    console.log (finalTotal)
    console.log (num)
    console.log (tipTotal)
    total.value = "$" + finalTotal;


    console.log (percentage);
    console.log (bill.value);

}

//Use other API to pull resturant reviews and display


//User enters amount and selects tip rate, then display totals





map.addEventListener("on-click", locate);