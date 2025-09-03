const WeatherDetails = ({
  current: { feelslike_c, humidity, wind_kph, pressure_mb },
  temperatureUnit = '°C',
}) => {
  return (
    <div className="weather-details">
      <div className="detail-item">
        <div className="detail-label">Feels Like</div>
        <div className="detail-value">{`${feelslike_c}${temperatureUnit}`}</div>
      </div>
      <div className="detail-item">
        <div className="detail-label">Humidity</div>
        <div className="detail-value">{`${humidity}%`}</div>
      </div>
      <div className="detail-item">
        <div className="detail-label">Wind Speed</div>
        <div className="detail-value">{`${wind_kph} km/h`}</div>
      </div>
      <div className="detail-item">
        <div className="detail-label">Pressure</div>
        <div className="detail-value">{`${pressure_mb} hPa`}</div>
      </div>
    </div>
  );
};

export default WeatherDetails;
