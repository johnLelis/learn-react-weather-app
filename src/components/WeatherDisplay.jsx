import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import {
  getTemperatureUnit,
  convertTemperature,
} from '../utils/temperatureUtils';
const WeatherDisplay = ({
  weather: { location, current },
  prefferedTemperatureUnit,
}) => {
  const temperatureInCelsius = current?.temp_c;
  const temperatureUnit = getTemperatureUnit(prefferedTemperatureUnit);

  const convertedTemperature = convertTemperature(
    temperatureInCelsius,
    prefferedTemperatureUnit,
    2
  );
  const temperature = `${convertedTemperature} ${temperatureUnit}`;
  const feelsLikeInCelcius = current?.feelslike_c;
  const convertedFeelsLike = convertTemperature(
    feelsLikeInCelcius,
    prefferedTemperatureUnit,
    2
  );
  const feelsLike = `${convertedFeelsLike} ${temperatureUnit}`;
  return (
    <div className="weather-display" id="weatherDisplay">
      <div className="current-weather">
        <div className="content">
          <CurrentWeather
            location={location}
            current={current}
            temperature={temperature}
          />
          <WeatherDetails current={current} feelsLike={feelsLike} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
