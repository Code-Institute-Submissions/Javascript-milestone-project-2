
//Global Variables---------------------------------
var map;
var infoWindow;
var placesService;
var markers = [];
var america = {lat: 37.0902, lng: -95.7129};
var autocomplete;
var placeType;


//Initialize Map------------------------------------
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: america,
    zoom: 4
  });
  
  // Info window with place details
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });


  autocomplete = new google.maps.places.Autocomplete(
    (
      document.getElementById('searchPlace')), {
      types: ['(cities)'],
      componentRestrictions: {country: 'us'}
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
  //Nearby place search by click---------------------------
  placesService = new google.maps.places.PlacesService(map);




  //Nearby place search by click---------------------------
  placesService = new google.maps.places.PlacesService(map);
  
  document.getElementById("accommodation").addEventListener("click", function() {
    placeType = ['lodging', 'hotel', 'motel'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("nationalParks").addEventListener("click", function() {
    placeType = ['parks', 'hikes', 'national_park', 'canyon_park', 'mountain', 'state_park'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("attraction").addEventListener("click", function() {
    placeType = ['night_club', 'zoo', 'museum', 'cinema' ];
    clearMarkers();
    searchPlaces();
  });


  //Sets the info window in the place details html element------------------------------
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
  });
}
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
          animation: google.maps.Animation.DROP
        });
        markers[i].placeResult = results[i];
        google.maps.event.addListener(markers[i], 'click', showInfoWindow); //Show info window when user clicks on a marker---
        //google.maps.event.addListener(markers[i], 'click', showInfoWindow); Show info window when user clicks on a marker---
        setTimeout(dropMarker(i), i * 100);
      }

    }
  });
}
//Add markers to map----------------------------
function dropMarker(i) {
  return function() {
    markers[i].setMap(map);
  };
}

//Clear markers---------------------------------
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      markers[i].setMap(null);
    }
  }
  markers = [];
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
    
   