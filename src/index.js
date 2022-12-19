function formatDay (timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];

}

function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  let days = ["Sun", "Mon", "Thu", "Wed"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <img class="card-icon" src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="">
                
                <p class="card-text">
                  <span class="maximum-temperature">
                    ${Math.round(forecastDay.temp.max)}°
                  </span>
                   <br>
                  <span class="minimum-temperature">
                     ${Math.round(forecastDay.temp.min)}°
                  </span>
                </p>
              </div>
            </div>
          </div>
  `;
              }
  });

  
  forecastElement.innerHTML = forecastHTML;
}

function getForecast (coordinates){
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiURL);
axios.get(apiURL).then(displayForecast);
}


function currentDayAndTime() {
  //Function to show current day and time
  let now = new Date();
  //What day is today
  let day = now.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = week[day];

  //What time is now
  let hour = now.getHours();
  let minutes = now.getUTCMinutes();
  //Adding "0" when there is one number for minutes display (f.e. "06" intstead "6")
  minutes = minutes.toString();
  let zeroMinutes = minutes.length;
  if (zeroMinutes === 1) {
    minutes = "0" + minutes;
  }
  let timeNow = hour + ":" + minutes;
  let currentDay = document.querySelector("#currentDay");
  currentDay.innerHTML = weekDay;
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = timeNow;
}

//Function shows temperature, wind speeed and humidity in current city
function showTemperature(responce) {
  celsiusTemperature = responce.data.main.temp;
  celsiusTemperature = Math.ceil(celsiusTemperature);
    
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${celsiusTemperature}`;
  let cityName = responce.data.name;
  let currentCityName = document.querySelector("#currentCity");
  currentCityName.innerHTML = cityName;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = responce.data.main.humidity;
  humidity.innerHTML = currentHumidity;
  let windSpeed = document.querySelector("#windSpeed");
  let currentWindSpeed = responce.data.wind.speed;
  windSpeed.innerHTML = Math.round(currentWindSpeed);
  let currentWeatherDescription = document.querySelector("#weatherDescription");
  let weatherDeccriptionAPI = responce.data.weather[0].description;
  currentWeatherDescription.innerHTML = weatherDeccriptionAPI;
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
  getForecast (responce.data.coord);  

}

//Function shows the name of city after user enters it in searching form
function userCity(event) {
  event.preventDefault();
  let userCity = document.querySelector("#userCity");
  let currentCity = userCity.value;
  let cityCheck = currentCity.trim();

  if (cityCheck === "") {
    alert("You didn't enter a city");
  } else {
    let city = document.querySelector("#currentCity");
    
    userCity.value = "";
    let apiKey = "f81614abe2395d5dfecd45b9298041de";    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCheck}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemperature);
  }
}

function searchCity() {
  //Adding EventListener for searching form
  let form = document.querySelector("#searchForm");
  form.addEventListener("submit", userCity);
  let searchButton = document.querySelector("#searchButton");
  searchButton.addEventListener("click", userCity);
}

//Function converts current temperature to Farenheit Degrees and displays it
function toFarenheitDegrees(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperatureFarenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureFarenheit = Math.ceil(temperatureFarenheit);
  temperatureElement.innerHTML = temperatureFarenheit;
  clickOnCelsius.classList.remove("active");
  clickOnFarenheit.classList.add("active");
  
}

//Function converts current temperature to Celsius Degrees and displays it
function toCelsiusDegrees(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  clickOnFarenheit.classList.remove("active");
  clickOnCelsius.classList.add("active");
  
}

//Function converts current temperature to Celsius or Farenheit Degrees
//after clicking on link and displays that temperature



//Function shows weather in Kharkiv  (city by default)
function defoultCityWeather() {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let city = document.querySelector("#currentCity");
  city = city.innerText;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showTemperature);
}

//Function for finding user geolocation
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//Function calls finding user geolocation after clicking on geolocation button
function userLocation (event) {
  event.preventDefault();  
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function geolocation () {
let locationButton = document.querySelector("#geolocationButton");
locationButton.addEventListener("click", userLocation);
}

let celsiusTemperature = null;

let currentTemperature = document.querySelector("#temperature");
let clickOnFarenheit = document.querySelector("#fTemperature");
clickOnFarenheit.addEventListener("click", toFarenheitDegrees);
let clickOnCelsius = document.querySelector("#cTemperature");
clickOnCelsius.addEventListener("click", toCelsiusDegrees);

//Method setInterval shows current time in real time without reloading the page
setInterval(currentDayAndTime);
//Calling function for searching form
searchCity();

defoultCityWeather();
geolocation();





 
/*


//Functions below change degrees to C or F using formulas

function toFarenheitDegrees(event) {
    event.preventDefault();

    let currentClass = document.querySelector(".celsius");
    console.log(currentClass);
    let className = currentClass.className;

    if (className === "celsius") {
        document.getElementById("temperature").classList = "farenheit";
      let temperatureElement = document.querySelector("#temperature");
      let temperature = temperatureElement.innerText;
      let temperatureFarenheit = (temperature * 9) / 5 + 32;
      temperatureFarenheit = Math.ceil(temperatureFarenheit);
      temperatureElement.innerHTML = temperatureFarenheit;
    }

  
  
}

function toCelsiusDegrees (event)
{
event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  
let currentClass = document.querySelector("#temperature");
console.log(currentClass);
let className = currentClass.className;
if (className !== "celsius"){
    document.getElementById("temperature").classList = "celsius";
    let temperatureElement = document.querySelector("#temperature");
    let temperature = temperatureElement.innerText;
    let temperatureCelsius = (temperature - 32) *5 / 9;
    temperatureCelsius = Math.ceil(temperatureCelsius);
    temperatureElement.innerHTML = temperatureCelsius;
    }

}
*/
