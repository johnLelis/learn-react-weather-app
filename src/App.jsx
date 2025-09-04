import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Preferences from './components/Preferences';
import RecentSearches from './components/RecentSearches';
import WeatherDisplay from './components/WeatherDisplay';
import dayjs from 'dayjs';
import Forecast from './components/Forecast';
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE_URL = 'https://api.weatherapi.com/v1/';
const App = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  // const [searchRecent, setSearchRecent] = useState(null);

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
          aqi: 'no',
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
  };

  useEffect(() => {
    if (!search.trim()) {
      setIsButtonClicked(false);
      setErrorMessage(null);
    }
  }, [search]);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const userOptions = [
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
      label: 'Theme',
      controlId: 'theme',
      options: [
        { value: 'light', placeholder: 'Light' },
        { value: 'dark', placeholder: 'Dark' },
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

  return (
    <div className="dashboard">
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

      <RecentSearches
        searchHistory={searchHistory}
        onRecentSearchClick={handleRecentSearchClick}
      />

      <div className={`error-message ${!errorMessage && 'hidden'}`}>
        {errorMessage}
      </div>

      {isButtonClicked && isLoading ? (
        <div className="spinner"></div>
      ) : (
        weather && (
          <>
            <WeatherDisplay
              weather={weather}
              prefferedTemperatureUnit={prefferedTemperatureUnit}
            />

            <Forecast
              weather={weather}
              prefferedTemperatureUnit={prefferedTemperatureUnit}
            />
          </>
        )
      )}

      {/* 
      
      <div className="calculations-section">
        <h3 className="calculations-title">Weather Calculations</h3>
        <div className="calculations-grid">
          <div className="calculation-item">
            <div className="calc-label">Heat Index</div>
            <div className="calc-value" id="heatIndex">
              26°C
            </div>
          </div>
          <div className="calculation-item">
            <div className="calc-label">Dew Point</div>
            <div className="calc-value" id="dewPoint">
              18°C
            </div>
          </div>
          <div className="calculation-item">
            <div className="calc-label">Wind Chill</div>
            <div className="calc-value" id="windChill">
              20°C
            </div>
          </div>
          <div className="calculation-item">
            <div className="calc-label">UV Index</div>
            <div className="calc-value" id="uvIndex">
              Moderate (5)
            </div>
          </div>
          <div className="calculation-item">
            <div className="calc-label">Air Quality</div>
            <div className="calc-value" id="airQuality">
              Good (42)
            </div>
          </div>
          <div className="calculation-item">
            <div className="calc-label">Visibility</div>
            <div className="calc-value" id="visibility">
              10 km
            </div>
          </div>
        </div>
      </div>

      <div className="empty-state hidden" id="emptyState">
        <h3>Welcome to Weather Dashboard</h3>
        <p>
          Search for a city to get started with real-time weather information
        </p>
      </div> */}
    </div>
  );
};

export default App;
