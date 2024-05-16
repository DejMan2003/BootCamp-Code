import express from "express";
const app = express();
const port = 3000;

app.get("/",(req,res) => 
  {
    res.send(`Welcome to my Humble Website`);
  });
app.get("/About",(req,res) => 
  {
    res.send("I am a lover of coding this is so fun to me.");
  });
app.get("/ContactUs",(req,res) => 
  {
    res.send(`You are not gonna get my phone number shoo!`);
  });
  app.listen(port, () =>
    {
      console.log(`The application is running from port ${port}.`);
    });
app.post("/register",(req,res) => 
{
  res.sendStatus(201);
});
