
const fs = require("fs");

/*fs.writeFile("message.txt", "Hey i am Deji.", (err) => 
  {
    if(err) throw err;
    console.log("The file has been saved!");
  });*/

  fs.readFile("./message.txt","utf8",(err,data) => 
    {
      if(err) throw err;
      console.log(data);
    });
  fs.writeFile("./message.txt", "Hey I am getting better!",(err) =>
  {
    if(err) throw err;
    console.log("The file has been changed");    
  });

  