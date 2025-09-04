/**
 * Returns formatted air quality string like "Good (1)"
 * Based on US EPA index (1–6)
 * @param {number} epaIndex
 * @returns {string}
 */
export const formatAirQuality = epaIndex => {
  const categories = {
    1: 'Good',
    2: 'Moderate',
    3: 'Unhealthy for Sensitive Groups',
    4: 'Unhealthy',
    5: 'Very Unhealthy',
    6: 'Hazardous',
  };

  const label = categories[epaIndex] || 'Unknown';
  return `${label} (${epaIndex})`;
};
