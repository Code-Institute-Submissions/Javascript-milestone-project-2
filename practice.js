var map;

var z = 6; 

var loc = { lat: 37.0902, lng: -95.7129 };

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

var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var marker = [ 
    
    { lat: 36.0544, lng: -112.1401},
   { lat: 34.9100, lng: -109.8068},
    
    ]
    

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



var map;

var google;

var z = 6; 

var loc = { lat: 37.0902, lng: -95.7129 };

function initMap(state, zoom) {
    map = new google.maps.Map(document.getElementById("map",), { center: loc, zoom: z }); 
   


var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var states = [
    
    { lat: 40.6331, lng: -89.3985},
    { lat: 37.9643, lng: -91.8318},
    { lat: 39.0119, lng: -98.4842},
    { lat: 35.0078, lng: -97.0929},
    { lat: 31.9686, lng: -99.9018},
    { lat: 35.5199, lng: -105.8701},
    { lat: 34.0489, lng: -111.0937},
    { lat: 36.7783, lng: -119.4179},

    
    ];

    
var markers = states.map(function(location, i) {
    return new google.maps.Marker({
    position: location, 
    label: labels[i % labels.length]
      });
    });
  
  var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  
}


var state = document.getElementById("state");

function citymap(states, zoom) {

map.setCenter(new google.maps.LatLng(states[state.value][0], states[state.value][1]));
 map.setZoom(zoom);

}

state.addEventListener("change", function() {
  citymap(state, z);
  $('input[type="radio"]').prop('checked', false);   
  $("#places").empty();   

});


