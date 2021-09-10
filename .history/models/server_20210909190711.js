const express = require("express");
const cors = require("cors");

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
    //Cors
    this.app.use(cors());
    //Directorio publico
    this.app.use(express.static("public"));
  }
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.get("/api", (req, res) => {
      res.json({ msg: "get api" });
    });

    this.app.put("/api", (req, res) => {
      res.json({ msg: "put api" });
    });

    this.app.post("/api", (req, res) => {
      res.json({ msg: "post api" });
    });

    this.app.delete("/api", (req, res) => {
      res.json({ msg: "delete api" });
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
