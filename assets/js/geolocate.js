
const locate = document.getElementById("geolocate");
import { navigateMap } from "./map.js";

  locate.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLat = position.coords.latitude;
          const geoLon = position.coords.longitude;
          navigateMap(geoLat, geoLon)
        },
        (error) => {
          output.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      output.textContent = "Geolocation is not supported in this browser.";
    }
  });

