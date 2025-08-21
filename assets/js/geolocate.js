const locate = document.getElementById("geolocate");
let resetButton = document.getElementById("reset")
let empty = null

// import { navigateMap } from "./map.js";

  locate.addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLat = position.coords.latitude;
          const geoLon = position.coords.longitude;
          // navigateMap(geoLat, geoLon);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoLat}&lon=${geoLon}`)
          .then(response => response.json())
        .then(data => {
            const address = data.address;
            const place = address.village || address.town || address.city || address.hamlet || address.county || "Unknown";
            document.getElementById("locationInput").placeholder = place + ", GB";
            document.getElementById("locationInput").value = place + ", GB"
            document.getElementById("searchButton").click()
            document.getElementById("locationInput").disabled = true;
            document.getElementById("searchButton").disabled = true;      
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

reset.addEventListener("click", () => {
      document.getElementById("locationInput").disabled = false;
      document.getElementById("searchButton").disabled = false;
      document.getElementById("locationInput").value = empty
      resetButton.classList.add("inv");
})
