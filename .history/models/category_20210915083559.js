const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  role: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Category", CategorySchema);
