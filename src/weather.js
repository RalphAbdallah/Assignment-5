const GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const WX = 'https://api.open-meteo.com/v1/forecast';

const CONDITIONS = {
  0: { text: 'Clear sky', icon: '☀️' },
  1: { text: 'Mainly clear', icon: '🌤️' },
  2: { text: 'Partly cloudy', icon: '⛅' },
  3: { text: 'Overcast', icon: '☁️' },
  45: { text: 'Fog', icon: '🌫️' },
  48: { text: 'Freezing fog', icon: '🌫️' },
  51: { text: 'Light drizzle', icon: '🌦️' },
  53: { text: 'Drizzle', icon: '🌦️' },
  55: { text: 'Heavy drizzle', icon: '🌦️' },
  56: { text: 'Light freezing drizzle', icon: '🌧️' },
  57: { text: 'Freezing drizzle', icon: '🌧️' },
  61: { text: 'Light rain', icon: '🌧️' },
  63: { text: 'Rain', icon: '🌧️' },
  65: { text: 'Heavy rain', icon: '🌧️' },
  66: { text: 'Light freezing rain', icon: '🌧️' },
  67: { text: 'Freezing rain', icon: '🌧️' },
  71: { text: 'Light snow', icon: '🌨️' },
  73: { text: 'Snow', icon: '🌨️' },
  75: { text: 'Heavy snow', icon: '❄️' },
  77: { text: 'Snow grains', icon: '🌨️' },
  80: { text: 'Light showers', icon: '🌦️' },
  81: { text: 'Showers', icon: '🌧️' },
  82: { text: 'Heavy showers', icon: '🌧️' },
  85: { text: 'Snow showers', icon: '🌨️' },
  86: { text: 'Heavy snow showers', icon: '❄️' },
  95: { text: 'Thunderstorm', icon: '⛈️' },
  96: { text: 'Thunderstorm with hail', icon: '⛈️' },
  99: { text: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

export function describeWeather(code) {
  return CONDITIONS[code] || { text: 'Unknown conditions', icon: '🌡️' };
}

export function placeLabel(place) {
  const country = place.country || 'Unknown country';
  return place.admin1 ? `${country} (${place.admin1})` : country;
}

async function getJSON(url) {
  const response = await fetch(url);

  if (response.status === 429) {
    throw new Error('rate-limit');
  }
  if (!response.ok) {
    throw new Error('server-error');
  }
  return response.json();
}

export async function findPlaces(city) {
  const q = new URLSearchParams({ name: city, count: 5 });
  const geo = await getJSON(`${GEO}?${q}`);
  if (!geo.results?.length) throw new Error('not-found');

  return geo.results;
}

export async function loadWeather(place) {
  const { latitude, longitude, name, country, admin1 } = place;
  const p = new URLSearchParams({
    latitude,
    longitude,
    forecast_days: 3,
    timezone: 'auto',
    current: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min',
  });
  return { name, country, admin1, ...(await getJSON(`${WX}?${p}`)) };
}
