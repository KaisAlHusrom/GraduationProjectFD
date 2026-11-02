import store from "../Redux/Store";



export const formattedDate = (dateString) => {
  // To access the current state from the store
  const lang = store.getState().langSlice.lang;
  const usedLang = lang === "ar" ? "ar" : "en-US"
    let options;
    if(isTimestamp(dateString)){
        options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        };
    }else {
      options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    }
    // Set the locale to Arabic (ar)
    const formattedString = new Date(dateString)
      .toLocaleDateString(usedLang, options)
      .replace(/،/g, '') // Remove the comma in the Arabic output

    return formattedString;
};

export function timeAgo(isoDateString) {
  const timestamp = Date.parse(isoDateString); // Parse ISO date string to timestamp
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  const intervals = {
      year: seconds / (60 * 60 * 24 * 365),
      month: seconds / (60 * 60 * 24 * 30),
      day: seconds / (60 * 60 * 24),
      hour: seconds / (60 * 60),
      minute: seconds / 60,
  };

  for (const [unit, interval] of Object.entries(intervals)) {
      if (interval >= 1) {
          const roundedInterval = Math.floor(interval);
          return `Before ${roundedInterval} ${unit}${roundedInterval !== 1 ? 's' : ''}`;
      }
  }

  return 'just now';
}

// Function to check if the string is a timestamp
function isTimestamp(value) {
  // Check if Date.parse() returns a valid timestamp (not NaN) for the given value
  return !isNaN(Date.parse(value));
}

function isMySQLDateFormat(value) {
  // Regular expression to match the format 'YYYY-MM-DD'
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(value);
}

// Function to check if a date is in the current week
const isInThisWeek = (requestDate) => {
  const currentDate = new Date();
  const currentWeekStart = new Date(currentDate);
  currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay()); // Move to the start of the week

  const currentWeekEnd = new Date(currentDate);
  currentWeekEnd.setDate(currentWeekStart.getDate() + 7); // Move to the end of the week

  return requestDate >= currentWeekStart && requestDate <= currentWeekEnd;
};

// Function to check if a date is in the current month
const isInThisMonth = (requestDate) => {
  const currentDate = new Date();
  const reqDate = new Date(requestDate)
  return currentDate.getMonth() === reqDate.getMonth() && currentDate.getFullYear() === reqDate.getFullYear();
};

// Function to check if a date is in the current year
const isInThisYear = (requestDate) => {
  const currentDate = new Date();
  const reqDate = new Date(requestDate)
  return currentDate.getFullYear() === reqDate.getFullYear();
};

const DateHelper = {
    formattedDate,
    isTimestamp,
    isMySQLDateFormat,
    isInThisWeek,
    isInThisMonth,
    isInThisYear,
    timeAgo
};

export default DateHelper;