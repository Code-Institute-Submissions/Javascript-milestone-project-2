//I used Google Maps API documentation and took aspects of 'hotel autosearch' to create my map

var map;
var google;
var infoWindow;
var placesService;
var markers = [];
var america = { lat: 37.0902, lng: -95.7129 };
var autocomplete;
var placeType;
var usMarker = "images/americanflagmarker.png";

//Generate map ----------
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

  //Place search-----
  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(10);
    }
    else {
      document.getElementById('searchPlace').placeholder = 'What do you want to explore';
    }
  }

  placesService = new google.maps.places.PlacesService(map);


  //Jquery learned from the Code Institute lessons to only generate specific markers when the user clicks on the button


  document.getElementById("accommodation").addEventListener("click", function() {
    placeType = ['lodging', 'hotel', 'motel', 'hostel'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("restaurants").addEventListener("click", function() {
    placeType = ['cafe', 'restaurant', 'diner', 'bar'];
    clearMarkers();
    searchPlaces();
  });
  document.getElementById("attraction").addEventListener("click", function() {
    placeType = ['night_club', 'zoo', 'museum', 'cinema', 'bus_tour'];
    clearMarkers();
    searchPlaces();
  });



  //Search places----
  function searchPlaces() {
    var search = {
      bounds: map.getBounds(),
      types: placeType
    };
    placesService.nearbySearch(search, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //Clear markers----
        clearMarkers();
        //Create markers, individualise markers so that the US flag comes the marker----
        for (var i = 0; i < results.length; i++) {
          markers[i] = new google.maps.Marker({
            position: results[i].geometry.location,
            icon: usMarker,

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

  //Clearing the markers when the user clicks on a different button
  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      if (markers[i]) {
        markers[i].setMap(null);
      }
    }
    markers = [];
  }

  //Sets the info window in the place details html element. I looked at previous students projects to give me some ideas on how to do this, in addition to the google maps api.
  //Details of the student projects I looked at are detailed on my readme
  infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-box')
  });
}


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

 document.getElementById('place-website').innerHTML = '<a class="btn btn-link" href="' + place.website + '" target="_blank">' + 'Website ' + '</a>';
}