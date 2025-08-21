const toggle = document.getElementById("toggle");
const layerId = "weatherLayer";
export let currentMarker = null;

import { apiKey } from "./script.js";

import {clearRain} from "./background.js"

mapboxgl.accessToken =
	"pk.eyJ1IjoiYWVzb20iLCJhIjoiY21lZzEzdHM4MHVzdjJqc2Y4cGtrMzJseSJ9.7j6FIpAePZGj6gOidJ35Hw";

export const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/standard",
	projection: "globe",
	zoom: 1.2,
	center: [30, 15],
	scrollZoom: true,
	boxZoom: true,
});

map.addControl(new mapboxgl.NavigationControl());

// clear weather on map
map.on("style.load", () => {
	map.setConfigProperty ('basemap', 'lightPreset', 'dawn')
	clearRain()
	map.addSource("weatherLayer", {
		type: "raster",
		tiles: [
			`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
		],
		tileSize: 256,
		attribution: "Weather © OpenWeather",
	});
});

let weatherLayerVisible = false;

toggle.addEventListener("click", () => {
	if (!map.getLayer("weatherLayer")) {
		map.addLayer({
			id: "weatherLayer",
			type: "raster",
			source: "weatherLayer",
			paint: {
				"raster-opacity": 0,
				"raster-opacity-transition": { duration: 500 },
			},
		});
	}
	weatherLayerVisible = !weatherLayerVisible;
	map.setPaintProperty(
		layerId,
		"raster-opacity",
		weatherLayerVisible ? 1 : 0
	);
});
