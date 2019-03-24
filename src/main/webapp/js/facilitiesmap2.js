/*
Description: javascript file corresponding to facilitiesmap.html
Author: Anna Kawakami 
Created: 03/22/19
Last Updated: 03/24/19
File uses specific markers on map based on facility type.
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

          
            const icons = {
                Park: {
                    icon: {
                        url: 'markerimages/parks.png',
                        //scaledSize: new google.maps.Size(70, 70), 
                    }
                }, 
                Water: {
                    icon:{
                        url: 'markerimages/water.png', 
                       // scaledSize: new google.maps.Size(70, 70),
                    } 
                }, 
                Sports: {
                    icon: {
                        url: 'markerimages/play.png',
                       // scaledSize: new google.maps.Size(70, 70),
                    } 
                }
            };

            const markers = facilitiesLocations.map(function(facilitiesLocation, i) {
                    return new google.maps.Marker({
                        position: {lat: facilitiesLocation.lat, lng: facilitiesLocation.lng},
                        icon: icons[facilitiesLocation.facilType]['icon'],
                        map: map
                    });
            });

        });

    } 

    
