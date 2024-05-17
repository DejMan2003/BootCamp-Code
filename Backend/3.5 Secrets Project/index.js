//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import bodyparser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({extended: true,}));

var key = "";
var pass = false;

function safe(req,res,next)
{
console.log(req.body);
key = req.body["password"];
if(key == "ILoveProgramming")
  {
    pass = true;
  }
next();
}

app.use(safe);


app.get("/",(req,res) =>
{
    res.sendFile(dirName + "/public/index.html");
});

app.post("/check",(req,res) =>
  {
    if(pass == true)
    {
    res.sendFile(dirName + "/public/secret.html" );
    }
    else
    {
      res.sendFile(dirName + "/public/index.html");
        pass = false;
    }
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });