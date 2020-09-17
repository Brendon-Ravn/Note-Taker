const express = require("express");
const path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", function(req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function(err, res){
    if (err) {
      console.log(err);
    }
    const notes = JSON.parse(res);
    const myNote = {
      id: notes.length + 7,
      title: req.body.title,
      text: req.body.text
    };
    notes.push(myNote);
    res.json(myNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), function(err) {
      if (err) {
        console.log(err)
      };
    });
  });
});

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});