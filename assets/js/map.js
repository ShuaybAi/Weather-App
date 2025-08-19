
const toggle = document.getElementById("toggle");
const layerId = "weatherLayer"
let currentMarker = null;

import { getLatLon } from "./script.js";
import { apiKey } from "./script.js";

mapboxgl.accessToken =
"pk.eyJ1IjoiYWVzb20iLCJhIjoiY21lZzEzdHM4MHVzdjJqc2Y4cGtrMzJseSJ9.7j6FIpAePZGj6gOidJ35Hw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/standard", 
  projection: "globe", 
  zoom: 1.2, 
  center: [30, 15], 
  scrollZoom: true,
  boxZoom: true
});

map.addControl(new mapboxgl.NavigationControl());


document.addEventListener("DOMContentLoaded", function () {
async function showLatLon() {
  const coords = await getLatLon();
  
  map.flyTo({
          center: [coords[1], coords[0]],
          zoom: 12,
          speed: 3,
          curve: 1.2,
        });

}

showLatLon();
})

map.on("style.load", () => {
    map.setFog({});

    map.addSource('weatherLayer', {
        type: 'raster',
        tiles: [
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`
        ],
        tileSize: 256,
        attribution: 'Weather © OpenWeather'
    });
});

let weatherLayerVisible = false;

toggle.addEventListener('click', () => {
  if (!map.getLayer('weatherLayer')) {
    map.addLayer({
      id: 'weatherLayer',
      type: 'raster',
      source: 'weatherLayer',
      paint: {
        'raster-opacity': 0,
        'raster-opacity-transition': { duration: 500 }
      }
    });
  }
  weatherLayerVisible = !weatherLayerVisible;
  map.setPaintProperty(
    layerId,
    'raster-opacity',
    weatherLayerVisible ? 1 : 0
  );
});

// use geo-location for map
export function navigateMap(geoLat, geoLon) {
  map.flyTo({
          center: [geoLon, geoLat],
          zoom: 15,
          speed: 1,
          curve: 1.2,
          pitch:74,
          bearing:12.8,
          hash:true
        });
  if (currentMarker){
    currentMarker.remove()
  }
  currentMarker = new mapboxgl.Marker()
    .setLngLat ([geoLon, geoLat])
    .addTo(map)
  
}