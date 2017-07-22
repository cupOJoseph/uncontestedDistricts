var map = L.map('mapid').setView([37.5, -79], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/schiarizzi/cj59vuej16abk2rmt34iod7pv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoaWFyaXp6aSIsImEiOiJjajE4a3NuZWowNzQ5MzNvN2xkdGh2YnVwIn0.dOZQgGCs8Fwxpy7bmRvvTg', {
  id: 'mapbox.light'
}).addTo(map);
//{  }

//disable scroll with wheel so it fits into website nicer.
//map.scrollWheelZoom.disable();

map.setMinZoom(7);

function onEachFeature(feature, layer) {
  const popupTemplate = `<h3>District #${feature.properties.DISTRICT_N}</h3>
    <h4>Demographic Data (VAP)</h4>
    <p>Asian: ${feature.properties.VAPASIAN}</p>
    <p>Black: ${feature.properties.VAPBLACK}</p>
    <p>Hispanic: ${feature.properties.VAP_HISP}</p>
    <p>Pacific Islander: ${feature.properties.VAPHAWPI}</p>
    <p>White: ${feature.properties.VAPWHITE}</p>
    <p>Multi: ${feature.properties.VAPMULTI}</p>
    <p>Other: ${feature.properties.VAPOTHER}</p>
`;
  layer.bindPopup(popupTemplate);
}


$.ajax({
  url:"https://raw.githubusercontent.com/jschiarizzi/uncontestedDistricts/master/data/districts.geojson",
  dataType: "json",
  success: console.log("Districts data successfully loaded."),
  error: function (xhr) {
    console.error(xhr.statusText);
  }})
  .then(districts => {
    L.geoJson(districts, {
      style: style,
      onEachFeature
    }).addTo(map);
});


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
  }else if(demlist.indexOf(features.properties.OBJECTID) > -1){
    return{
      fillColor: '#3a41ff', //make it grey if dem is not running.
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '.25',
      fillOpacity: 0.7
    }
  }else{
    return{fillColor: '#a9a9a9', //make it grey if dem is not running.
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '.25',
      fillOpacity: 0.7}
  }
}
