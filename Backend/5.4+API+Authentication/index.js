import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "94e46004-f942-41e1-82c5-71e75cf11e5a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try{
  const response = await  axios.get(API_URL + "/random");
  const result = JSON.stringify(response.data);

  res.render("index.ejs", 
    {
      content : result,
    });
  }
  catch(error)
  {
    console.log("Error with making the GET request.");
    res.status(404).send(error.message);
  }
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
 try{ 
  const response = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: "DejMan2003",
        password: "Password2008$",
      },
    });
    res.render("index.ejs", 
    {
      content: JSON.stringify(response.data),
    });
  }
    catch (error)
    {
      res.status(404).send(error.message);
    }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
try{
  const response = await axios.get( API_URL + "/filter",
  {
  params: { 
    apiKey : yourAPIKey,
    score: 5,
  }
});
res.render("index.ejs", 
{
  content: JSON.stringify(response.data),
});
}
catch(error)
{
  res.status(404).send(error.message);
}
  //HINT: You need to provide a query parameter of apiKey in the request.
});



app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
try {
   const response = await axios.get( `${API_URL}/secrets/42`, 
   {
    headers: {Authorization : `Bearer ${yourBearerToken}`},
   }
   );
   res.render("index.ejs", 
   {
    content: JSON.stringify(response.data),
   });
}
  catch (error)
  {
    res.status(404).send(error.message);
  }
  }); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
