const express = require("express");

class Server {
  constructor() {
    this.app = express;
    this.routes();
  }
  //rutas
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/", (req, res) => {
      res.send("hello world");
    });
  }
}

module.exports = Server;
