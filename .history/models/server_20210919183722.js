const express = require("express");
const cors = require("cors");

const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      //creacion usuarios
      auth: "/api/auth",
      //categorias de los productos.
      categories: "/api/categories",
      // productos.
      products: "/api/products",
      //Busqueda
      search: "/api/search",
      //Subida de archivos
      uploads: "/api/uploads",
      //Autenticacion de usuarios
      users: "/api/users",
    };
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

    // Fileupload - Carga de archivos

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }
  // respond with "hello world" when a GET request is made to the homepage
  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
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
