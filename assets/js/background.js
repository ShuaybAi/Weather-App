// Capture body for background updates

import { map } from "./map.js";

let background = document.querySelector("body");

const weatherClasses = [
  "background-sun",
  "background-cloudy",
  "background-rain",
  "background-storm",
  "background-snow",
  "background-fog",
  "background-hot",
  "background-cold",
];

export function clearRain() {
  if (!map) return;
  try {
    map.setRain?.(undefined);
  } catch {}
  try {
    map.setSnow?.(undefined);
  } catch {}
  try {
    map.setFog?.({
      range: [0.5, 8],
      color: "#dbe9f4",
      "high-color": "#ffffff",
      "space-color": "#0b1026", 
      "horizon-blend": 0.3,
      "star-intensity": 0,
    });
  } catch {}
}

export function setBackground(weatherId) {
  const firstNum = weatherId.toString().split("")[0];

  background.classList.remove(...weatherClasses);

  if (weatherId === 800) {
    clearRain();
    background.classList.add("background-sun");
  } else if (weatherId > 800 && weatherId < 900) {
    background.classList.add("background-sun");
    clearRain();
  } else {
    switch (firstNum) {
      case "2": //storm
        background.classList.add("background-storm");
        map.setRain({
          density: 0.6, 
          intensity: 0.85,
          dropletSize: [2.5, 16], 
          opacity: 0.75, 
          color: "#a8adbc", 
          direction: [0, 85], 
          distortionStrength: 0.6, 
          vignette: 0.5, 
          vignetteColor: "#222222",
          centerThinning: 0.0, 
        });
        break;
      case "3": //drizzle
        background.classList.add("background-rain");
        map.setRain({
          density: 0.6, 
          intensity: 0.85, 
          dropletSize: [2.5, 16], 
          opacity: 0.75, 
          color: "#a8adbc", 
          direction: [0, 85], 
          distortionStrength: 0.6, 
          vignette: 0.5, 
          vignetteColor: "#222222",
          centerThinning: 0.0, 
        });
        break;
      case "5": //rain
        background.classList.add("background-rain");
        map.setRain({
          density: 0.6, 
          intensity: 0.85, 
          dropletSize: [2.5, 16],
          opacity: 0.75, 
          color: "#a8adbc", 
          direction: [0, 85],
          distortionStrength: 0.6, 
          vignette: 0.5, 
          vignetteColor: "#222222",
          centerThinning: 0.0, 
        });

        break;
      case "6": //snow
        background.classList.add("background-snow");
        map.setSnow({
          density: 0.8,
          intensity: 0.9,
          flakeSize: 0.65,
          opacity: 0.95,
          color: "#ffffff",
          direction: [0, 60],
          centerThinning: 0.05,
          vignette: 0.35,
          vignetteColor: "#000000",
        });
        break;
      case "7": //foggy/mist
        background.classList.add("background-fog");
        map.setFog({
          range: [0.5, 8], 
          color: "#dbe9f4", 
          "high-color": "#ffffff", 
          "space-color": "#000000", 
          "horizon-blend": 0.3, 
          "star-intensity": 0.0, 
        });
        break;
      case "9": //extreme
        background.classList.add("background-storm");
        map.setRain({
          density: 1.0, 
          intensity: 1.0, 
          dropletSize: [3.5, 22], 
          opacity: 0.9, 
          color: "#7a8499", 
          direction: [5, 88], 
          distortionStrength: 0.8, 
          vignette: 0.7, 
          vignetteColor: "#1a1a1a", 
          centerThinning: 0.0, 
        });
        break;
      default:
        background.classList.add("background-sun");
    }
  }
}
