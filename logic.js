var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"



d3.json(Url, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {


   function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
      "</h3><hr><p>Magnitude: " + feature.properties.mag + "</p>");
  }

  

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      var color;
      var r = Math.floor(255-80*feature.properties.mag);
      var g = Math.floor(255-80*feature.properties.mag);
      var b = 255;
      color= "rgb("+r+" ,"+g+","+ b+")"
      
      var geojsonMarkerOptions = {
        radius: 2*feature.properties.mag,
        fillColor: color,
        color: "black",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.4
      };
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  });


   createMap(earthquakes);
  
}

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiZnViYXJyb3NvIiwiYSI6ImNqdGxsd3BnYTBkY2o0M3BleWM0NTB2c2wifQ.VQRyalqdJONe4NMcE1PUVA");

  var baseMaps = {
    "Street Map": streetmap
  };

  var overlayMaps = {
    Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
    center: [
      40, -100
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });
}
