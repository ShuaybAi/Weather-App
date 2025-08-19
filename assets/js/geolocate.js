const locate = (document.getElementById = "geolocate");

locate.addEventListener("click,", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        return latitude, longitude;
      },
      (error) => {
        output.textContent = `Error: ${error.message}`;
      }
    );
  } else {
    output.textContent = "Geolocation is not supported in this browser.";
  }
});
