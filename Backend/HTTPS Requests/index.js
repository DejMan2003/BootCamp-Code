import express from "express";

const app = express();
const port = 3000;

app.get("/",(req,res)=> 
{
  res.send(`<h1> Hello! </h1>`);
});
app.get("/ContactUs",(req,res)=>
{
  res.send(`<h1>Thank you for calling our line!</h1>`);
});

app.listen(port, () =>
{
  console.log(`The application is running from port ${port}.`);
});