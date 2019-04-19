/*
Description: javascript file corresponding to sfmaps.html 
Author: Anna Kawakami 
Created: 04/15/19
Last Updated: 04/15/19
*/

let map;
    /** Creates a map that shows 10 locations in san francisco */
    function createMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.422, lng: -122.084},
        zoom: 15
      });

      addLandmark(map, 37.718806, -122.50437, "Fort Funston Doggie Beach", 
        "Best Beach Furever")
      addLandmark(map, 37.599196, -122.502011, "Pacifica State Beach",
      "Hawtest Beach for Paws")
      addLandmark(map, 37.769446, -122.486296, "Golden Gate Park", 
      "The Pawfect Park for Pups")
      addLandmark(map, 37.719771, -122.419045, "Mclaren Park",
      "Park fur Ruff Dogs Only")
      addLandmark(map, 37.765481, -122.438082, "Alta Plaza Off Leash Dog Park", 
      "The Fureshest Park")
      addLandmark(map, 37.791285, -122.43169, "Corona Heights Park", 
      "The Park in Colliefornia")
      addLandmark(map, 37.75917, -122.426903, "Dolores Park", 
      "Puparazzi-Free Park Please")
      addLandmark(map, 37.749682, -122.444865, "Glen Canyon Park", 
      "A Pawsome Park fur All")
      addLandmark(map, 37.786943, -122.15176, "Leona Canyon Trail", 
      "Trail to Walk with Fur-ends")
      addLandmark(map, 37.78459, -122.408615, "Barbary Coast Trail", 
      "The Pawsomest Trail of All")
      addLandmark(map, 37.785328, -122.507618, "Lands End Lookout", 
      "Pawsibly the Best Trail Ever")
    }

    /** Adds a marker that shows an InfoWindow when clicked. */
    function addLandmark(map, lat, lng, title, description) {
        const marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: title
        });
        var infoWindow = new google.maps.InfoWindow({
            content: description
        });
        marker.addListener('click', function() {
        infoWindow.open(map, marker);
        });
    }