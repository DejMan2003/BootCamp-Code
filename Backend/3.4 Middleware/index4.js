import express from "express";
import bodyparser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const dirName = dirname(fileURLToPath(import.meta.url)); 

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: true,}));

var bandName = "";


app.get("/", (req,res) =>
  {
    res.sendFile( dirName + "/public/index.html");
  });

  function name(req, res,next)
  {
    console.log(req.body);
    bandName = (req.body["street"] + "  " + req.body["pet"]);
    next();
  }

app.use(name);

app.post("/submit",(req,res) =>
{
  res.send("Your bandname is : " + bandName);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
