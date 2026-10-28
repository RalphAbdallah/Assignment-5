import './ForecastDay.css';

export default function ForecastDay({ label, high, low }) {
  return (
    <li className="day">
      <p className="dayName">{label}</p>
      <p className="high">{Math.round(high)}°</p>
      <p className="low">{Math.round(low)}°</p>
    </li>
  );
}
