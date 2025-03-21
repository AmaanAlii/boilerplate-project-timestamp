// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

app.get("/api/:time", function (req, res) {
  let date = new Date(req.params.time);

  if (date.toUTCString() === "Invalid Date") {
    date = new Date(+req.params.time);
    console.log(date);
    console.log(date.toUTCString());
    if (date.toUTCString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
      return;
    } else {
      res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
    }
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
