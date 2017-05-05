'use strict';

function initMap() {
  let startLoc = {lat: 47.618217, lng: -122.351832};
  let map = new google.maps.Map(document.getElementById('map-location'), {
    zoom: 4,
    center: startLoc
  });

  let marker = new google.maps.Marker({
    position: startLoc,
    map: map
  });
}
