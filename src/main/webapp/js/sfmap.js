/*
Description: javascript file corresponding to sf-map.html
Author: Anna Kawakami 
Created: 04/07/19
Last Updated: 04/0/19
File uses specific markers on map based on facility type.
*/

let map;
    function sfMap() {
        fetch('/sf-locations').then(function(response) {
            return response.json();
        }).then((sfLocations) => {

            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 35.78613674, lng: -119.4491591},
                zoom:7
            });

          
            const icons = {
                park: {
                    icon: 'markerimages/parks.png'
                }, 
                beach: {
                    icon:'markerimages/water.png'          
                }, 
                trail: {
                    icon: 'markerimages/play.png'
                }
            };

            const markers = sfLocations.map(function(sfLocation, i) {
                    return new google.maps.Marker({
                        position: {lat: sfLocation.lat, lng: sfLocation.lng},
                        icon: icons[sfLocation.facilType][icon],
                        map: map
                    });
            });

        });

    } 

    
