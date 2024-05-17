import express from "express";
import url from "url";
import path from "path";

const app = express();
const port = 3000;

app.use(function logger(req,res,next)
{
  console.log("Next Method: ", req.method);
  console.log("Next URL: ",req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
