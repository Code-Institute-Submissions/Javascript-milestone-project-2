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



 var map, places, infoWindow;
      var markers = [];
      var autocomplete;
      var countryRestrict = {'usState': 'us'};
      
     

      var state = {
        'az': {
          center: {lat: 34.0489, lng: -111.0937},
          zoom: 5
        },
        'ca': {
          center: {lat: 36.7783, lng: -119.4179},
          zoom: 5
        },
        'il': {
          center: {lat: 40.6331, lng: -89.3985},
          zoom: 5
        },
        'mi': {
          center: {lat: 37.9643, lng: -91.8318},
          zoom: 5
        },
        'nm': {
          center: {lat: 31.5199, lng: -105.8701},
          zoom: 5
        },
        'ol': {
          center: {lat: 35.0078, lng: -97.0929},
          zoom: 5
        },
        'tx': {
          center: {lat: 31.9686, lng: -99.9018},
          zoom: 5
        },
        'us': {
          center: {lat: 37.1, lng: -95.7},
          zoom: 3
        },
      };
      


      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: state['us'].zoom,
          center: state['us'].center,
        });
        
          // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocomplete')), {
              types: ['(cities)'],
            });
        

        autocomplete.addListener('place_changed', onPlaceChanged);

        // Add a DOM event listener to react when the user selects a country.
        document.getElementById('usState').addEventListener(
            'change', setAutocompleteusState);
      }

      // When the user selects a city, get the place details for the city and
      // zoom the map in on the city.
      function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
          map.panTo(place.geometry.location);
          map.setZoom(12);
          search();
        } else {
          document.getElementById('autocomplete').placeholder = 'search';
        }
      }
      
      function search() {
        var search = {
          bounds: map.getBounds(),
          types: ['lodging']
        };

        places.nearbySearch(search, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
              var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
              var markerIcon = MARKER_PATH + markerLetter + '.png';
              // Use marker animation to drop the icons incrementally on the map.
              markers[i] = new google.maps.Marker({
                position: results[i].geometry.location,
                animation: google.maps.Animation.DROP,
                icon: markerIcon
              });
              // If the user clicks a hotel marker, show the details of that hotel
              // in an info window.
              markers[i].placeResult = results[i];
              google.maps.event.addListener(markers[i], 'click', showInfoWindow);
              setTimeout(dropMarker(i), i * 100);
              addResult(results[i], i);
            }
          }
        });
      }

  

      // Set the country restriction based on user input.
      // Also center and zoom the map on the given country.
      function setAutocompleteusState() {
        var usState = document.getElementById('usState').value;
        if (usState == 'all') {
          autocomplete.setComponentRestrictions({'usState': []});
          map.setCenter({lat: 15, lng: 0});
          map.setZoom(2);
        } else {
          autocomplete.setComponentRestrictions({'usState': usState});
          map.setCenter(state[usState].center);
          map.setZoom(state[usState].zoom);
        }
        clearResults();
        clearMarkers();
      }


 <div class="thing-search">
      <div id="findplace">
        Check out the route...
      </div>

      <div id="searchField">
        <input id="autocomplete" placeholder="search" type="text" />
      </div>

      <div id="dropdown">
        <select id="usState">
          <option value="az">Arizona</option>
          <option value="ca">California</option>
          <option value="il">Illinois</option>
          <option value="ka">Kansas</option>
          <option value="mi">Missouri</option>
          <option value="nm">New Mexico</option>
          <option value="ol">Oklahoma</option>
          <option value="tx">Texas</option>
        </select>
      </div>
    </div>
 
