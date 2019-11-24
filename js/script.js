var map;

var z = 5; 

var loc = { lat: 37.0902, lng: -95.7129 };

var search_for = [];

var locations = {

    'arizona': [34.0489, -111.0937],

    'california': [36.7783, -119.4179],

    'illinois': [40.6331, -89.3985],

    'kansas': [39.0119, -98.4842],

    'missouri': [37.9643, -91.8318],

    'newmexico': [31.5199, -105.8701],

    'oklahoma': [35.0078, -97.0929],

    'texas': [31.9686, -99.9018],

};

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: z });

}


var city = document.getElementById("city");

function citymap(city, zoom) {

map.setCenter(new google.maps.LatLng(locations[city.value][0], locations[city.value][1]));
 map.setZoom(zoom);

}

city.addEventListener("change", function() {

    citymap(city, z);

    $('input[type="radio"]').prop('checked', false);   

    $("#places").empty();   

});

