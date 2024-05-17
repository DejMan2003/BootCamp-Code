import express from "express";
//import morgan from "morgan";


const app = express();
const port = 3000;
app.use((req,res,next) =>
  {
    console.log("Next Method: ", req.method);
    next();
  });
//app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((req,res,next) =>
  {
    console.log("Next Method", req.method);
    next();
  });

  
app.post("/login",(req,res) => 
{
  res.send("Login page");
  res.sendStatus(201);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  next();
});
