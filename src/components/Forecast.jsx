import { convertTemperature } from '../utils/temperatureUtils';

import { getWeekdayName, isTomorrow, isToday } from '../utils/dateUtils';
const Forecast = ({
  weather: {
    forecast: { forecastday },
  },
  tempUnit,
}) => {
  return (
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
              const convertedMaxTemp = convertTemperature({
                celsius: maxtemp_c,
                scale: tempUnit,
              });

              const convertedMinTemp = convertTemperature({
                celsius: mintemp_c,
                scale: tempUnit,
              });
              return (
                <div key={index} className="forecast-item">
                  <div className="forecast-day">
                    {isTomorrow(date) ? 'Tomorrow' : getWeekdayName(date)}
                  </div>
                  <div className="forecast-temp">
                    {`${convertedMaxTemp} /
                        ${convertedMinTemp}`}
                  </div>
                  <div className="forecast-desc">{text}</div>
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Forecast;
