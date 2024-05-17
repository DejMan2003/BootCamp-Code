import express from "express";
import ejs from "ejs";


const app = express();
const port = 3000;

var dayofWeek = new Date("18 May, 2024 15:30:00");
let day = dayofWeek.getDay();
var type = "";
var advice = "";
app.get("/",(req,res) =>
  {
    var dayofWeek = new Date();
let day = dayofWeek.getDay();

if(day == 0 || day == 6)
{
  type = " the weekend";
  advice = ", it's time to have fun!";
}
else
{
   type = " a weekday";
     advice = ", it's time to work hard!";
}
res.render("index.ejs",
{
  dayT: type,
  dayA: advice,
}
);
}
);




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});