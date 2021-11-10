const express = require("express");
const path = require("path");
const method_override = require("method-override");
const {v4:uuid} = require("uuid")

const app = express();
const port = 8080;

const comments = [
  {
    id:uuid(),
    user:"user",
    text:"I am a user"
  },
  {
    id:uuid(),
    user:"Blitz Cloud",
    text:"Hello ,I like Wot"
  }
]

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"./node-modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname,"/public")));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));




app.get("/",(req,res)=>{
  res.render("index")
})
app.get('/comments',(req,res)=>{
  res.render("comments",{comments})
})
app.get("/comments/:id",(req,res)=>{
  const {id}= req.params;
  comments.find( (c) =>{
    if( id === c.id){
      res.render("show",{c})
    }

  })
})
app.post("/comments",(req,res)=>{
    const data = req.body;
    comments.push({...data , id:uuid()});
    res.redirect("/comments");
})
app.get("/comments/:id",(req,res)=>{
    const {id} = req.params;
    comments.find((c)=>{
        if( c === c.id){
            res.render("edit",{c});
        }
    })
})
app.path("/comments/:id",(req,res)=>{
    const data = req.body;
    const {id} =req.params;
    const foundC = comments.filter((c)=>{
        if(c.id === id){
            return c;
        }
    })
    foundC.text = data;
})


app.listen(port,()=>{
  console.log(`App is listening on port ${port}`);
})