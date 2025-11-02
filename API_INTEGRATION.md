# API Integration Research for Real-Time Data

This document outlines research on APIs for integrating real-time data into applications, focusing on NASA APIs for space data, weather APIs for Earth analogs, and simulation APIs. It explores ways to link to real data for parameters like oxygen levels, temperature, and others, or create realistic simulations.

## NASA APIs for Space Data

NASA provides various open APIs through api.nasa.gov, requiring an API key from api.data.gov. Key APIs relevant to space data include:

- **ISS Current Location**: Provides real-time position of the International Space Station (ISS). Endpoint: `https://api.nasa.gov/iss-now.json`. Returns latitude, longitude, and timestamp. Useful for position data, but not environmental parameters like oxygen or temperature inside the ISS (which are not publicly available).

- **Mars Weather Service**: Based on data from the InSight lander (mission ended December 2022). Provides historical and some real-time-like data on Mars surface conditions, including temperature, wind speed, pressure, and atmospheric opacity. Endpoint: `https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json`. Data includes:
  - Air temperature (min/max)
  - Wind speed and direction
  - Atmospheric pressure
  - No direct oxygen levels, as Mars atmosphere is ~95% CO2, but can infer low oxygen analogs.

- **Astronomy Picture of the Day (APOD)**: Daily images and data from space, not real-time environmental data.

- **Near Earth Object Web Service**: Data on asteroids and comets, including orbital parameters.

For oxygen and temperature in space contexts:
- Oxygen levels in space are not directly measurable via public APIs, as space is a vacuum. For planetary analogs, Mars data provides temperature extremes (-87°C to -5°C) and low-pressure environments.
- ISS data is limited to position; internal environmental data (e.g., air composition) is not public.

## Weather APIs for Earth Analogs

Weather APIs provide real-time Earth data that can serve as analogs for space conditions, such as temperature extremes, pressure, and air quality. These can simulate habitable vs. hostile environments.

- **OpenWeatherMap API**:
  - Endpoints: Current weather, forecasts, air pollution, solar irradiance.
  - Data includes: Temperature, humidity, pressure, wind, precipitation, UV index, air quality (PM2.5, PM10, CO, NO2, O3, SO2, NH3).
  - For oxygen analogs: Air quality data indicates pollutants, but oxygen is not directly measured (assumed ~21% in breathable air). Use for temperature simulations (e.g., extreme cold/hot as Mars analogs).
  - Free tier: 1,000 calls/day. Paid plans for more.
  - Example: `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`

- **National Weather Service (NWS) API**:
  - Endpoint: `https://api.weather.gov`
  - Data: Forecasts, alerts, observations including temperature, humidity, wind, pressure, precipitation.
  - For analogs: Temperature and pressure for simulating planetary conditions. No oxygen data.
  - Free, requires User-Agent header for identification.
  - Example: `https://api.weather.gov/points/39.7456,-97.0892` for grid forecasts.

- **AccuWeather API**:
  - Endpoints: Current conditions, forecasts, air quality, UV index.
  - Data: Temperature, humidity, wind, pressure, precipitation, air quality indices.
  - For analogs: Detailed weather for realistic simulations. Air quality for pollutant analogs (not oxygen).
  - Requires API key; free trial available.
  - Example: `https://dataservice.accuweather.com/currentconditions/v1/{locationKey}?apikey=YOUR_API_KEY`

These APIs can be used to fetch real-time temperature data as analogs for space temperatures (e.g., Earth's poles for cold Mars-like conditions).

## Simulation APIs

For creating realistic simulations when real data is unavailable:

- **No dedicated public simulation APIs found**, but weather APIs can be used to simulate environmental conditions.
- **NASA Climate Models**: Not directly API-accessible, but data from NASA's Earth science can be used. For example, GISS Model E for climate simulations.
- **Physics Simulation Libraries**: While not APIs, tools like NASA's OpenMCT or general simulation frameworks (e.g., via Python libraries like SimPy) can simulate oxygen depletion, temperature changes.
- **Custom Simulations**: Use fetched weather data to drive simulations. For oxygen: Simulate based on air quality data (e.g., high CO2 as low oxygen analog). For temperature: Use real-time weather to model heat loss in space-like vacuums.

## Ways to Link to Real Data for Oxygen, Temperature, etc.

- **Temperature**: Directly available from all weather APIs (NASA Mars data for extremes). Link via API calls to update UI in real-time.
- **Oxygen Levels**: Not directly available. Use air quality APIs for pollutants (e.g., CO2 levels as inverse oxygen indicator). For space analogs, simulate based on known compositions (e.g., Mars: ~0.13% O2).
- **Other Parameters** (e.g., pressure, wind): Available from weather and NASA APIs.
- **Integration Tips**:
  - Use JavaScript fetch() to call APIs and update DOM elements.
  - Handle CORS and API keys securely.
  - Cache data to avoid rate limits.
  - For simulations: Combine real data with algorithms (e.g., temperature drop over time in vacuum).

## Realistic Simulations

- **Using Weather Data**: Fetch current temperature and simulate space conditions (e.g., rapid cooling without atmosphere).
- **Mars Analogs**: Use Mars weather data for temperature and pressure simulations.
- **Oxygen Depletion**: Simulate based on closed-system models (e.g., exponential decay in a habitat).
- **Tools**: Integrate with libraries like Three.js for 3D visualizations or Chart.js for data graphs.
- **Fallback**: If APIs fail, use historical data or static simulations.

For implementation, refer to the project's script.js for API integration examples.