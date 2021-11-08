const express = require("express");

const app = express();
const port = 8080;

app.set("view engine ","ejs");
app.use(express.static("./node-modules/bootstrap/dist"))


app.get("/",(req,res)=>{
  res.render("index")
})
app.listen(port,()=>{
  console.log(`App is listening on port ${port}`);
})



