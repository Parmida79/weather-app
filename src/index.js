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

// search engine
let apiKey = "46fa9b2a7a670b1f86d7ab4f5f7ed552";

function cities(event) {
  event.preventDefault();
  let cityName = document.querySelector("#cityName");
  let city = document.querySelector("#city").value;
  city = city.trim().toLowerCase();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  cityName.innerHTML = city;

  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function showWeather(weather) {
    console.log(weather.data); //ignore it

    document.querySelector("#description").innerHTML =
      weather.data.weather[0].description;
    document.querySelector("#feelslike").innerHTML = Math.round(
      weather.data.main.feels_like
    );
    document.querySelector("#temp").innerHTML = Math.round(
      weather.data.main.temp
    );
    document.querySelector("#tempHigh").innerHTML = Math.round(
      weather.data.main.temp_max
    );
    document.querySelector("#tempLow").innerHTML = Math.round(
      weather.data.main.temp_min
    );
    document.querySelector("#humidity").innerHTML = weather.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      weather.data.wind.speed
    );
    document
      .querySelector("#todayIcon")
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`
      );

    let weatherState =
      document.getElementById("weatherApp").style.backgroundImage;
    let state = weather.data.weather[0].main;

    if (state === "Snow") {
      weatherState.url = "images/snowy.jpg";
    } else if (state === "Clear") {
      weatherState.url = "images/clear-sky.jpg";
    } else if (state === "Clouds") {
      weatherState.url = "images/clouds.jpg";
    } else if (state === "Thunderstorm") {
      weatherState.url = "images/thunderstorm.jpg";
    } else if (state === "Drizzle" || state === "Rain") {
      weatherState.url = "images/rainy.jpg";
    } else if (state === "Mist" || state === "Haze" || state === "Fog") {
      weatherState.url = "images/haze-fog-mist.jpg";
    } else if (
      state === "Smoke" ||
      state === "Dust" ||
      state === "Sand" ||
      state === "Ash"
    ) {
      weatherState.url = "images/dust-ash-sand-smoke.jpg";
    } else if (state === "Squall") {
      weatherState.url = "images/stormy.JPG";
    } else if (state === "Tornado") {
      weatherState.url = "images/tornado.jpg";
    }
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
      console.log(currentPosition); //ignore it

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
    }

    axios.get(apiUrlCurrent).then(showCurrentPosition);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", showCurrentLocation);
