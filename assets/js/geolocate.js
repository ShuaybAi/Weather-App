const locate = document.getElementById("geolocate");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("reset");
let empty = null;

import { navigateMap } from "./map.js";

import {} from "./script.js"

  locate.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLat = position.coords.latitude;
          const geoLon = position.coords.longitude;
          navigateMap(geoLat, geoLon);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoLat}&lon=${geoLon}`)
          .then(response => response.json())
        .then(data => {
            const address = data.address;
            const place = address.village || address.town || address.city || address.hamlet || address.county || "Unknown";
            locationInput.placeholder = place + ", GB";
            locationInput.value = place + ", GB";
            searchButton.click();
            locationInput.disabled = true;
            searchButton.disabled = true;
            resetButton.classList.remove("inv");
        })
           
      },
        (error) => {
          output.textContent = `Error: ${error.message}`;
        }
      );
    } else {
      output.textContent = "Geolocation is not supported in this browser.";
    }
  });


  //  reset button functionality

resetButton.addEventListener("click", () => {
      locationInput.disabled = false;
      searchButton.disabled = false;
      locationInput.value = empty;
      resetButton.classList.add("inv");
})
