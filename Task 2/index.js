
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

const AUTH_TOKEN = process.env.AUTH_TOKEN;
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.get("/categories/:categoryname/products", async (req, res) => {
  const categoryname = req.params.categoryname;
  const top = req.query.top || 10; 

  const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=${top}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : "Internal Server Error",
    });
  }
});

app.get(
  "/test/companies/:companyname/categories/:categoryname/products",
  async (req, res) => {
    const companyname = req.params.companyname;
    const categoryname = req.params.categoryname;
    const top = req.query.top || 10;
    const minPrice = req.query.minPrice || 1;
    const maxPrice = req.query.maxPrice || 10000;

    const url = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
      res.status(error.response ? error.response.status : 500).json({
        error: error.response ? error.response.data : "Internal Server Error",
      });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
