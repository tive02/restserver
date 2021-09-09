const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //middlewares
    this.middlewares();
    //rutas de la aplicacion
    this.routes();
  }
  middlewares() {
    //Directorio publico
    this.app.use(express.static("public"));
  }
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/api", (req, res) => {
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
