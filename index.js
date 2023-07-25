// Bring in the express framework
const express = require("express");
// Bring in the Handlebars Middleware
const exphbs = require("express-handlebars");
// Create an instance of the express framework
const app = express();

/* ^^^^^^ CONFIGURE VIEW ENGIENE FOR EXPRESS JS ^^^^^^ */
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
/* ^^^^^^ CONFIGURE VIEW ENGIENE FOR EXPRESS JS ^^^^^^ */

/* ^^^^^^ GET ACCESS TO OUR STATIC HTML AND CSS FILES ^^^^^^ */
app.use(express.static("public"));
/* ^^^^^^ GET ACCESS TO OUR STATIC HTML AND CSS FILES ^^^^^^ */

/* ^^^^^^ SETUP ROUTES ^^^^^^ */

// Create a DEFAULT GET route
app.get("/", function (req, res) {
  // render the html on our server
  res.render("index");
});
// Create a SETTINGS POST route
app.post("/settings", function (req, res) {});
// Create a ACTION POST route
app.post("/action", function (req, res) {});
// Create a ACTIONS GET route
app.get("/actions", function (req, res) {});
// Create a DYNAMIC GET route
app.get("/actions/:type", function (req, res) {});

/*^^^^^^ SETUP ROUTES ^^^^^^ */

// Set the port variable according to port given by the enviromnent or use port 3007 by default
const PORT = process.env.PORT || 3011;
// Log to the console that you app has started and on which port is it running on
app.listen(PORT, function () {
  console.log(`App started at port: ${PORT}`);
});
