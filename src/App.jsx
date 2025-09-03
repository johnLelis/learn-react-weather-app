import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Preferences from './components/Preferences';
import RecentSearches from './components/RecentSearches';
import WeatherDisplay from './components/WeatherDisplay';
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

  const handleOnClick = async () => {
    if (!search.trim()) {
      setWeather(null);
      setIsButtonClicked(false);
      return;
    }
    setSearchHistory(prevState =>
      prevState.includes(search) ? prevState : [search, ...prevState]
    );
    setIsLoading(true);
    setIsButtonClicked(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/current.json?q=${encodeURIComponent(
          search
        )}&key=${WEATHER_API_KEY}`
      );

      if (res?.status !== 200) {
        throw new Error('Failed to fetch weather.');
      }

      setWeather(res.data || []);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
      setErrorMessage('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setWeather(null);
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

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Weather Dashboard</h1>
        <p>Get real-time weather information for any city worldwide</p>
      </div>

      <div className="search-section">
        <input
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

      <RecentSearches searchHistory={searchHistory} />

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
          </>
        )
      )}

      {/* 
      <div className="weather-display" id="weatherDisplay">
        <div className="current-weather">
          <div className="content">
            <div className="location" id="currentLocation">
              London, UK
            </div>
            <div className="temperature" id="currentTemp">
              22°C
            </div>
            <div className="description" id="currentDesc">
              Partly Cloudy
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-label">Feels Like</div>
                <div className="detail-value" id="feelsLike">
                  25°C
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Humidity</div>
                <div className="detail-value" id="humidity">
                  65%
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Wind Speed</div>
                <div className="detail-value" id="windSpeed">
                  12 km/h
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Pressure</div>
                <div className="detail-value" id="pressure">
                  1013 hPa
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="forecast-section">
          <h3 className="forecast-title">5-Day Forecast</h3>
          <div className="forecast-grid" id="forecastGrid">
            <div className="forecast-item">
              <div className="forecast-day">Tomorrow</div>
              <div className="forecast-temp">24°C / 16°C</div>
              <div className="forecast-desc">Sunny</div>
            </div>
            <div className="forecast-item">
              <div className="forecast-day">Tuesday</div>
              <div className="forecast-temp">21°C / 14°C</div>
              <div className="forecast-desc">Rainy</div>
            </div>
            <div className="forecast-item">
              <div className="forecast-day">Wednesday</div>
              <div className="forecast-temp">26°C / 18°C</div>
              <div className="forecast-desc">Cloudy</div>
            </div>
            <div className="forecast-item">
              <div className="forecast-day">Thursday</div>
              <div className="forecast-temp">23°C / 15°C</div>
              <div className="forecast-desc">Partly Cloudy</div>
            </div>
            <div className="forecast-item">
              <div className="forecast-day">Friday</div>
              <div className="forecast-temp">28°C / 19°C</div>
              <div className="forecast-desc">Sunny</div>
            </div>
          </div>
        </div>
      </div>

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
