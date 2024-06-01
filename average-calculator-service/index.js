const express = require('express');
const { fetchNumbers, calculateAverage } = require('./src/utils/util');
const port = 9876;
const config = {
  TIMEOUT: 1000,
  WINDOW_SIZE: 10,
};

const app = express();

const numbers = new Set();


app.use("/", require("./src/routes/numbers"));

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});