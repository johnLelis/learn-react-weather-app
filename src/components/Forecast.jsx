import {
  getTemperatureUnit,
  convertTemperature,
} from '../utils/temperatureUtils';

import { getWeekdayName, isTomorrow, isToday } from '../utils/dateUtils';
const Forecast = ({
  weather: {
    forecast: { forecastday },
  },
  prefferedTemperatureUnit,
}) => {
  const temperatureUnit = getTemperatureUnit(prefferedTemperatureUnit);
  return (
    <div>
      <div className="forecast-section">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-grid" id="forecastGrid">
          {forecastday.length > 0 &&
            forecastday.map(
              (
                {
                  date,
                  day: {
                    maxtemp_c,
                    mintemp_c,
                    condition: { text },
                  },
                },
                index
              ) => {
                if (isToday(date)) return;
                const convertedMaxTemp = convertTemperature(
                  maxtemp_c,
                  prefferedTemperatureUnit
                );

                const convertedMinTemp = convertTemperature(
                  mintemp_c,
                  prefferedTemperatureUnit
                );
                return (
                  <div key={index} className="forecast-item">
                    <div className="forecast-day">
                      {isTomorrow(date) ? 'Tomorrow' : getWeekdayName(date)}
                    </div>
                    <div className="forecast-temp">
                      {`${convertedMaxTemp} ${temperatureUnit} /
                        ${convertedMinTemp} ${temperatureUnit}`}
                    </div>
                    <div className="forecast-desc">{text}</div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
