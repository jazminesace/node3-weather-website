const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jazmine"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jazmine"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Help",
    name: "Jazmine"
  });
});

app.get("/weather", ({ query }, res) => {
  if (!query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  console.log(req.query);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help",
    message: "Help article not found",
    name: "Jazmine"
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    message: "Page not found",
    name: "Jazmine"
  });
});

app.listen(port, () => {
  console.log("Server is up on port", port);
});
