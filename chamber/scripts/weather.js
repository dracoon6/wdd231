// Weather API Integration - OpenWeatherMap
const weatherContainer = document.getElementById('weather-container');

const OPENWEATHERMAP_API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Free tier API key for demo
const TOOELE_LAT = 40.5503;
const TOOELE_LON = -112.2948;

// Load weather data from OpenWeatherMap API
async function loadWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${TOOELE_LAT}&lon=${TOOELE_LON}&appid=${OPENWEATHERMAP_API_KEY}&units=imperial`
        );
        
        if (!response.ok) {
            throw new Error('Weather data fetch failed');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error loading weather:', error);
        weatherContainer.innerHTML = '<p class="error">Unable to load weather data at this time.</p>';
    }
}

// Display weather information with current conditions and 3-day forecast
function displayWeather(data) {
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const icon = current.weather[0].icon;
    
    // Get forecast for next 3 days (every 8 forecasts = 24 hours)
    const forecast = [];
    for (let i = 0; i < 3; i++) {
        const forecastData = data.list[i * 8];
        if (forecastData) {
            forecast.push({
                date: new Date(forecastData.dt * 1000).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                }),
                high: Math.round(forecastData.main.temp_max),
                low: Math.round(forecastData.main.temp_min),
                description: forecastData.weather[0].description,
                icon: forecastData.weather[0].icon
            });
        }
    }
    
    let html = `
        <div class="weather-current">
            <h3>Current Conditions</h3>
            <div class="current-info">
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" width="80" height="80">
                <div class="current-details">
                    <p class="temperature">${temp}°F</p>
                    <p class="description">${description.charAt(0).toUpperCase() + description.slice(1)}</p>
                </div>
            </div>
        </div>
        
        <div class="weather-forecast">
            <h3>3-Day Forecast</h3>
            <div class="forecast-cards">
    `;
    
    forecast.forEach(day => {
        html += `
            <div class="forecast-card">
                <h4>${day.date}</h4>
                <img src="https://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}" width="50" height="50">
                <p class="temps"><span class="high">${day.high}°</span> / <span class="low">${day.low}°</span></p>
                <p class="desc">${day.description}</p>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    weatherContainer.innerHTML = html;
}

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', loadWeather);
