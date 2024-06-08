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

app.post("/edit", async (req, res) => 
  {
    const item = req.body.updatedItemTitle;
    const id = req.body.updatedItemId;
    try
    {
      await db.query("UPDATE items SET title = $1 WHERE id = $2;",[item,id]);
      res.redirect("/");
    }
    catch(error)
    {
      console.log(error);
    }
  });

app.post("/delete", async (req, res) => 
  {
    const id = req.body.deleteItemId;

    try
    {
      await db.query("DELETE FROM items WHERE id = $1",[id]);
      res.redirect("/");
    }
    catch(error)
    {
      console.log(error);
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
