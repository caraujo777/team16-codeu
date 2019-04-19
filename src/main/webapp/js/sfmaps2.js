/*
Description: javascript file corresponding to sfmaps.html 
Author: Anna Kawakami 
Created: 04/15/19
Last Updated: 04/15/19
*/

let map;
    /** Creates a map that shows 10 locations in san francisco */
    function createMap(){
        map = new google.maps.Map(
            document.getElementById('map'),{
                center: {lat: 37.741000, lng: -122.332460},
                zoom: 10
            });
    

        /* Creates customized markers*/
            const icons = {
                trail: {
                    icon: 'markerimages/hiking.png',
                },
                park: {
                    icon:'markerimages/parks.png',
                },
                beach: {
                    icon: 'markerimages/water.png',
                }
            }; 

            // reformating so it works 
            var features = [
                {
                  position: new google.maps.LatLng(37.718806, -122.50437),
                  type: 'beach',
                  name: 'Best Beach Furever'
                }, {
                  position: new google.maps.LatLng(37.599196, -122.502011),
                  type: 'beach',
                  name: 'Hawtest Beach for Paws'
                }, {
                  position: new google.maps.LatLng(37.769446, -122.486296),
                  type: 'park',
                  name: 'Pawfect Park for Pups'
                }, {
                  position: new google.maps.LatLng(37.719771, -122.419045),
                  type: 'park',
                  name: 'Park fur Ruff Dogs Only'
                }, {
                  position: new google.maps.LatLng(37.765481, -122.438082),
                  type: 'park',
                  name: 'Fureshest Park'
                }, {
                  position: new google.maps.LatLng(37.791285, -122.43169),
                  type: 'park',
                  name: 'Colliefornian Park'
                }, {
                  position: new google.maps.LatLng(37.75917, -122.426903),
                  type: 'park',
                  name: 'Puparazzi-Free Park Please'
                }, {
                  position: new google.maps.LatLng(37.749682,-122.444865),
                  type: 'park',
                  name: 'A Pawsome Park fur All'
                }, {
                  position: new google.maps.LatLng(37.786943, -122.15176),
                  type: 'trail',
                  name: 'Trail to Walk with Fur-ends'
                }, {
                  position: new google.maps.LatLng(37.78459, -122.408615),
                  type: 'trail',
                  name: 'Pawsomest Trail of All'
                }, {
                  position: new google.maps.LatLng(37.785328, -122.507618),
                  type: 'trail',
                  name: 'Pawsibly the Best Trail Ever'
                }
              ];

            for(var i = 0; i < features.length; i++) {
                addLocations(features[i])
            };

            function addLocations(feature) {
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: icons[feature.type].icon, 
                    map:map
                });

                var infoWindow = new google.maps.InfoWindow({
                    content: feature.name
                });

                marker.addListener('click', function() {
                    infoWindow.open(map,marker);
                });
        
                marker.addListener('click', function() {
                    toggleBounce(marker);
                });
            };

            function toggleBounce(marker) {
                if(marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else{
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null); 
                    }, 750);
                }
            };
    }
       
   



