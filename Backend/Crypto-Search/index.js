import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set the view engine to EJS
app.set("view engine", "ejs");

// Define the symbol and URL for the API request
const symbol = "BTC-USD";
const url = `https://api.blockchain.com/v3/exchange/l2/${symbol}`;
const apiKey = "f3b3a5f8-9257-4bac-aaeb-997c8ed1e98f";

// Set up the headers for the API request
const config = {
  headers: {
    Accept: "application/json",
    "X-API-Token": apiKey,
  },
};

// Define the route for the home page
app.get("/", async (req, res) => {
  try {
    // Make the API request
    const response = await axios.get(url, config);
    const data = response.data;

    // Render the EJS template and pass the data to it
    res.render("index", {
      sym: symbol,
      bid: data.bids[0].qty,
      ask: data.asks[0].qty,
      bidprice: data.bids[0].px,
      askprice: data.asks[0].px,
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
