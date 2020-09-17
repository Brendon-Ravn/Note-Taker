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
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", function(err, response){
    if (err) {
      console.log(err);
    }
    const notes = JSON.parse(response);
    const myNote = {
      id: notes.length + 1,
      title: req.body.title,
      text: req.body.text
    };
    notes.push(myNote);
    res.json(myNote);
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes, null, 2), function(err) {
      if (err) throw err;
    });
  });
});

app.delete("/api/notes/:id", function(req, res) {
  const deleteId = req.params.id;
  fs.readFile("/db/db.json", "utf8", function(error, response) {
    if (error) {
      console.log(error);
    }
    let notes = JSON.parse(response);
    if (deleteId <= notes.length) {
      res.json(notes.splice(deleteId-1,1));
      for (let i = 0; i < notes.length; i++) {
        notes[i].id = i + 1;
      }
      fs.writeFile("db.json", JSON.stringify(notes, null, 2), function(err) {
        if (err) throw err;
      });
    } else {
      res.json(false);
    }
  });
});

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});