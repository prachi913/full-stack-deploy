const mongoose = require("mongoose");

const usershemam = mongoose.Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  author: { type: String, require: true },
  category: { type: String, require: true },
  authorid: { type: String, require: true },
});

const notemodel = mongoose.model("note", usershemam);

module.exports = {
  notemodel,
};
