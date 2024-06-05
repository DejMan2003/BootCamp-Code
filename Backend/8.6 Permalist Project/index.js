import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ToDoList",
  password: "Password2008$",
  port: 3000,
});

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
db.connect();


let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try{
  const result =  await db.query("SELECT * FROM items ORDER BY id ASC ");
  items = result.rows;

  res.render("index.ejs", 
  {
    listTitle: new Date().toLocaleDateString(),
    listItems: items,
  });
}
catch(error)
{
  console.log(error);
}
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;

  try{
   await db.query("INSERT INTO items (title) VALUES ($1);", [item]);
  //items.push({ title: item.title, id: item.id });
  res.redirect("/");
  }
  catch(error)
  {
    console.log(error);
  }

});

app.post("/edit", (req, res) => 
  {
    
  });

app.post("/delete", (req, res) => {});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
