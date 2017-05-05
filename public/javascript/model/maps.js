'use strict';

let map, infoWindow;

function initMap() {
  let startLoc = {lat: 47.618217, lng: -122.351832};
  map = new google.maps.Map(document.getElementById('map-location'), {
    zoom: 12,
    center: startLoc
  });

  infoWindow = new google.maps.InfoWindow;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('location found');
      // infoWindow.open(map);
      // map.setCenter(pos);
      let marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    }, function(){
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // for if browser does not support geo location
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // this is our error handling function - uses ES6 tertiary if statement
  function handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'error: The geolocation service failed' : 'error: Your browser does not support geolocation');
    infoWindow.open(map);
  }
}
