const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El Nombre es obligatorio"],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
