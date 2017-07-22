var map = L.map('mapid').setView([37.5, -79], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/schiarizzi/cj59vuej16abk2rmt34iod7pv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoaWFyaXp6aSIsImEiOiJjajE4a3NuZWowNzQ5MzNvN2xkdGh2YnVwIn0.dOZQgGCs8Fwxpy7bmRvvTg', {
    id: 'mapbox.light'
    }).addTo(map);
//{  }

//disable scroll with wheel so it fits into website nicer.
map.scrollWheelZoom.disable();
console.log("Disabled scrollWheelZoom");

map.setMinZoom(7);
console.log("set min zoom level to 7");

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        fillColor: '#b0b1b2',
        weight: 2,
        opacity: 1,
        color: white,
        dashArray: '.25',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    //UPDATE INFO BAR based on hover
    info.update(layer.feature.properties);
}

//testing user clicked

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
///================End of user click testing=============//

var geojson;

console.log("created geojson");

var replist = [4,5,6,14,15,16,19,22,24,76,78,61];
 //list of districts by number where democrats are not running

  var demlist = [11,35,36,37,39,41,43,44,45,46,47,48,52,57,63,70,71,75,79,80,90,92,95 ];
  //list of districts by number where republicans are not running

//set color
function style(features) {
        if (replist.indexOf(features.properties.OBJECTID) > -1) { //if the district number is in the demlist
            return {
                fillColor: '#fc3c4c', //make it blue if rep not running
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '.25',
                fillOpacity: 0.7
            };
        }else if{
            return{
                fillColor: '#3a41ff', //make it grey if dem is not running.
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '.25',
                fillOpacity: 0.7
            }
        }else{
            fillColor: '#ddea25', //make it grey if dem is not running.
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '.25',
            fillOpacity: 0.7
        }
    }




    //Style the map
L.geoJson(districts, {style: style}).addTo(map); //
