const mongoose = require("mongoose");

// Conexion a la base de datos (atlas)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("successful connection to mongodb atlas"))
  .catch((error) => console.log(error));
