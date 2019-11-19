
  function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {
        lat: 37.0902,
        lng: -95.7129,
      }
    });
  
  
  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  var locations = [
    
    { lat: 40.6331, lng: -89.3985},
    { lat: 37.9643, lng: -91.8318},
    { lat: 39.0119, lng: -98.4842},
    { lat: 35.0078, lng: -97.0929},
    { lat: 31.9686, lng: -99.9018},
    { lat: 35.5199, lng: -105.8701},
    { lat: 34.0489, lng: -111.0937},
    { lat: 36.7783, lng: -119.4179},
    
    ];
    
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location, 
        label: labels[i % labels.length]
      });
    });
  
  var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
    
  }

 
 
 
 
 
 
 