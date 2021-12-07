//fetch yelp reviews api function
//go to below website and click on Request Temporary Access to the Demo Server
//https://cors-anywhere.herokuapp.com/corsdemo

fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=SLC', {
	headers: {
		Authorization: 'Bearer iItktBsxYkzzhst_ex3Jy2ApvNQLCXID9Ds2X1UKIsWa00_aY0r5gS15lRC1FIkrTzrj0YaCLF_bNmdyOLzyNyhW8kZ_m_45XXrTs-Fh198hoL8HeNemfpGERsCrYXYx'
	}
})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});

    fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=subway&latitude=40.660316467285156&longitude=-111.5094985961914', {
	headers: {
		Authorization: 'Bearer iItktBsxYkzzhst_ex3Jy2ApvNQLCXID9Ds2X1UKIsWa00_aY0r5gS15lRC1FIkrTzrj0YaCLF_bNmdyOLzyNyhW8kZ_m_45XXrTs-Fh198hoL8HeNemfpGERsCrYXYx'
	}
})
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});



    //User enters location, then clicks submit
var citySearchBtn = document.querySelector("#citySearch");
citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var cityInput = document.querySelector("#cityInfo").value;
    var fetchLatLongUrl = "https://dev.virtualearth.net/REST/v1/Locations/US/" + cityInput + "/?key=AovCYtswu4CycKE80Kb5y7hirY12vuOXsl8AJu3sC9jUZtLOuoZQtIoWh7q2ujoi";
    //after click fetch for the city lat and long
    fetch(fetchLatLongUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data);
            var lat = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
            var long = data.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
            console.log(lat, long);

            //after lat and long fetch, fetch for restaurants
            getRestaurantData(lat, long);
        });

})

var getRestaurantData = function (lat, long) {
    var requestUrl = "http://spatial.virtualearth.net/REST/v1/data/Microsoft/PointsOfInterest?spatialFilter=nearby(" + lat + "," + long + ",5)&$format=json&$filter=EntityTypeID%20eq%20'5800'&$select=EntityID,DisplayName,Latitude,Longitude,__Distance&$top=9&key=AovCYtswu4CycKE80Kb5y7hirY12vuOXsl8AJu3sC9jUZtLOuoZQtIoWh7q2ujoi";
    fetch(requestUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data)
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
    var num = bill.value;
    var tipTotal = num * percentage;
    var finalTotal = num;
    var interger = parseInt(finalTotal);
    console.log(interger);

    finalTotal = interger + tipTotal
    tip.value = "$" + tipTotal.toFixed(2);
    console.log(finalTotal)
    console.log(num)
    console.log(tipTotal)
    total.value = "$" + finalTotal;


    console.log(percentage);
    console.log(bill.value);

}

//Use other API to pull resturant reviews and display
