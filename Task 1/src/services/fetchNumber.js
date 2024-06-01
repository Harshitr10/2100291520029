const axios = require('axios');
const { TEST_SERVER_URL, TIMEOUT } = require('../../config/config');

const fetchNumbers = async (numberid) => {
    try {
        const response = await axios.get(`${TEST_SERVER_URL}/${numberid}`, { timeout: TIMEOUT });
        if (response.status === 200) {
            return [...new Set(response.data.numbers)];
        }
        return [];
    } catch (error) {
        return [];
    }
};

module.exports = { fetchNumbers };