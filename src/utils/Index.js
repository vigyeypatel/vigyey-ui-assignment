/**
 * Calculates reward points based on transaction amount.
 * @param {number} amount - The transaction amount.
 * @param {Object} config - Reward points configuration.
 * @returns {number} Calculated reward points.
 */
export const calculateRewardPoints = (amount, config = { above50: 1, above100: 2 }) => {
    let points = 0;
    if (amount > 50) {
      points += (Math.min(amount, 100) - 50) * config.above50;
    }
    if (amount > 100) {
      points += (amount - 100) * config.above100;
    }
    return points;
  };

/**
 * Groups transactions by month and customerId, and calculates total reward points.
 * @param {Array} transactions - Array of transaction data.
 * @returns {Object} An object with month and customerId as keys, mapping to total reward points.
 */
export const calculateMonthlyRewards = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const { customerId, transactionAmount, transactionDate } = transaction;
  
      // Extract the month name from the transaction date
      const month = new Date(transactionDate).toLocaleString("default", { month: "long" });
  
      // Create a unique key for each customer and month
      const key = `${customerId}-${month}`;
  
      // Calculate reward points for this transaction
      const points = calculateRewardPoints(transactionAmount);
  
      // Add points to the respective customer and month key
      if (!acc[key]) {
        acc[key] = { customerId, month, points: 0 };
      }
      acc[key].points += points;
  
      return acc;
    }, {}); // Initial value is an empty object
  };


  /**
 * Debounce function to delay the execution of a function.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} A debounced version of the input function.
 */
export const debounce = (func, delay) => {
    let timerId;
  
    return (...args) => {
      // Clear the previous timer if the function is called again
      if (timerId) clearTimeout(timerId);
  
      // Set a new timer
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  

export const  toCamelCase = (str) => {
    return str
      .toLowerCase() // Convert the string to lowercase
      .split(' ') // Split the string by spaces
      .map((word, index) => {
        if (index === 0) {
          return word; // The first word stays lowercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize the first letter of other words
      })
      .join(''); // Join the words together
  }