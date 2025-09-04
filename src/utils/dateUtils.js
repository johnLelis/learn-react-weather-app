import dayjs from 'dayjs';

/**
 * Returns the weekday name (e.g., "Monday") for a given date.
 * @param {string|Date|dayjs.Dayjs} date
 * @returns {string}
 */
export const getWeekdayName = date => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[dayjs(date).day()];
};

/**
 * Checks if the given date is tomorrow.
 * @param {string|Date|dayjs.Dayjs} inputDate
 * @returns {boolean}
 */
export const isTomorrow = inputDate => {
  const parsedDate = dayjs(inputDate);
  const tomorrowDate = dayjs().add(1, 'day');
  return parsedDate.isSame(tomorrowDate, 'day');
};

/**
 * Checks if the given date is today.
 * @param {string|Date|dayjs.Dayjs} inputDate
 * @returns {boolean}
 */
export const isToday = inputDate => {
  const parsedDate = dayjs(inputDate);
  const todayDate = dayjs();
  return parsedDate.isSame(todayDate, 'day');
};
