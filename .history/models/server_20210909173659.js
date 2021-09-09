const express = require("express");

class Server {
  constructor() {
    this.app = express;
    this.port = process.env.PORT;
    this.routes();
  }
  //rutas
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/", (req, res) => {
      res.send("hello world");
    });
  }
  //Escuchar
  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor corriendo en el puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
