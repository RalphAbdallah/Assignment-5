import { placeLabel } from '../weather.js';
import './PlacePicker.css';

export default function PlacePicker({ places, selected, onSelect, disabled }) {
  return (
    <div className="placePicker">
      <label htmlFor="placeSelect">Country</label>
      <select
        id="placeSelect"
        value={selected}
        onChange={(e) => onSelect(Number(e.target.value))}
        disabled={disabled}
      >
        {places.map((place, i) => (
          <option key={place.id} value={i}>
            {placeLabel(place)}
          </option>
        ))}
      </select>
    </div>
  );
}
