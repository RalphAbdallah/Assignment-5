import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, disabled }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setText(e.target.value);
    if (error) setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    const city = text.trim();

    if (city === '') {
      setError('Type a city name first.');
      return;
    }
    onSearch(city);
  }

  return (
    <form className="searchForm" onSubmit={handleSubmit} noValidate>
      <label htmlFor="cityInput">City</label>
      <div className="inputRow">
        <input
          type="text"
          id="cityInput"
          placeholder="e.g. Beirut"
          value={text}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? 'cityError' : undefined}
        />
        <button type="submit" className="button" disabled={disabled}>
          Search
        </button>
      </div>
      {error && (
        <p id="cityError" className="fieldError">
          {error}
        </p>
      )}
    </form>
  );
}
