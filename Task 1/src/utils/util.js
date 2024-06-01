const axios = require('axios');

async function fetchNumbers(numberType) {
  const url = `http://localhost:9876/numbers/${numberType}`; // Replace with actual test server URL
  try {
    const response = await axios.get(url, { timeout: config.TIMEOUT });
    return response.data;
  } catch (error) {
    return null;
  }
}

function calculateAverage(data) {
  if (!data) {
    return 0.0;
  }
  return data.reduce((sum, num) => sum + num, 0) / data.length;
}

module.exports = {
  fetchNumbers,
  calculateAverage,
};
