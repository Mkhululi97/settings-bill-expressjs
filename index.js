// Bring in the express framework
import express from "express";
// Bring in the Handlebars Middleware
import { engine } from "express-handlebars";
// Bring in the Body-parser Middleware
import bodyParser from "body-parser";
// Bring in the Factory Function
import SettingsBill from "./settings-bill.js";
// Create an instance of the express framework
const app = express();
// Create an instance of the Settings Bill Factory Function
const settingsBill = SettingsBill();

/* ^^^^^^ CONFIGURE VIEW ENGIENE FOR EXPRESS JS ^^^^^^ */
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
/* ^^^^^^ CONFIGURE VIEW ENGIENE FOR EXPRESS JS ^^^^^^ */

/* ^^^^^^ GET ACCESS TO OUR STATIC CSS FILES ^^^^^^ */
app.use(express.static("public"));
/* ^^^^^^ GET ACCESS TO OUR STATIC CSS FILES ^^^^^^ */

/* ^^^^^^ USE BODY PARSER ^^^^^^ */
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/* ^^^^^^ USE BODY PARSER ^^^^^^ */

/* ^^^^^^ SETUP ROUTES ^^^^^^ */

// Create a DEFAULT GET route
app.get("/", function (req, res) {
  // render the html on our server
  // res.render("index");
  res.render("index", { updateSettings: settingsBill.getSettings() });
});
// Create a SETTINGS POST route
app.post("/settings", function (req, res) {
  // send data entered on the form to the server with req.
  settingsBill.setSettings({
    callCost: req.body.callCost,
    smsCost: req.body.smsCost,
    warningLevel: req.body.warningLevel,
    criticalLevel: req.body.criticalLevel,
  });
  // go back to the root route/home page after submit button has been clicked.
  res.redirect("/");
});
// Create a ACTION POST route
app.post("/action", function (req, res) {});
// Create a ACTIONS GET route
app.get("/actions", function (req, res) {});
// Create a DYNAMIC GET route
app.get("/actions/:type", function (req, res) {});

/* ^^^^^^ SETUP ROUTES ^^^^^^ */

// Set the port variable according to port given by the enviromnent or use port 3007 by default
const PORT = process.env.PORT || 3011;
// Log to the console that you app has started and on which port is it running on
app.listen(PORT, function () {
  console.log(`App started at port: ${PORT}`);
});
