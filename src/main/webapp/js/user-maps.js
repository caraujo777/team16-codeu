/*
Description: javascript file corresponding to user-maps.html
Author: Anna Kawakami 
Created: 03/24/19
Last Updated: 03/24/19
*/

let map;
let editMarker;

    function createMap(){
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.5949, lng: -94.8923},
        zoom: 4
      });
   
      map.addListener('click', (event) => {
        createMarkerForEdit(event.latLng.lat(), event.latLng.lng());
      });
    }

    function createMarkerForDisplay(lat, lng, content) {
        const marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        });

        var infoWindow = new google.maps.InfoWindow({
            content: content
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    }


    function createMarkerForEdit(lat, lng) {
        if(editMarker) { 
            editMarker.setMap(null);
        }

        editMarker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map
        });

        const infoWindow = new google.maps.InfoWindow({
            content: buildInfoWindowInput(lat, lng)
        });


        google.maps.event.addListener(infoWindow, 'closeclick', () => {
            editMarker.setMap(null);  
        }); 

        infoWindow.open(map, editMarker);
    }

    function buildInfoWindowInput(lat, lng) {
        const textBox = document.createElement('textarea');
        const button = document.createElement('button');
        button.appendChild(document.createTextNode('Submit'));

        button.onclick = () => {
        createMarkerForDisplay(lat, lng, textBox.value);
        editMarker.setMap(null); 
       };

       const containerDiv = document.createElement('div');
       containerDiv.appendChild(textBox);
       containerDiv.appendChild(document.createElement('br'));
       containerDiv.appendChild(button);
     
       return containerDiv;

    }