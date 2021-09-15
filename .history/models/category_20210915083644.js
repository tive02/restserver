const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El Nombre es obligatorio"],
  },
});

module.exports = model("Category", CategorySchema);
