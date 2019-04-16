/*
Description: javascript file corresponding to facilitiesmap.html
Author: Anna Kawakami 
Created: 03/17/19
Last Updated: 03/17/19
*/

let map;
    function createFacilitiesMap() {
        fetch('/dogFacilities-locations').then(function(response) {
            return response.json();
        }).then((facilitiesLocations) => {

            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 35.78613674, lng: -119.4491591},
                zoom:7
            });

           const markers = facilitiesLocations.map(function(facilitiesLocation, i) {
               return new google.maps.Marker({
                   position: {lat: facilitiesLocation.lat, lng: facilitiesLocation.lng},
                   map: map,
               });
           });

            const markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });

            


        });

    } 

    
