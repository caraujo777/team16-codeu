/*
Description: javascript file corresponding to maps.html page 
Author: Anna Kawakami 
Created: 03/10/19
Last Updated: 03/10/19
*/

let map;
    function createMap(){
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.422, lng: -122.084},
        zoom: 15
      });

      const trexMarker = new google.maps.Marker({
      position: {lat: 37.421903, lng: -122.084674},
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Stan the T-Rex', 
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });

      var trexInfoWindow = new google.maps.InfoWindow({
      content: 'This is Stan, the T-Rex statue.'
      });
      
      trexMarker.addListener('click', function() {
        trexInfoWindow.open(map, trexMarker);
      });
    }