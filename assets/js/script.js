// API Key
export const apiKey = "a9ff67e576a8ebd062fbf714c9f65157";

// background function
import { setBackground } from "./background.js";

// map config
import { map } from "./map.js";

let currentMarker = null;

// will need get these from site (input from search bar)
let cityName = "London";
let countryCode = "GB";

// this will change based on which button (hourly/daily) is pressed
let forecastType = "hourly";

// Get references to DOM elements
const hourlyButton = document.getElementById("hourlyButton");
const dailyButton = document.getElementById("dailyButton");
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const forecastSection = document.getElementById("forecast");
const forecastContainer = document.getElementById("forecastCardsContainer");
const todaysWeatherContainer = document.getElementById("weatherCardContainer");
const tempCard = document.getElementById("tempCard");
const btnScrollToTop = document.getElementById("btnScrollToTop");

//Show warning if API not responding
function apiWarning() {
	const weatherCardDiv = document.querySelector("#weatherCardContainer");
	weatherCardDiv.innerHTML = `<div class="card">
            <div class="card-body text-center">
              <h5>We're sorry, the weather cannot be fetched at the moment. Please try again later.</h5>
            </div>
          </div>`;
}

//set images for weather cards
function setCardImages(weatherId) {
	const firstNum = weatherId.toString().split("")[0];
	if (weatherId === 800) {
		return "assets/images/sunny.webp"; //sunny/clear
	} else if (weatherId > 800 && weatherId < 900) {
		return "assets/images/sun&cloud.webp"; //cloudy
	} else {
		switch (firstNum) {
			case "2": //thunderstorm
				return "assets/images/thunderstorm.webp";
				break;
			case "3": //drizzle
				return "assets/images/drizzle.webp";
				break;
			case "5": //rain
				return "assets/images/rain.webp";
				break;
			case "6": //snow
				return "assets/images/snow.webp";
				break;
			case "7": //foggy/mist
				return "assets/images/fog.webp";
				break;
			case "9": //extreme
				return "assets/images/extreme.webp";
				break;
			default:
				return "assets/images/sunny.webp";
		}
	}
}

//get day of the week for cards
function getDayOfWeek(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-GB", { weekday: "long" });
}

