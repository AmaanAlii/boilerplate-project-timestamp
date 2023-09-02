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

app.get("/api/:time", function (req, res) {
  function unixTimeStamptoUtc(unixTimeStamp) {
    const date = new Date(unixTimeStamp);
    const utcString = date.toUTCString();
    return utcString;
  }
  function utcToUnixTimeStamp(utcString) {
    const date = new Date(utcString);
    const unixTimeStamp = date.getTime();

    return unixTimeStamp;
  }
  if (!isNaN(req.params.time)) {
    const timeParam = Number(req.params.time);
    const result = unixTimeStamptoUtc(timeParam);
    const data = { unix: timeParam, utc: result };
    res.json(data);
  } else if (isNaN(req.params.time)) {
    const result = utcToUnixTimeStamp(req.params.time);
    if (!isNaN(result)) {
      const data = { unix: result, utc: req.params.time };
      res.json(data);
    } else {
      const data = { unix: null, utc: null };
      res.json(data);
    }
  } else {
    const data = { unix: null, utc: null };
    res.json(data);
  }
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
