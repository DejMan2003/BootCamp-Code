import express from "express";
import bodyParser from "body-parser";
import inquirer from "inquirer";
const port = 3000;

const app = express();

inquirer
.prompt(
  [{
    blog : "Write How you feel here : ",
  }])
  .then((answers) => {
    let post = answers.blog;
   console.log(post);
  })
.catch((error) => {
if(error.isTtyError)
{
  //console.log("Prompt wasn't sent to the right workspace.");
}
else
{
  //console.log("Something else went wrong!");
}
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => 
  {
    res.render("index.ejs");
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });