const unitMap = {
  celsius: { symbol: '°C', label: 'Celsius' },
  fahrenheit: { symbol: '°F', label: 'Fahrenheit' },
  kelvin: { symbol: 'K', label: 'Kelvin' },
};

/**
 * Returns the display label or symbol for a temperature unit
 * based on preferences.tempUnit
 *
 * @param {string} tempUnit - The preference value (e.g., 'celsius', 'fahrenheit', 'kelvin')
 * @param {string} type - "symbol" | "label"
 * @returns {string}
 */
export const getTemperatureUnit = (tempUnit, type = 'symbol') => {
  const unit = unitMap[tempUnit] || unitMap['celsius'];
  return unit[type];
};

const temperatureConverters = {
  kelvin: celsius => celsius + 273.15,
  fahrenheit: celsius => (celsius * 9) / 5 + 32,
};

export const convertTemperature = ({ celsius, scale, decimalPlaces = 0 }) => {
  const converter = temperatureConverters[scale.toLowerCase()];
  const temperatureUnit = getTemperatureUnit(scale);
  if (!converter) {
    const defaultTemp =
      decimalPlaces > 0 ? celsius.toFixed(decimalPlaces) : celsius.toFixed();
    return `${defaultTemp} ${temperatureUnit}`;
  }
  const convertedTemperature = converter(celsius).toFixed(decimalPlaces);
  return `${convertedTemperature} ${temperatureUnit}`;
};

export const calculateDewPoint = (tempC, humidityPercent, tempUnit) => {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidityPercent / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return convertTemperature({
    celsius: dewPoint,
    scale: tempUnit,
  });
};

/**
 * Returns a formatted UV risk level string like "Moderate (5)"
 * @param {number} uvIndex
 * @returns {string}
 */
export const formatUVIndex = uvIndex => {
  if (uvIndex <= 2) return `Low (${uvIndex})`;
  if (uvIndex <= 5) return `Moderate (${uvIndex})`;
  if (uvIndex <= 7) return `High (${uvIndex})`;
  if (uvIndex <= 10) return `Very High (${uvIndex})`;
  return `Extreme (${uvIndex})`;
};
