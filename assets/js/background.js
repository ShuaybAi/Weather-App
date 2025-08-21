// Capture body for background updates

let background = document.querySelector("body");

const weatherClasses = ["background-sun", "background-rain"];

export function setBackground(weatherId) {
	const firstNum = weatherId.toString().split("")[0];

	background.classList.remove(...weatherClasses);

	if (weatherId === 800) {
		background.classList.add("background-sun");
	} else if (weatherId > 800 && weatherId < 900) {
		background.classList.add("background-sun");
	} else {
		switch (firstNum) {
			case "2": //thunderstorm
				background.classList.add("background-rain");
				break;
			case "3": //drizzle
				background.classList.add("background-rain");
				break;
			case "5": //rain
				background.classList.add("background-rain");
				break;
			case "6": //snow
				background.classList.add("background-rain");
				break;
			case "7": //foggy/mist
				background.classList.add("background-rain");
				break;
			case "9": //extreme
				background.classList.add("background-rain");
				break;
			default:
				background.classList.add("background-sun");
		}
	}
}
