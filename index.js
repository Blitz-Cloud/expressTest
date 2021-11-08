const express = require("express");
const path = require("path");
const method_override = require("method-override");

const app = express();
const port = 8080;

app.set("view engine ","ejs");
app.use(express.static(path.join(__dirname,"./node-modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname,"public")));



app.get("/",(req,res)=>{
  res.render("index")
})
app.listen(port,()=>{
  console.log(`App is listening on port ${port}`);
})



