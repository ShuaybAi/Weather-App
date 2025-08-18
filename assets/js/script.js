export const apiKey = "a9ff67e576a8ebd062fbf714c9f65157";

// will need get these from site (input from search bar)
let cityName = "Bristol";
let countryCode = "GB";

// Geocoding API Call
/** Returns the lat and lon of a city */
export async function getLatLon() {
  try {
    const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`
    const response = await fetch(geoURL);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error('API failed');
    };
    const data = await response.json();
    let cityLat = data[0].lat;
    let cityLon = data[0].lon;
    return [cityLat, cityLon];
  } catch (err) {
    console.error('Error:', err);
  }

}

// Weather API Call
/** Returns weather data for 5 days */
async function getWeather(lat, lon) {
  try {
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherURL);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API error response:', errorData);
      throw new Error('API failed');
    };
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error:', err);
  }
}

/** Takes today from the 5 day forecast and returns an array of 4 arrays for the time of each forecast, 
 * the temp, the description, and the id for the rest of the day*/
function getHourlyWeather(data) {
  const today = new Date().toISOString().slice(0, 10);
  const time = [];
  const temps = [];
  const description = [];
  const weatherId = [];
  data.list.forEach(entry => {
    if (entry.dt_txt.split(" ")[0] === today) {
      time.push(entry.dt_txt.split(" ")[1]);
      temps.push(entry.main.temp);
      description.push(entry.weather[0].description);
      weatherId.push(entry.weather[0].id)
    }
  });
  return [time, temps, description, weatherId];
}

//main
/** Passes the lat and lon from getLatLon to getWeather, then the data from that to getHourlyWeather.
 * Logs the results for now.
 */
async function forecast() {
  const [lat, lon] = await getLatLon();
  const weatherData = await getWeather(lat, lon);
  const hourlyWeather = getHourlyWeather(weatherData);
  console.log(hourlyWeather);
  return hourlyWeather;
}

// need to call this with event listener for input to search bar
document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", function() {
    const locationInput = document.getElementById("locationInput");
    const location = locationInput.value;
    if (location) {
      // Split the location into city and country code
      const [city, country] = location.split(",").map(part => part.trim());
      cityName = city;
      countryCode = country;
      forecastArray = forecast();
    }
    
  });
});