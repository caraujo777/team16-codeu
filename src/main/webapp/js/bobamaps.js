/*
Description: javascript file corresponding to bobamaps.html page 
Author: Anna Kawakami 
Created: 03/17/19
Last Updated: 03/17/19
*/

let map;
    function createBobaMap() {
        fetch('/boba-locations').then(function(response) {
            return response.json();
        }).then((bobaLocations) => {

            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 35.78613674, lng: -119.4491591},
                zoom:7
            });

            bobaLocations.forEach((bobaLocation) => {
                new google.maps.Marker({
                    position: {lat: bobaLocation.lat, lng: bobaLocation.lng},
                    map: map
                });

              });

        });
    } 

    
