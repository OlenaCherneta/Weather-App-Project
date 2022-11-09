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
    `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`)

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
    let apiKey = "91e4be9d3f0ce62462b88df7804804ae";    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityCheck}&units=metric&appid=${apiKey}`;
    
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
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let city = document.querySelector("#currentCity");
  city = city.innerText;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showTemperature);
}

//Function for finding user geolocation
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
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
