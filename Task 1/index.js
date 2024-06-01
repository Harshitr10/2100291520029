const express = require('express');
const numbersRouter = require('./src/routes/numbers');

const app = express();
const PORT = 9876;

app.use('/numbers', numbersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});