var express = require("express");
var path = require("path");
const fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});