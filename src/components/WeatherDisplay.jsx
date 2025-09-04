import CurrentWeather from './CurrentWeather';
import WeatherDetails from './WeatherDetails';
import { convertTemperature } from '../utils/temperatureUtils';
const WeatherDisplay = ({ weather: { location, current }, tempUnit }) => {
  const temperatureInCelsius = current?.temp_c;

  const temperature = convertTemperature({
    celsius: temperatureInCelsius,
    scale: tempUnit,
    decimalPlaces: 2,
  });

  const feelsLikeInCelcius = current?.feelslike_c;
  const feelsLike = convertTemperature({
    celsius: feelsLikeInCelcius,
    scale: tempUnit,
    decimalPlaces: 2,
  });

  return (
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
  );
};

export default WeatherDisplay;
