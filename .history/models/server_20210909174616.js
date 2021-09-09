const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //middlewares

    //rutas de la aplicacion
    this.routes();
  }
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/", (req, res) => {
      res.send("hello world");
    });
  }
  //Escuchar
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
