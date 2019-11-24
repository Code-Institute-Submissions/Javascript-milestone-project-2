var map;

var z = 6; 

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
    
    'park': [36.0544,  -112.1401],
    'parkone': [34.9100, -109.8068],
   

};

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), { center: loc, zoom: z });

}


var state = document.getElementById("state");

function citymap(state, zoom) {

map.setCenter(new google.maps.LatLng(locations[state.value][0], locations[state.value][1]));
 map.setZoom(zoom);

}

state.addEventListener("change", function() {
  citymap(state, z);
  $('input[type="radio"]').prop('checked', false);   
  $("#places").empty();   

});

