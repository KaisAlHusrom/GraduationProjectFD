import store from "../Redux/Store";



const formattedDate = (dateString) => {
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

// Function to check if the string is a timestamp
function isTimestamp(value) {
  // Implement your logic to determine if the value is a timestamp
  // For instance, you could use a regex or other checks here
  // Here's a simple example assuming a timestamp format like "YYYY-MM-DD HH:MM:SS"
  return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value);
}

function isMySQLDateFormat(value) {
  // Regular expression to match the format 'YYYY-MM-DD'
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(value);
}


const DateHelper = {
    formattedDate,
    isTimestamp,
    isMySQLDateFormat
};

export default DateHelper;