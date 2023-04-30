const mongoose = require("mongoose")

const usershema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  pass: { type: String, require: true },
  age: { type: Number, require: true },
  
});

const usermodel = mongoose.model("user", usershema)

module.exports = {
  usermodel,
};
