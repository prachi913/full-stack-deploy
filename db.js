const mongoose = require("mongoose")
require("dotenv").config()

// const connectionn = mongoose.connect("mongodb://localhost:27017/userdata");
const connectionn = mongoose.connect(process.env.mongourl);

// module.exports={connectionn};

module.exports = {
  connectionn,
};
