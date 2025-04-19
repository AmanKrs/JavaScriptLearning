document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("get-weather-btn");
  const displayCity = document.getElementById("city-name");
  const disTemp = document.getElementById("temperature");
  const disDescription = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");
  const WeatherInfo = document.getElementById("weather-info");

  const API_KEY = "ca71ec8e12394f810100ad8e0846b831";

  searchBtn.addEventListener("click", async () => {
    const cityName = cityInput.value.trim();

    if (!cityName) {
      errorMsg.innerText = "Please Enter city name";
      errorMsg.classList.remove("hidden");
      return;
    }
    errorMsg.classList.add("hidden");

    try {
      const weatherData = await getWeatherData(cityName);
      const weatherResult = await weatherData.json();
      if (!weatherData.ok) {
        throw new Error(weatherData);
      }

      displayWeatherData(weatherResult);
    } catch (error) {
      console.log(error);
      WeatherInfo.classList.add("hidden");
      errorMsg.classList.remove("hidden");
    }
  });

  async function getWeatherData(city) {
    try {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  function displayWeatherData(data) {
    WeatherInfo.classList.remove("hidden");
    displayCity.textContent = data.name;
    disTemp.textContent = `Temperature :  ${data.main.temp}  °C`;
    disDescription.textContent = `Weather :  ${data.weather[0].description}`;
  }
});
