import pg from "pg";

const db = new pg.Client({
user : "postgres",
host : "localhost",
database: "world",
password: "Password2008$",
port : 3000,
});

db.connect();

db.query("SELECT * FROM capitals", (err,res) =>
  {
    if(err)
      {
        console.error("Error with making the Query Request", err.stack);
      }
      else
      {
        quiz = res.rows;
      }
 
      db.end();
    }
);