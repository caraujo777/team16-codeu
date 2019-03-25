/*
Description: javascript file corresponding to maps.html page 
Author: Anna Kawakami 
Created: 03/10/19
Last Updated: 03/10/19
*/

let map;
    /** Creates a map that shows landmarks around Google. */
    function createMap(){
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.422, lng: -122.084},
        zoom: 15
      });

      addLandmark(map, 42.2957057, -71.3216226, "Wellesley College", 
        "Anna goes to Wellesley College!")
      addLandmark(map, 41.8239891, -71.4128343, "Brown University",
      "Cintia goes to Brown University!")
      addLandmark(map, 40.808805, -73.965899, "Columbia University", 
      "Oscar goes to Columbia University!")
      addLandmark(map, 25.1747, -100.5852, "Monterrey Institute of Technology",
      "Pablo goes to Monterrey Institute of Technology!")
      addLandmark(map, 37.3688, -122.036, "Sunnyvale, California", 
      "Gaurav is a Google software engineer based in Sunnyvale California!")
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