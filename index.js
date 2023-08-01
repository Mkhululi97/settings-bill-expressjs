// Bring in the express framework
import express from "express";
// Bring in the Handlebars Middleware
import { engine } from "express-handlebars";
// Bring in the Body-parser Middleware
import bodyParser from "body-parser";
// Bring in MomentJS
import moment from "moment";
// Bring in the Factory Function
import SettingsBill from "./settings-bill.js";
// Create an instance of the express framework
const app = express();
// Create an instance of the Settings Bill Factory Function
const settingsBill = SettingsBill();
// Create an instances of MomentJS
// const moment = momentjs();

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
  // this is where our data that is sent to the server gets retrieved and sent to
  //    our factory function, which displays data on our app.
  res.render("index", {
    updateSettings: settingsBill.getSettings(),
    totals: settingsBill.totals(),
    className: settingsBill.getClassName(),
  });
});

// Create a SETTINGS POST route
app.post("/settings", function (req, res) {
  // send data entered on the form to the server with req.
  // this is where our data that is sent to the server gets retrieved and sent to
  //    our factory function, which displays data on our app.
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
app.post("/action", function (req, res) {
  // get the current selected radio button
  // call the recordAction method and pass the current selected radio button
  settingsBill.recordAction(req.body.actionType);

  res.redirect("/");
});
// Create a ACTIONS GET route
app.get("/actions", function (req, res) {
  // retrieve data about the post request that was sent to the server
  res.render("actions", { actions: settingsBill.actions() });
  settingsBill.actions().forEach((result) => {
    result.timestamp = moment().fromNow();
  });
});
// Create a DYNAMIC GET route
app.get("/actions/:actionType", function (req, res) {
  const actionType = req.params.actionType;
  res.render("actions", { actions: settingsBill.actionsFor(actionType) });
});

/* ^^^^^^ SETUP ROUTES ^^^^^^ */

// Set the port variable according to port given by the enviromnent or use port 3007 by default
const PORT = process.env.PORT || 3011;
// Log to the console that you app has started and on which port is it running on
app.listen(PORT, function () {
  console.log(`App started at port: ${PORT}`);
});
