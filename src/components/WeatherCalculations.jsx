import {
  calculateDewPoint,
  formatUVIndex,
  convertTemperature,
} from '../utils/temperatureUtils';
import { formatAirQuality } from '../utils/airQualityUtils';
const WeatherCalculations = ({
  weather: {
    current: { feelslike_c, uv, humidity, air_quality, vis_km, windchill_c },
  },
  tempUnit,
}) => {
  const weatherCalculations = [
    {
      controlId: 'heatIndex',
      value: convertTemperature({ celsius: feelslike_c, scale: tempUnit }),
      label: 'Heat Index',
    },
    {
      controlId: 'dewPoint',
      value: calculateDewPoint(feelslike_c, humidity, tempUnit),
      label: 'Dew Point',
    },
    {
      controlId: 'windChill',
      value: convertTemperature({ celsius: windchill_c, scale: tempUnit }),
      label: 'Wind Chill',
    },
    {
      controlId: 'uvIndex',
      value: formatUVIndex(uv),
      label: 'UV Index',
    },
    {
      controlId: 'airQuality',
      value: formatAirQuality(air_quality['us-epa-index']),
      label: 'Air Quality',
    },
    {
      controlId: 'visibility',
      value: `${vis_km} km`,
      label: 'Visibility',
    },
  ];
  return (
    <div className="calculations-section">
      <h3 className="calculations-title">Weather Calculations</h3>
      <div className="calculations-grid">
        {weatherCalculations.length > 0 &&
          weatherCalculations.map(({ controlId, value, label }, index) => (
            <div key={index} className="calculation-item">
              <div className="calc-label">{label}</div>
              <div className="calc-value" id={controlId}>
                {value}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherCalculations;
