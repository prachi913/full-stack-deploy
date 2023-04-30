const { usermodel } = require("../model/usermodel.js");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userrouter = Router();

userrouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      const userer = new usermodel({ email, name, age, pass: hash });
      await userer.save();
      res.send({ msg: "new user registered" });
    });
  } catch (error) {
    res.send(error);
  }
});
userrouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await usermodel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorid: user._id, author: user.name },
            "masai"
          );

          res.status(200).send({ msg: "login successfull", token: token });
        } else {
          res.status(200).send({ msg: "wrong" });
        }
        // result == false
      });
    } else {
      res.status(200).send({ msg: "wrong" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = {
  userrouter,
};
