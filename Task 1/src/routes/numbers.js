const express = require('express');
const { fetchNumbers } = require('./services/fetchNumber');
const { calculateAverage } = require('./utils/calculateAverage');
const config = require('../../config/config');

const router = express.Router();
const WINDOW_SIZE = config.WINDOW_SIZE;
let window = new Set();

router.get('/:numberType', async (req, res) => {
    const numberType = req.params.numberType;
    const validTypes = ['p', 'f', 'e', 'r'];

    if (!validTypes.includes(numberType)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    const fetchedNumbers = await fetchNumbers(numberType);
    if (fetchedNumbers.length === 0) {
        return res.status(500).json({ error: 'Failed to fetch numbers' });
    }

    const windowPrevState = Array.from(window);

    fetchedNumbers.forEach(num => {
        if (!window.has(num)) {
            if (window.size >= WINDOW_SIZE) {
                window.delete(window.values().next().value); // Remove oldest number
            }
            window.add(num);
        }
    });

    const windowCurrState = Array.from(window);
    const avg = calculateAverage(windowCurrState);

    res.json({
        numbers: fetchedNumbers,
        windowPrevState,
        windowCurrState,
        avg: avg.toFixed(2)
    });
});

module.exports = router;