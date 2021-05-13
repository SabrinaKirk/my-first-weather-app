let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h3 = document.querySelector("#current-date");
h3.innerHTML = `${day}, ${hours}:${minutes}`;

//Change City + Temperature

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-degree").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}Km/h`;
  document.querySelector("#highestTemperature").innerHTML = `H: ${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#lowestTemperature").innerHTML = `T: ${Math.round(
    response.data.main.temp_min
  )}°`;
}

function showCity(event) {
  event.preventDefault();
  let apiKey = "08b4017a3f6ff3e926ba01dc29bd33b6";
  let city = document.querySelector("#inputCity").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let h1 = document.querySelector("#current-city");

let citySearch = document.querySelector("#city-form");
citySearch.addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = "08b4017a3f6ff3e926ba01dc29bd33b6";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
