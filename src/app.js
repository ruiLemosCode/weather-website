const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Defines path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather app", author: "Rui Lemos" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Weather app", author: "Rui Lemos" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help me",
    content:
      "To get weather information provide the name of the city you want to get the forecast for",
    author: "Rui Lemos",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    res.send({ error: "No address query parameter provided" });
  } else {
    geocode(address, (error, { latitude, longitude, label } = {}) => {
      if (error) {
        res.send({ error });
      } else {
        forecast(latitude, longitude, (error, forecast) => {
          if (error) {
            res.send({ error });
          } else {
            res.send({
              address,
              location: label,
              forecast,
            });
          }
        });
      }
    });
  }
});

app.get("/products", (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.send({ error: "No search query parameter provided" });
  } else {
    console.log(req.query);
    res.send({ products: [] });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "About Weather app",
    author: "Rui Lemos",
    errorMsg: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "About Weather app",
    author: "Rui Lemos",
    errorMsg: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Express is up and running on port ${port}`);
});
