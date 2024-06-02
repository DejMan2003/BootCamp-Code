import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 4000;
const db = new pg.Client(
  {
user : "postgres",
host : "localhost",
database: "World",
password: "Password2008$",
port : 3000,
  });

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

db.query("SELECT * FROM capitals", (err,res) => 
  {
    if(err)
      {
        console.error("Error making the query: ", err.stack);
      }
      else
      {
        quiz = res.rows;
      }

      db.end();
  });


let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
