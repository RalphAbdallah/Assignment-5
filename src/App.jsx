import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import PlacePicker from './components/PlacePicker.jsx';
import StatusBox from './components/StatusBox.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import Forecast from './components/Forecast.jsx';
import { findPlaces, loadWeather, placeLabel } from './weather.js';

function errorMessage(err) {
  if (err.message === 'rate-limit') {
    return 'Too many requests. Wait a minute, then press Retry.';
  }
  if (err.message === 'server-error') {
    return 'The weather service is having problems right now. Try again in a moment.';
  }
  return "Couldn't reach the weather server. Check your connection and try again.";
}

export default function App() {
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeIndex, setPlaceIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  // Bumped by Search and Retry so the same city can be fetched again.
  const [attempt, setAttempt] = useState(0);

  const place = places[placeIndex];
  const isLoading = status === 'loading';

  // 1. Find the places that match the searched city.
  useEffect(() => {
    if (city === '') return;
    let ignore = false;

    async function search() {
      try {
        const found = await findPlaces(city);
        if (!ignore) setPlaces(found);
      } catch (err) {
        if (ignore) return;
        if (err.message === 'not-found') {
          setStatus('not-found');
        } else {
          setError(errorMessage(err));
          setStatus('error');
        }
      }
    }

    search();
    return () => {
      ignore = true;
    };
  }, [city, attempt]);

  // 2. Load the weather whenever the chosen place changes.
  useEffect(() => {
    if (!place) return;
    let ignore = false;

    async function load() {
      try {
        const data = await loadWeather(place);
        if (!ignore) {
          setWeather(data);
          setStatus('ready');
        }
      } catch (err) {
        if (!ignore) {
          setError(errorMessage(err));
          setStatus('error');
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [place]);

  function handleSearch(newCity) {
    setCity(newCity);
    setPlaces([]);
    setPlaceIndex(0);
    setAttempt((a) => a + 1);
    setStatus('loading');
  }

  function handleSelectPlace(index) {
    setPlaceIndex(index);
    setStatus('loading');
  }

  function handleRetry() {
    setAttempt((a) => a + 1);
    setStatus('loading');
  }

  const loadingText = place
    ? `Loading ${place.name}, ${placeLabel(place)}…`
    : `Finding ${city}…`;

  return (
    <main className="app">
      <h1>Weather</h1>

      <SearchBar onSearch={handleSearch} disabled={isLoading} />
      {places.length > 1 && (
        <PlacePicker
          places={places}
          selected={placeIndex}
          onSelect={handleSelectPlace}
          disabled={isLoading}
        />
      )}

      {status === 'idle' && (
        <StatusBox>
          <p className="statusText">Search for a city to see its weather.</p>
        </StatusBox>
      )}
      {status === 'loading' && <LoadingSpinner message={loadingText} />}
      {status === 'not-found' && (
        <ErrorMessage
          message={`City not found. Check the spelling of "${city}" and search again.`}
        />
      )}
      {status === 'error' && <ErrorMessage message={error} onRetry={handleRetry} />}
      {status === 'ready' && (
        <section className="result">
          <WeatherCard weather={weather} />
          <Forecast daily={weather.daily} />
        </section>
      )}
    </main>
  );
}
