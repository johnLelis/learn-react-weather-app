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

export const convertTemperature = (celsius, scale, decimalPlaces = 0) => {
  const converter = temperatureConverters[scale.toLowerCase()];
  if (!converter) {
    return decimalPlaces > 0
      ? celsius.toFixed(decimalPlaces)
      : celsius.toFixed();
  }
  return converter(celsius).toFixed(decimalPlaces);
};
