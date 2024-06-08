import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => 
  {
    const username = req.body.username;
    const password = req.body.password;

    try{
    await db.query("INSERT INTO users (email,password) VALUES ($1, $2)",[username,password]);
    console.log(username);
    console.log(password);
    res.redirect("/login");
    }
    catch(error)
    {
      console.log(error);
    }
  });

app.post("/login", async (req, res) => 
  {
    const username = req.body.username;
    const password = req.body.password;
    const id = req.body.id;
    try{
   const result = await db.query("SELECT * FROM users WHERE email = $1",[username]);
   
    if(result.rows.length > 0)
      {
        const user = result.rows[0];
        const upass = user.password;
        if(upass=== password)
          {
            
            console.log("Thank for logging in, " + username);
            res.render("secrets.ejs");
          }
          else
          {
            console.log("Your account doesn't exist, I'm sorry!");
            res.redirect("/login");
          }
      }

    console.log(username);
    console.log(password);
    }
    catch(error)
    {
      console.log(error);
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
