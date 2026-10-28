import { describeWeather, placeLabel } from '../weather.js';
import './WeatherCard.css';

export default function WeatherCard({ weather }) {
  const { current } = weather;
  const { text, icon } = describeWeather(current.weather_code);

  return (
    <div className="weatherCard">
      <h2>{weather.name}</h2>
      <p className="country">{placeLabel(weather)}</p>
      <div className="now">
        <p className="icon" aria-hidden="true">
          {icon}
        </p>
        <p className="temp">{Math.round(current.temperature_2m)}°C</p>
      </div>
      <p className="conditions">{text}</p>
      <div className="details">
        <p>Humidity {current.relative_humidity_2m}%</p>
        <p>Wind {current.wind_speed_10m} km/h</p>
      </div>
    </div>
  );
}
