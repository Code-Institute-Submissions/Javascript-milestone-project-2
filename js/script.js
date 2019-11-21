let map, places, infoWindow;

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
      center: {
        lat: 37.0902,
        lng: -95.7129,
      }
    });

 var nationalPark
 var attraction
 var state
 
 var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

 var locations = [
   
    { lat: 40.6331, lng: -89.3985, state},
    { lat: 37.9643, lng: -91.8318, state},
    { lat: 39.0119, lng: -98.4842, state},
    { lat: 35.0078, lng: -97.0929, state},
    { lat: 31.9686, lng: -99.9018, state},                             
    { lat: 35.5199, lng: -105.8701, state},
    { lat: 34.0489, lng: -111.0937, state},
    { lat: 36.7783, lng: -119.4179, state},

    { lat: 36.0544, lng: -112.1401, nationalPark},
    { lat: 34.9100, lng: -109.8068, nationalPark},
    { lat: 38.5029, lng: -90.5935, nationalPark},
    { lat: 34.9373, lng: -101.6476, nationalPark},
    { lat: 34.9003, lng: -107.9942, nationalPark},
    { lat: 34.3238, lng: -115.4728, nationalPark},
    { lat: 35.141689, lng: -115.510399, nationalPark},
    
    { lat: 35.187223, lng: -101.987097, attraction},
    { lat: 34.0103, lng: -118.4962, attraction},
    { lat: 41.8789, lng: -87.6359, attraction},
    { lat: 35.0278, lng: -111.0222, attraction},
    { lat: 36.1770, lng: -115.1353, attraction},
    { lat: 37.42425, lng: -944426, attraction},
    { lat: 35.6835, lng: -93.2904, attraction},
    { lat: 35.6835, lng: -105.9376, attraction},

]
    
var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
    position: location, 
    label: labels[i % labels.length]
      });
    });
  
  var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
  }
  
 

 /*
 
 function fetchAttractionInformation(event) {
   var attraction = $("#attractions").val();
   if (!attraction) {
     $("#attraction-info").html('<h3>Enter National Parks/Trails or attractions</h2>');
     return;
   }
 }
 
 function fetchAttractionInformation(event) {
   var nationalPark = $("#nationalPark").val();
   if (!nationalPark) {
     $("#nationalparks-info").html('<h3>Enter National Parks/Trails or attractions</h2>');
     return;
   }
 }
 */
 
 
 