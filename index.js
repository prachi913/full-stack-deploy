const express = require("express");
const { connectionn } = require("./db");
const { userrouter } = require("./routes/userroute");

const { auth } = require("./middleware/authmiddle");
const { notesrouter } = require("./routes/noterouter");
require("dotenv").config()
const cors = require("cors")

const app = express();
// hjklkjhghjk

app.use(
  cors({
    origin: ["https://www.section.io", "http://localhost:3000"]
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("hi");
});
app.use("/users", userrouter);

app.use(auth);
app.use("/note", notesrouter);

// app.get("/movie", (req, res) => {
//   // const token = req.headers.authorization
//   //   // .split(" ")[1];
//   //   // .split(" ")[1]
//   //    jwt.verify(token, "masai", (err, decoded)=>{
//   //        if (decoded) {
//   //         res.send("movie data")
//   //        } else {
//   //            res.send("err")
//   //     }
//   //    });
//   res.send("movie data")
// })
//  app.get("/series", (req, res) => {
//   //  const { token } = req.query;
//    const token = req.headers.authorization.split(" ")[1];
//    jwt.verify(token, "masai", (err, decoded) => {
//      if (decoded) {
//        res.send("series data");
//      } else {
//        res.send("err");
//      }
//    });
//  });

// app.use("/users", userrouter);

// app.listen(8000, async () => {
  app.listen(process.env.port, async () => {
    try {
      await connectionn;
      console.log(" all ok");
    } catch (error) {
      console.log(error);
    }
    console.log(process.env.port);
  });
