//I used Google Maps API documentation and took aspects of 'hotel autosearch' to create my map

var map;
var infoWindow;
var placesService;
var markers = [];
var america = { lat: 37.0902, lng: -95.7129 };
var autocomplete;
var placeType;
var image = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png';


//Generate map ------------------------------------- 
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: america,
    zoom: 4
  });


  // Set bounds so that the user can only search for cities in the USA
  autocomplete = new google.maps.places.Autocomplete(
    (
      document.getElementById('searchPlace')), {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }
    });


  autocomplete.addListener('place_changed', onPlaceChanged);

  //Place search---------------------------------------
  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(10);
    }
    else {
      document.getElementById('searchPlace').placeholder = 'Where are you going?';
    }
  }

  placesService = new google.maps.places.PlacesService(map);


  //Jquery learned from the Code Institute lessons to only generate specific markers when the user clicks on the button

  document.getElementById("accommodation").addEventListener("click", function() {
    placeType = ['lodging', 'hotel', 'motel'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("nationalParks").addEventListener("click", function() {
    placeType = ['hikes', 'national', 'canyon', 'mountain', 'state_park', 'peak', 'preserve'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("attraction").addEventListener("click", function() {
    placeType = ['night_club', 'zoo', 'museum', 'cinema', 'bridge'];
    clearMarkers();
    searchPlaces();
  });



  //Search places---------------------------------------------------------
  function searchPlaces() {
    var search = {
      bounds: map.getBounds(),
      types: placeType
    };
    placesService.nearbySearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //Clear markers---------------------------------------------------
        clearMarkers();
        //Create markers----------------------------------------------------
        for (var i = 0; i < results.length; i++) {
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            animation: google.maps.Animation.DROP,
           
          });
          markers[i].placeResult = results[i];
          google.maps.event.addListener(markers[i], 'click', showInfoWindow);
          setTimeout(dropMarker(i), i * 100);
        }

      }
    });
  }

  //Adding markers
  function dropMarker(i) {
    return function() {
      markers[i].setMap(map);
      
    };
  }

  //Clearing the markers when the user clicks on something else
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
  }

  //Sets the info window in the place details html element------------------------------
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-box')
  });
}
// Get the place details for a place. Show the information in an info window,
// anchored on the marker for the place that the user selected.


function showInfoWindow() {
  var marker = this;
  placesService.getDetails({ placeId: marker.placeResult.place_id },
    function(place, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      }
      infoWindow.open(map, marker);
      renderPlaceDetails(place);
    });
}

// Load the place information into from html
function renderPlaceDetails(place) {
  document.getElementById('place-name').textContent = place.name;
  document.getElementById('place-address').textContent = place.formatted_address;

  if (place.formatted_phone_number) {
    document.getElementById('place-phoneNumber').textContent = place.formatted_phone_number;
  }
  else {
    document.getElementById('place-phoneNumber').textContent = 'Not available';
  }
 
}