
// OpenWeatherMap API key
const API_KEY = 'c31d73d20ef234cbc387752bbda7b478';

// Select DOM elements
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

// Fetch weather data
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.style.display = 'block';
    weatherResult.innerHTML = `<p>${error.message}</p>`;
  }
}

// Display weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherResult.style.display = 'block';
  weatherResult.innerHTML = `
    <h2>Weather in ${name}</h2>
    <p>Temperature: ${main.temp}°C</p>
    <p>Humidity: ${main.humidity}%</p>
    <p>Condition: ${weather[0].description}</p>
  `;
}

// Handle form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});
