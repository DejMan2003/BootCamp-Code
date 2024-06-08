import express from "express";
import bodyparser from "body-parser";
import axios from "axios";
import pg from "pg";


const app = express();
const port = 4000;
const API_URL = "https://covers.openlibrary.org/b/";

const db = new pg.Client(
  {
    user: 'postgres',
    host: 'localhost',
    database: 'Books',
    password: 'Password2008$',
    port: 3000,
  });

db.connect();
app.use(bodyparser.urlencoded({extended : true,}));
app.use(express.static("public"));

let books = [
  {
    book_id : 1, title : "Misery", author : "Stephen King", book_cover: "isbn/9781444741292-M.jpg",
  }];

function findBook()
{

}

app.get("/", async (req,res) =>
  {
    const books = await db.query()
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
