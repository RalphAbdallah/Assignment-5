import ForecastDay from './ForecastDay.jsx';
import './Forecast.css';

function dayLabel(day, i) {
  if (i === 0) return 'Today';
  // "2026-10-29" alone is read as UTC; adding a time keeps it in local time.
  return new Date(`${day}T00:00`).toLocaleDateString('en-US', { weekday: 'short' });
}

export default function Forecast({ daily }) {
  return (
    <>
      <h3 className="forecastTitle">Next {daily.time.length} days</h3>
      <ul className="forecast">
        {daily.time.map((day, i) => (
          <ForecastDay
            key={day}
            label={dayLabel(day, i)}
            high={daily.temperature_2m_max[i]}
            low={daily.temperature_2m_min[i]}
          />
        ))}
      </ul>
    </>
  );
}
