import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "Password2008$",
  port: 3000,
});

db.connect();

let totalc = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  let countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
      try
      {
          result.rows.forEach((country) => 
            {
              countries.push(country.country_code);
            });
            console.log(countries);
          totalc = countries.length;
          console.log(totalc);
      }
      catch(error)
      {
        console.error("Error making the query: ", error.stack);
      }

  res.render("index.ejs",
    {
       countries : countries,
       total : totalc,
    });
  });

  app.post("/add", async (req, res) => {
    const input = req.body["country"];
  
    try {

      try{
      const result = await db.query("SELECT country_code FROM countries WHERE country_name LIKE '%' || $1 || '%'", [input]);
      
      if (result.rows.length !== 0) {
        const data = result.rows[0];
        const countryCode = data.country_code;
        const form = req.body.country;
  
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
        res.redirect("/");
      } else {
        res.render("index.ejs",
        {
           countries : countries,
           total : totalc,
           error: "Country not found",
        });
      }
    }
    catch (error)
    {
      res.render("index.ejs",
      {
         countries : countries,
         total : totalc,
         error: "Country already exists",
      });
    }

    } catch (error) {
      console.error("Error making the query: ", error.stack);
      res.status(500).send(error);
    }

  });

  
  
  process.on('SIGINT', async () => {
    await db.end();
    console.log('Database pool closed');
    process.exit(0);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
