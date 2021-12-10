//User enters location, then clicks submit
var citySearchBtn = document.querySelector("#citySearch");
var search = function (cityInput) {
    
    
    window.localStorage.setItem("lastCity", cityInput);
    var fetchLatLongUrl = "https://dev.virtualearth.net/REST/v1/Locations/US/" + cityInput + "/?key=AovCYtswu4CycKE80Kb5y7hirY12vuOXsl8AJu3sC9jUZtLOuoZQtIoWh7q2ujoi";
    //after click fetch for the city lat and long
    fetch(fetchLatLongUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            var lat = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
            var long = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];

            //after lat and long fetch, fetch for restaurants
            getRestaurantData(lat, long);
        });

    }
citySearchBtn.addEventListener("click", function(event){
    event.preventDefault();
    var cityInput = document.querySelector("#cityInfo").value;
    search(cityInput);
});

var getRestaurantData = function (lat, long) {
    var requestUrl = "https://spatial.virtualearth.net/REST/v1/data/Microsoft/PointsOfInterest?spatialFilter=nearby(" + lat + "," + long + ",5)&$format=json&$filter=EntityTypeID%20eq%20'5800'&$select=EntityID,DisplayName,Latitude,Longitude,__Distance&$top=9&key=AovCYtswu4CycKE80Kb5y7hirY12vuOXsl8AJu3sC9jUZtLOuoZQtIoWh7q2ujoi";
    fetch(requestUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            var parentRestaurantEl = document.querySelector("#parentRestaurant");

            //remove any previous search results
            while (parentRestaurantEl.hasChildNodes()) {
                parentRestaurantEl.removeChild(parentRestaurantEl.firstChild);
            }

            for (var i = 0; i < data.d.results.length; i++) {
                var childRestaurantEl = document.createElement("div")
                childRestaurantEl.id = "restaurant" + i;
                childRestaurantEl.classList.add("restaurant-input")
                childRestaurantEl.textContent = data.d.results[i].DisplayName;
                var restaurant = {
                    mapid: childRestaurantEl.id,
                    lat: data.d.results[i].Latitude,
                    long: data.d.results[i].Longitude,
                    name: data.d.results[i].DisplayName
                }


                //append restaurants to html
                parentRestaurantEl.appendChild(childRestaurantEl);
                createMap(restaurant);
            }
        })
}

var createMap = function (restaurant) {
    L.mapquest.key = 'dnL1ogrkx7x6IEM7j4dU0x6yTmQx050w';
    var map = L.mapquest.map(restaurant.mapid, {
        center: [restaurant.lat, restaurant.long],
        layers: L.mapquest.tileLayer("map"),
        zoom: 15
    })

    L.marker([restaurant.lat, restaurant.long], {
        icon: L.mapquest.icons.marker(),
        draggable: false,

    }).addTo(map)

    L.mapquest.textMarker([restaurant.lat, restaurant.long], {
        text: restaurant.name,
        position: "bottom",
        type: "marker",
        icon: {
            primaryColor: "#03045e",
            secondaryColor: "#03045e",
            size: "sm"
        }
    }).addTo(map)
}




var bill = document.getElementById("bill");
var btn18 = document.querySelector("#eighteen");
btn18.addEventListener("click", function (event) {
    percentage = .18;
    billPay(percentage)
});
var btn20 = document.querySelector("#twenty");
btn20.addEventListener("click", function (event) {
    percentage = .20;
    billPay(percentage)
});
var btn22 = document.querySelector("#twentytwo");
btn22.addEventListener("click", function (event) {
    percentage = .22;
    billPay(percentage)
});
var btn25 = document.querySelector("#twentyfive");
btn25.addEventListener("click", function (event) {
    percentage = .25;
    billPay(percentage)
});
var tip = document.querySelector("#tip");
var total = document.querySelector("#total");
var percentage = 0;

//Use other API to pull restaurant reviews and display


//User enters amount and selects tip rate, then display totals
function billPay(percentage) {
    //Checks input to see if there's anything
    if(!bill.value){
    tip.value = "Please enter a bill amount!";
    total.value = "Please enter a bill amount!";
    bill.focus();
    return;
    }
    var num = bill.value;
    var tipTotal = num * percentage;
    var finalTotal = num;
    var interger = parseInt(finalTotal);

    finalTotal = interger + tipTotal
    tip.value = "$" + tipTotal.toFixed(2);
    total.value = "$" + finalTotal.toFixed(2);
}

//Use other API to pull resturant reviews and display

var lastCity = window.localStorage.getItem("lastCity");
if (lastCity) {
    search (lastCity);
}