var API_KEY = '798c18bff02a45d1967181119240712';
var button = document.getElementById("search-button");
var inputField = document.getElementById("city");
const weather_info = document.querySelector(".info");

button.addEventListener("click", fetchWeatherInfo);

function fetchWeatherInfo() {
    const city = inputField.value.trim();
    if (city) {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => displayWeather(data)) // Display weather if no error
            .catch(error => {
                console.error("Error:", error);
                weather_info.innerHTML = '<p>Error, please try again.</p>';
            });
    } else {
        alert("Please Enter Your City Name");
    }
}

function displayWeather(data) {
    const cityname = document.getElementById("cityname");  // Corrected ID to match HTML
    const weathercond = document.getElementById("weather-condition");  // Corrected ID to match HTML
    const temp = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const windspeed = document.getElementById("wind-speed");

    // Update UI with fetched weather data
    cityname.textContent = `City: ${data.location.name}`;
    weathercond.textContent = `Condition: ${data.current.condition.text}`;
    temp.textContent = `Temperature: ${data.current.temp_c}°C`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windspeed.textContent = `Wind Speed: ${data.current.wind_kph} KPH`;
}

