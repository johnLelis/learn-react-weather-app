import React from 'react';

const Forecast = () => {
  return (
    <div>
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
  );
};

export default Forecast;
