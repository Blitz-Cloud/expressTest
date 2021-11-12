const express = require("express");
const path = require("path");
const method_override = require("method-override");
const { v4: uuid } = require("uuid");

const app = express();
const port = 8080;

let comments = [];

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "/public")));
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/comments", (req, res) => {
  res.render("comments", { comments });
});
app.get("/comments/add", (req, res) => {
  res.render("addC");
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments.find((c) => {
    if (id === c.id) {
      res.render("show", { c });
    }
  });
});

app.post("/comments", (req, res) => {
  const data = req.body;
  comments.push({ ...data, id: uuid() });
  res.redirect("/comments");
});
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  comments.find((c) => {
    if (id === c.id) {
      res.render("edit", { c });
    }
  });
});
app.patch("/comments/:id", (req, res) => {
  const data = req.body.text;
  const { id } = req.params;
  let foundC = comments.find((c) => {
    if (id === c.id) {
      return c;
    }
  });
  foundC.text = data;
  res.redirect("/comments");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
