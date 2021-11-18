const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("./models");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

let custName = "";

app.post("/", (req, res) => {
  custName += req.body.custName;
  res.redirect("/addItems");
});

app.get("/addItems", (req, res) => {
  res.render("addItems");
});

app.post("/addItems", (req, res) => {
  let category = req.body.category;
  let name = req.body.itemName;
  let imported = req.body.imported;
  let quantity = parseInt(req.body.quantity);
  let price = parseFloat(req.body.price);
  models.itemDetail
    .create({
      custName: custName,
      itemName: name,
      category: category,
      imported: imported,
      quantity: quantity,
      price: price,
    })
    .then()
    .catch((err) => console.log(err));
  res.redirect("/addItems");
});

app.get("/calculate", (req, res) => {
  let total = 0.0;
  let salesTaxTotal = 0.0;
  models.itemDetail
    .findAll({ where: { custName: custName } })
    .then((value) => {
      value.forEach((item) => {
        let salesTax = 0.0;
        let importTax = 0.0;
        if (
          item.dataValues.category == "else" ||
          item.dataValues.category == "Else"
        ) {
          salesTax = parseFloat(
            ((item.dataValues.price * item.dataValues.quantity) / 10).toFixed(2)
          );
        }
        if (
          item.dataValues.imported == "yes" ||
          item.dataValues.imported == "Yes"
        ) {
          importTax = parseFloat(
            ((item.dataValues.price * item.dataValues.quantity) / 20).toFixed(2)
          );
        }
        salesTaxTotal += salesTax + importTax;
      });
      value.forEach((item) => {
        total += item.dataValues.price;
      });
      total += salesTaxTotal;
      res.render("output", {
        data: value,
        tax: salesTaxTotal,
        totalPrice: total,
      });
    })
    .catch((err) => console.log(err));
});

app.get("/newReceipt", (req, res) => {
  items = [];
  res.render("home")
});

app.listen(port, () => console.log(`Listening to ${port}...`));

module.exports = app;
