require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto", process.env.PORT);
});
