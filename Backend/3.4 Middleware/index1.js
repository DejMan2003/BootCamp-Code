import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
//import bodyparser from "body-parser";
import morgan from "morgan";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

//app.use(bodyparser.urlencoded({extended: true}));
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/submit",(req,res) =>
{
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
