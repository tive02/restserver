const express = require("express");

class Server {
  constructor() {
    this.app = express;
  }
  //rutas
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/", function (req, res) {
      res.send("hello world");
    });
  }
}
