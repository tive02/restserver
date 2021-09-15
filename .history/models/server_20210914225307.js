const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths={
      
      //creacion usuarios
      users = "/api/users",
      //Autenticacion de usuarios
      auth = "/api/auth",

    }
    //Conectar la base de datos
    this.connectDB();

    //middlewares
    this.middlewares();
    //rutas de la aplicacion
    this.routes();
  }
  //Connectar a la base de datos
  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/user"));
  }
  //Escuchar
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
