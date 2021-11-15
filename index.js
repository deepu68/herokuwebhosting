const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000

let items = [];

app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  let item = {
    category: req.body.category,
    name: req.body.itemName,
    imported: req.body.imported,
    quantity: parseInt(req.body.quantity),
    price: parseFloat(req.body.price),
  };
  items.push(item);
  res.render("home");
});

app.get("/calculate", (req, res) => {
  let total = 0.0;
  let salesTaxTotal = 0.0;
  items.forEach((item) => {
    let salesTax = 0.0;
    let importTax = 0.0;
    if (item.category == "else" || item.category == "Else") {
      salesTax = parseFloat(((item.price * item.quantity) / 10).toFixed(2));
    }
    if (item.imported == "yes" || item.imported == "Yes") {
      importTax = parseFloat(((item.price * item.quantity) / 20).toFixed(2));
      //   console.log(importTax);
    }
    salesTaxTotal += salesTax + importTax;
    item.price = parseFloat((item.price + salesTax + importTax).toFixed(2));
  });
  items.forEach((item) => {
    total += item.price;
  });
  // console.log(salesTaxTotal)
  // console.log(total)

  res.render("output", { data: items, tax: salesTaxTotal, totalPrice: total });
});

app.get("/newReceipt", (req, res) => {
  items = [];
  res.render("home");
});

app.listen(port, () => console.log(`Listening to ${port}...`));

module.exports = app;
