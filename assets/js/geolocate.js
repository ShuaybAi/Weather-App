
export const locate = document.getElementById("geolocate");

import { navigateMap } from "./map.js";
import { getWeather } from "./script.js";
import { geoWeather } from "./script.js";

  locate.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLat = position.coords.latitude;
          const geoLon = position.coords.longitude;
          navigateMap(geoLat, geoLon);
          getWeather(geoLat, geoLon);
          geoWeather()
        },
        (error) => {
          output.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      output.textContent = "Geolocation is not supported in this browser.";
    }
  });

