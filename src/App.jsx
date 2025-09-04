import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Preferences from './components/Preferences';
import RecentSearches from './components/RecentSearches';
import WeatherDisplay from './components/WeatherDisplay';
import dayjs from 'dayjs';
import Forecast from './components/Forecast';
import WeatherCalculations from './components/WeatherCalculations';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.weatherapi.com/v1/';
const App = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = e => {
    return setSearch(e.target.value);
  };

  const fetchWeatherData = async searchTerm => {
    if (!searchTerm.trim()) {
      setWeather(null);
      setIsButtonClicked(false);
      return;
    }

    setSearchHistory(prevState =>
      prevState.includes(searchTerm) ? prevState : [searchTerm, ...prevState]
    );
    setIsLoading(true);
    setIsButtonClicked(true);

    try {
      const fetchWeather = await axios.get(`${API_BASE_URL}/forecast.json`, {
        params: {
          q: searchTerm,
          days: 6,
          key: WEATHER_API_KEY,
          aqi: 'yes',
          hour: 24,
        },
      });

      if (fetchWeather?.status !== 200) {
        throw new Error('Failed to fetch weather.');
      }

      setWeather(fetchWeather.data || []);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
      setErrorMessage('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnClick = async () => {
    await fetchWeatherData(search);
  };

  const handleRecentSearchClick = async searchTerm => {
    setSearch(searchTerm);
    await fetchWeatherData(searchTerm);
    setTimeout(() => {
      recentSearchRef.current?.scrollIntoView({ behavior: 'smooth' });
      recentSearchRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    if (!search.trim()) {
      setIsButtonClicked(false);
      setErrorMessage(null);
    }
  }, [search]);

  const inputRef = useRef(null);
  const recentSearchRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const userOptions = [
    {
      label: 'Theme',
      controlId: 'theme',
      options: [
        { value: 'light', placeholder: 'Light' },
        { value: 'dark', placeholder: 'Dark' },
      ],
    },
    {
      label: 'Temperature',
      controlId: 'tempUnit',
      options: [
        { value: 'celcius', placeholder: 'Celsius (°C)' },
        { value: 'fahrenheit', placeholder: 'Fahrenheit (°F)' },
        { value: 'kelvin', placeholder: 'Kelvin (K)' },
      ],
    },
    {
      label: 'Auto Refresh',
      controlId: 'autoRefresh',
      options: [
        { value: 'off', placeholder: 'Off' },
        { value: '5', placeholder: '5 minutes' },
        { value: '15', placeholder: '15 minutes' },
        { value: '30', placeholder: '30 minutes' },
      ],
    },
  ];

  const [preferences, setPreferences] = useState({
    tempUnit: 'celcius',
    theme: 'light',
    autoRefresh: 'off',
  });

  const prefferedTemperatureUnit = preferences.tempUnit;

  const handlePreferenceChange = (controlId, value) => {
    setPreferences(prev => ({
      ...prev,
      [controlId]: value,
    }));
  };

  const today = dayjs().format('dddd, MMM DD YYYY');

  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    // Clear any existing interval
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }

    const minutes = parseInt(preferences.autoRefresh, 10);
    const isValidInterval = !isNaN(minutes) && minutes > 0;

    if (isValidInterval && weather && search.trim()) {
      refreshIntervalRef.current = setInterval(() => {
        console.log(`Auto-refreshing weather for "${search}"`);
        fetchWeatherData(search);
      }, minutes * 60 * 1000);

      recentSearchRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    // Cleanup on unmount
    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [preferences.autoRefresh, weather, search]);

  return (
    <div className={`dashboard ${preferences.theme === 'dark' && 'dark-mode'}`}>
      <p className="date">{today}</p>
      <div className="header">
        <h1>Weather Dashboard</h1>
        <p>Get real-time weather information for any city worldwide</p>
      </div>

      <div className="search-section">
        <input
          name="search"
          type="text"
          className="search-input"
          placeholder="Enter city name..."
          value={search}
          onChange={handleSearch}
          ref={inputRef}
          onKeyDown={e => {
            if (e.key === 'Enter') handleOnClick();
          }}
        />
        <button
          className="search-btn"
          id="searchBtn"
          onClick={handleOnClick}
          disabled={!search.trim()}
        >
          <span className="btn-text">Search Weather</span>
        </button>
      </div>

      <div className="preferences">
        {userOptions.map(({ label, controlId, options }, index) => (
          <Preferences
            key={`${index}-${label}`}
            label={label}
            options={options}
            controlId={controlId}
            preferenceValue={preferences[controlId]}
            onChange={handlePreferenceChange}
          />
        ))}
      </div>
      {searchHistory.length > 0 && (
        <div ref={recentSearchRef}>
          <RecentSearches
            searchHistory={searchHistory}
            onRecentSearchClick={handleRecentSearchClick}
          />
        </div>
      )}

      <div className={`error-message ${!errorMessage && 'hidden'}`}>
        {errorMessage}
      </div>

      {isButtonClicked && isLoading ? (
        <div className="spinner"></div>
      ) : (
        weather && (
          <>
            <div className="weather-display" id="weatherDisplay">
              <WeatherDisplay
                weather={weather}
                tempUnit={prefferedTemperatureUnit}
              />

              <Forecast weather={weather} tempUnit={prefferedTemperatureUnit} />
            </div>
            <WeatherCalculations
              weather={weather}
              tempUnit={prefferedTemperatureUnit}
            />
          </>
        )
      )}
    </div>
  );
};

export default App;
