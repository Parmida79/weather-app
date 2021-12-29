//Date and Time
let now = new Date();
let hour = now.getHours();
if (hour < 10 && hour >= 0) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10 && minute >= 0) {
  minute = `0${minute}`;
}
let day = now.getDay();
day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = now.getDate();
let month = now.getMonth();
month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dateAndTime = document.querySelector("#dateAndTime");

let update = document.querySelector("#update");
update.innerHTML = `↻ Updated at ${hour}:${minute} on ${
  day[now.getDay()]
} ${date} ${month[now.getMonth()]}`;

//forecast
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecastReports = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecast = `<div class="row">`;
  forecastReports.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecast =
        forecast +
        `<div class="col-2">
            <ul>
              <li class="future-day">${formatDay(forecastDay.dt)}</li>
              <li><img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"></li>
              <li class="future-degree"><span class="high">${Math.round(
                forecastDay.temp.max
              )}°</span> | <span class="low">${Math.round(
          forecastDay.temp.min
        )}°</span></li>
            </ul>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecast;
}

function getForecast(coordinates) {
  let apiKey = "46fa9b2a7a670b1f86d7ab4f5f7ed552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// search engine
let apiKey = "46fa9b2a7a670b1f86d7ab4f5f7ed552";

function cities(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  city = city.trim().toLowerCase();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showWeather(weather) {

    let todayInfo = document.querySelector("#todayInfo");
    let todayState = `<div class="row">`;
    todayState =
      todayState +
      `
          <div class="col-2">
            <ul>
              <li><img class="today-icon" src="http://openweathermap.org/img/wn/${
                weather.data.weather[0].icon
              }@2x.png" id="todayIcon"></li>
            </ul>
          </div>
          <div class="col-4 column-2">
            <ul>
              <li><h1 class="city" id="cityName">${city}</h1></li>
              <li>Feels like: <span id="feelslike">${Math.round(
                weather.data.main.feels_like
              )}</span>ºC</li>
              <li class="current-state" id="description">${
                weather.data.weather[0].description
              }</li>
            </ul>
          </div>
          <div class="col-4 column-3">
            <ul>
              <li>
                <h2 class="current-weather"><strong class="current-temp" id="temp">${Math.round(
                  weather.data.main.temp
                )}</strong>
    <span class="unit">ºC</span></h2></li>
    <li><p class="high-low"><i class="fas fa-sort-up high"><span id="tempHigh">${Math.round(
      weather.data.main.temp_max
    )}</span>°c </i><br><i class="fas fa-sort-down low"><span id="tempLow">${Math.round(
        weather.data.main.temp_min
      )}</span>°c</i></p></li>
            </ul>
          </div>
          <div class="col-2">
            <ul class="column-4">
               <!-- <li>Precipitation: 40%</li> -->
                <li>Humidity: <span id="humidity">${
                  weather.data.main.humidity
                }</span>%</li>
                <li >Wind: <span id="wind">${Math.round(
                  weather.data.wind.speed
                )} </span> km/h</li>
            </ul>
          </div>`;

    todayInfo.innerHTML = todayState;

    let weatherState = document.getElementById("weatherApp");
    let state = weather.data.weather[0].main;
    if (state === "Snow") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("snowy");
    } else if (state === "Clear") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("clear-sky");
    } else if (state === "Clouds") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("clouds");
    } else if (state === "Thunderstorm") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("thunderstorm");
    } else if (state === "Drizzle" || state === "Rain") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("rainy");
    } else if (state === "Mist" || state === "Haze" || state === "Fog") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("haze");
    } else if (
      state === "Smoke" ||
      state === "Dust" ||
      state === "Sand" ||
      state === "Ash"
    ) {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("dust");
    } else if (state === "Squall") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("rainy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("tornado");
      weatherState.classList.add("stormy");
    } else if (state === "Tornado") {
      weatherState.classList.remove("base");
      weatherState.classList.remove("snowy");
      weatherState.classList.remove("clouds");
      weatherState.classList.remove("dust");
      weatherState.classList.remove("haze");
      weatherState.classList.remove("thunderstorm");
      weatherState.classList.remove("stormy");
      weatherState.classList.remove("clear-sky");
      weatherState.classList.remove("rainy");
      weatherState.classList.add("tornado");
    }
    getForecast(weather.data.coord); //for forecast
  }

  axios.get(apiUrlCity).then(showWeather);
}

let citySearch = document.getElementById("citySearch");
citySearch.addEventListener("submit", cities);

//longitude & latitude
function showCurrentLocation() {
  function showPosition(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;

    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    function showCurrentPosition(currentPosition) {

      let cityName = document.querySelector("#cityName");
      cityName.innerHTML = currentPosition.data.name;

      document.querySelector("#description").innerHTML =
        currentPosition.data.weather[0].description;
      document.querySelector("#feelslike").innerHTML = Math.round(
        currentPosition.data.main.feels_like
      );
      document.querySelector("#temp").innerHTML = Math.round(
        currentPosition.data.main.temp
      );
      document.querySelector("#tempHigh").innerHTML = Math.round(
        currentPosition.data.main.temp_max
      );
      document.querySelector("#tempLow").innerHTML = Math.round(
        currentPosition.data.main.temp_min
      );
      document.querySelector("#humidity").innerHTML =
        currentPosition.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(
        currentPosition.data.wind.speed
      );
      document
        .querySelector("#todayIcon")
        .setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${currentPosition.data.weather[0].icon}@2x.png`
        );

        getForecast(currentPosition.data.coord);
    }

    axios.get(apiUrlCurrent).then(showCurrentPosition);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);
