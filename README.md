# Irish Weather

An installable, responsive weather application providing current conditions and daily forecasts for all 32 counties of Ireland.

[View Live Demo](https://Conormccarthy2.github.io/irish-weather/)

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![PWA](https://img.shields.io/badge/PWA-Installable-5A0FC8?logo=pwa)
![API](https://img.shields.io/badge/API-Open--Meteo-2196F3)
![Responsive](https://img.shields.io/badge/UI-Responsive-00C853)

## Overview

Irish Weather is a Progressive Web App built with vanilla JavaScript. Users can select any county in Ireland and receive current weather information based on its geographic coordinates.

The interface responds visually to the returned weather data, changing its background, icon and description to match current conditions.

## Features

- Coverage for all 32 counties of Ireland
- Current temperature and apparent temperature
- Humidity and wind speed
- Daily high and low temperatures
- Dynamic weather descriptions
- Condition-specific backgrounds and icons
- Manual and automatic weather refresh
- Responsive mobile-first layout
- Installable as a Progressive Web App
- Offline application shell
- Cached weather data fallback

## How it works

```text
County selection
       ↓
Latitude and longitude
       ↓
Open-Meteo Forecast API
       ↓
Weather-code interpretation
       ↓
Dynamic interface update
```

Each county option stores a latitude and longitude. When the selection changes, JavaScript builds a new API request and updates the interface without reloading the page.

## Weather states

The interface includes dedicated visual states for:

- Sunny
- Mainly clear
- Partly cloudy
- Cloudy
- Drizzle
- Rain
- Snow
- Thunderstorms

Each state controls the background, weather icon and condition description.

## PWA architecture

```text
Browser
 ├── Application files → Cache-first
 └── Weather requests → Network-first → Cached fallback
```

The application includes:

- A web app manifest
- 192px and 512px application icons
- A service worker
- Versioned static caches
- Network-first API requests
- Offline fallback behaviour
- Standalone display support

## Built with

- HTML
- CSS
- JavaScript
- Fetch API
- Cache API
- Service Workers
- Web App Manifest
- Open-Meteo Forecast API
- GitHub Pages

## Engineering highlights

This project demonstrates:

- Working with asynchronous APIs
- Transforming API responses into application state
- Dynamic DOM manipulation
- Data-driven UI design
- Error handling and network fallbacks
- Responsive interface development
- Progressive Web App architecture
- Offline caching strategies
- Deployment through GitHub Pages

## Run locally

Clone the repository:

```bash
git clone https://github.com/Conormccarthy2/irish-weather.git
cd irish-weather
```

Run the project with a local development server such as VS Code Live Server or Live Preview.

Service workers require HTTPS, `localhost` or `127.0.0.1` and will not work when `index.html` is opened directly through a `file://` address.

## Data source

Weather data is provided by the [Open-Meteo Forecast API](https://open-meteo.com/).

No API key is required.
