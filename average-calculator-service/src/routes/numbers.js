const express = require("express");
const router = express.Router();

Router.route.get('/numbers/:numberType', async (req, res) => {
    const numberType = req.params.numberType;
    const validTypes = ['p', 'f', 'e', 'r'];
  
    if (!validTypes.includes(numberType)) {
      return res.status(400).json({ error: 'Invalid number type' });
    }
  
    const fetchedNumbers = await fetchNumbers(numberType);
    if (!fetchedNumbers) {
      return res.status(500).json({ error: 'Failed to fetch numbers' });
    }
  
    const newNumbers = fetchedNumbers.filter(num => !numbers.has(num));
    numbers.add(...newNumbers);
  
    if (numbers.size > config.WINDOW_SIZE) {
      numbers.delete(Math.min(...numbers)); // Remove oldest number
    }
  
    const windowCurrState = Array.from(numbers);
    const avg = calculateAverage(windowCurrState);
  
    res.json({
      numbers: fetchedNumbers,
      windowPrevState: [],  // Assuming previous state is not tracked
      windowCurrState,
      avg,
    });
  });

  module.exports = router;