// Geocoding API Call
/** Returns the lat and lon of a city */
export async function getLatLon() {
	try {
		const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`;
		const response = await fetch(geoURL);
		if (!response.ok) {
			const errorData = await response.json();
			console.error("API error response:", errorData);
			throw new Error("API failed");
		}
		const data = await response.json();
		let cityLat = data[0].lat;
		let cityLon = data[0].lon;
		return [cityLat, cityLon];
	} catch (err) {
		console.error("Error:", err);
		apiWarning();
	}
}

// Weather API Call
/** Returns weather data for 5 days */
export async function getWeather(lat, lon) {
	try {
		const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
		const response = await fetch(weatherURL);
		if (!response.ok) {
			const errorData = await response.json();
			console.error("API error response:", errorData);
			throw new Error("API failed");
		}
		const data = await response.json();
		map.flyTo({
			center: [lon, lat],
			zoom: 15,
			speed: 1,
			curve: 1.2,
			pitch: 74,
			bearing: 12.8,
			hash: true,
		});
		if (currentMarker) {
			currentMarker.remove();
		}
		currentMarker = new mapboxgl.Marker().setLngLat([lon, lat]).addTo(map);
		return data;
	} catch (err) {
		console.error("Error:", err);
		apiWarning();
	}
}

/** Takes today from the 5 day forecast and returns an array of 4 arrays for the time of each forecast,
 * the temp, the description, and the id for the rest of the day*/
function getHourlyWeather(data) {
	const today = new Date().toISOString().slice(0, 10);
	const hourlyArray = [];
	data.list.forEach((entry) => {
		if (entry.dt_txt.split(" ")[0] === today) {
			hourlyArray.push({
				time: entry.dt_txt.split(" ")[1],
				temp: entry.main.temp,
				description: entry.weather[0].description,
				weatherId: entry.weather[0].id,
			});
		}
	});
	return hourlyArray;
}

/** Takes the weather from 12:00:00 each day of the forecast and returns an array of 4 arrays for the date of each forecast,
 * the temp, the description, and the id* */
function getWeeklyWeather(data) {
	const today = new Date().toISOString().slice(0, 10);
	const weeklyArray = [];
	// First object = today's weather at the time of the call
	weeklyArray.push({
		date: data.list[0].dt_txt.split(" ")[0],
		temp: data.list[0].main.temp,
		description: data.list[0].weather[0].description,
		weatherId: data.list[0].weather[0].id,
	});

	// then next weeks weather at 12:00
	data.list.forEach((entry) => {
		const [entryDate, entryTime] = entry.dt_txt.split(" ");
		if (entryDate !== today && entryTime === "12:00:00") {
			weeklyArray.push({
				date: entry.dt_txt.split(" ")[0],
				temp: entry.main.temp,
				description: entry.weather[0].description,
				weatherId: entry.weather[0].id,
			});
		}
	});
	return weeklyArray;
}

// Main

// Passes the lat and lon from getLatLon to getWeather, then the data from that to getHourlyWeather/weeklyWeather. Logs the results for now.
async function hourlyForecast() {
	const [lat, lon] = await getLatLon();
	const weatherData = await getWeather(lat, lon);
	const hourlyWeather = getHourlyWeather(weatherData);
	console.log(hourlyWeather);
	return hourlyWeather;
}

async function dailyForecast() {
	const [lat, lon] = await getLatLon();
	const weatherData = await getWeather(lat, lon);
	const dailyWeather = getWeeklyWeather(weatherData);
	console.log(dailyWeather);
	return dailyWeather;
}

// Event Listeners

document.addEventListener("DOMContentLoaded", function () {

	hourlyButton.addEventListener("click", async function () {
		forecastType = "hourly";
		await showForecast();
		// go to forecast section
		forecastSection.scrollIntoView({ alignToTop: false, behavior: "smooth" });
	});

	dailyButton.addEventListener("click", async function () {
		forecastType = "daily";
		await showForecast();
		// go to forecast section
		forecastSection.scrollIntoView({ alignToTop: false, behavior: "smooth" });
	});

	// Default to previous search location, or London on site load
	const savedLocation = localStorage.getItem("savedInput");
	if (savedLocation) {
		locationInput.value = savedLocation;
        showWeather();
        locationInput.value = "";
        locationInput.placeholder = savedLocation;
	} else {
		locationInput.value = "London, GB";
        showWeather();
        locationInput.value = "";
        locationInput.placeholder = "London, GB";
	}

    // Focus the input field on page load
    locationInput.focus();

	// Search with dropdown
	const dropdown = document.createElement("ul");
	dropdown.className = "suggestions";
	locationInput.parentNode.appendChild(dropdown);

	locationInput.addEventListener("input", async function () {
		const query = locationInput.value.trim();
		dropdown.innerHTML = ""; // Clear previous suggestions
		if (query.length < 3) return; // Only search if input is long enough

		const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`;
		const response = await fetch(geoURL);
		if (!response.ok) return;
		const results = await response.json();

		results.forEach((place) => {
			const listItem = document.createElement("li");
			listItem.textContent = `${place.name}, ${place.country}`;
			listItem.addEventListener("click", () => {
				locationInput.value = `${place.name}, ${place.country}`;
				cityName = place.name;
				countryCode = place.country;
				dropdown.innerHTML = "";
			});
			dropdown.appendChild(listItem);
		});
	});

	searchButton.addEventListener("click", showWeather);

	async function showWeather() {
		const location = locationInput.value;
		localStorage.setItem("savedInput", location);
		if (location) {
			const [city, country] = location
				.split(",")
				.map((part) => part.trim());
			cityName = city;
			countryCode = country;
			let daily = await dailyForecast();

			const cardImage = setCardImages(daily[0].weatherId);
			
            setBackground(daily[0].weatherId);
            
			todaysWeatherContainer.innerHTML = `
                <div class="card">
                <img class="card-img-top" src="${cardImage}" alt="Weather icon">
                <div class="card-body">
                    <p>Description: ${daily[0].description}</p>
                    <p>Temperature: ${daily[0].temp}°</p>
                </div>
                </div>`;

			// add todays weather as a card on the map
			if (tempCard) {
				tempCard.classList.remove("inv");
				tempCard.innerHTML = "";
				const p = document.createElement("p");
				p.innerText = `${daily[0].temp}°C`;
				tempCard.appendChild(p);

				showForecast();
			}
		}
	}

	async function showForecast() {
		forecastContainer.innerHTML = "";
		dropdown.innerHTML = ""; // Clear previous suggestions

		if (forecastType === "hourly") {
			let hourlyWeather = await hourlyForecast();
			hourlyWeather.forEach((hour) => {
				const cardImage = setCardImages(hour.weatherId);
				const time = hour.time.split(":").slice(0, 2).join(":");
				forecastContainer.innerHTML += `
                    <div class="card">
                        <img class="card-img-top" src="${cardImage}" alt="Weather icon">
                        <div class="card-body">
                        <h3 class="h5">${time}</h3>
                        <p>${hour.description}</p>
                        <p>${hour.temp}°</p>
                        </div>
                    </div>`;
			});
		} else {
			let dailyWeather = await dailyForecast();
			dailyWeather.forEach((day) => {
				const cardImage = setCardImages(day.weatherId);
				const dayOfWeek = getDayOfWeek(day.date);
				const formattedDate = day.date.split("-").reverse().join("-");
				forecastContainer.innerHTML += `
                    <div class="card">
                        <img class="card-img-top" src="${cardImage}" alt="Weather icon">
                        <div class="card-body">
                        <h3 class="h5">${dayOfWeek}</h3>
                        <p>${formattedDate}<p>
                        <p>${day.description}</p>
                        <p>${day.temp}°</p>
                        </div>
                    </div>`;
			});
		}
	}

	locationInput.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			e.preventDefault();
			showWeather();
		}
	});

	// Scroll to top button functionality
	btnScrollToTop.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	});
});
