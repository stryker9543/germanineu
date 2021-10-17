

function init(){
    // Get the modal
var modal = document.getElementById("myModal");

modal.style.display = "block";

// document.getElementsByTagName("body")[0].style.background = rgba(0,0,0,0.4);

var body = document.getElementsByTagName("body")[0];

var esriview = document.getElementsByClassName("esri-view-surface esri-view-surface--touch-none")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    console.log(event.target);
  if (event.target == modal || event.target == esriview) {
    modal.style.display = "none";
  }
}
};


require(["esri/config","esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"], function (esriConfig,Map, MapView, FeatureLayer) {

      esriConfig.apiKey = "AAPKa5a681bf134d47dfa290599862e859dfALE0fyb3xq-WB-pgK1TxS6eXDrLrECp61pfCEt_qPCWgwjzmEBkGWqWoqT0L7tMt";

const map = new Map({
basemap: "arcgis-topographic" // Basemap layer service
});

const view = new MapView({
map: map,
center: [7.053223, 51.385190], // Longitude, latitude
zoom: 5, // Zoom level
container: "viewDiv" // Div element

});

// Add polygons with a class breaks renderer and unique symbols
      function createFillSymbol(value, color) {
        return {
          "value": value,
          "symbol": {
            "color": color,
            "type": "simple-fill",
            "style": "solid",
            "outline": {
              "style": "none"
            }
          },
          "label": value
        };
      }

// Styling der Features

      const openSpacesRenderer = {
        type: "unique-value",
        field: "Sprachtyp",
        uniqueValueInfos: [
          createFillSymbol("Bundesdeutsches Hochdeutsch", "#008000"),
          createFillSymbol("Deutschsprachige Minderheiten", "#00D5D5"),
          createFillSymbol("Belgisches Deutsch", "#A8E61D"),
          createFillSymbol("Luxemburgisches Deutsch", "#00FF00"),
          createFillSymbol("Schweizer Hochdeutsch", "#400040"),
          createFillSymbol("Lichtensteiner Deutsch", "#8000FF"),
          createFillSymbol("Östereichisches Deutsch", "#0000A0"),
          createFillSymbol("Südtiroler Deutsch", "#0000FF")
          
        ]
      };
      
// Popup

// Define popup for FeatureLayer
      const popupfeatures = {
        "title": "{Sprachtyp}",
        "content": [{
          "type": "fields",
          "fieldInfos": [
            {
              "fieldName": "FID",
              "label": "fid",
              "isEditable": true,
              "tooltip": "The ID of the Feature",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "DN",
              "label": "DN",
              "isEditable": true,
              "tooltip": "The digital number of the Feature",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "Sprachtyp",
              "label": "Sprachtyp",
              "isEditable": true,
              "tooltip": "The type of spoken language of the Feature",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },

            {
              "fieldName": "Fläche",
              "label": "Fläche in km²",
              "isEditable": true,
              "tooltip": "The area of the Feature",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },

              "stringFieldOption": "text-box"
            }
          ]
        }]
      }


const sprachen_layer = new FeatureLayer({
  url: "https://services3.arcgis.com/1qxbU5oLn91dzGRZ/arcgis/rest/services/sprachen_eu_utm/FeatureServer/0",
  renderer: openSpacesRenderer,
  opacity: 0.4,
  outFields: ["fid","DN", "Sprachtyp","Fläche"],
  popupTemplate: popupfeatures
});

map.add(sprachen_layer);

});