const API_URL = "https://api.open-meteo.com/v1/forecast";

const $ = (id) => document.getElementById(id);

const weatherClasses = [
  "sunny",
  "mainlyclear",
  "partlycloudy",
  "cloudy",
  "drizzle",
  "rainy",
  "snowy",
  "thunderstorm",
];

function setWeather(type, description) {
  document.body.classList.remove(...weatherClasses);
  document.body.classList.add(type);

  $("weather-icon").src = `IMAGES/${type}.png`;
  $("weather-icon").alt = description;

  return description;
}

function getDescription(code) {
  if (code === 0) {
    return setWeather("sunny", "Sunny");
  }

  if (code === 1) {
    return setWeather("mainlyclear", "Mainly clear");
  }

  if (code === 2) {
    return setWeather("partlycloudy", "Partly cloudy");
  }

  if (code === 3) {
    return setWeather("cloudy", "Cloudy");
  }

  if (code === 45 || code === 48) {
    return setWeather("cloudy", "Foggy");
  }

  if (code >= 51 && code <= 57) {
    return setWeather("drizzle", "Drizzle");
  }

  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return setWeather("rainy", "Rainy");
  }

  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return setWeather("snowy", "Snowy");
  }

  if (code >= 95) {
    return setWeather("thunderstorm", "Thunderstorm");
  }

  return "Unknown";
}

function createWeatherUrl() {
  const [latitude, longitude] = $("county").value.split(",");

  const parameters = new URLSearchParams({
    latitude,
    longitude,
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "weather_code",
    ].join(","),
    daily: ["temperature_2m_max", "temperature_2m_min"].join(","),
    timezone: "auto",
    forecast_days: "1",
  });

  return `${API_URL}?${parameters}`;
}

async function updateWeather() {
  try {
    const response = await fetch(createWeatherUrl());

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const description = getDescription(data.current.weather_code);

    $("description-text").textContent = description;

    $("temperature").textContent =
      `${Math.round(data.current.temperature_2m)}°`;

    $("feels-like").textContent = `Feels like ${Math.round(
      data.current.apparent_temperature,
    )}°`;

    $("wind").textContent = `${data.current.wind_speed_10m} km/h`;

    $("humidity").textContent = `${data.current.relative_humidity_2m}%`;

    $("high").textContent = `${Math.round(data.daily.temperature_2m_max[0])}°`;

    $("low").textContent = `${Math.round(data.daily.temperature_2m_min[0])}°`;
  } catch (error) {
    console.error("Could not update weather:", error);
  }
}

$("county").addEventListener("change", updateWeather);

$("refresh-button").addEventListener("click", updateWeather);

updateWeather();

setInterval(updateWeather, 15 * 60 * 1000);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => {
        console.log("Service worker registered");
      })
      .catch((error) => {
        console.error("Service worker registration failed:", error);
      });
  });
}
