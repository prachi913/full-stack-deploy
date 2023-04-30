// const express = require("express");
const { notemodel } = require("../model/notesmodel");
const { Router } = require("express");
const notesrouter = Router();

notesrouter.post("/create", async (req, res) => {
  try {
    const note = new notemodel(req.body);
    await note.save();
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});
notesrouter.get("/", async (req, res) => {
  try {
    const note = await notemodel.find({ authorid: req.body.authorid });

    res.status(200).send(note);
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

notesrouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const note = await notemodel.findOne({ _id: id });
  try {
    if (req.body.authorid !== note.authorid) {
      res.send("you are not user");
    } else {
      const note = await notemodel.findByIdAndUpdate({ _id: id }, req.body);

      res.status(200).send({ msg: `notes updede id:${id} `, note });
    }
    //  644d36e84ac4d185bb6c0255
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

notesrouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const note = await notemodel.findOne({ _id: id });
  try {
    if (req.body.authorid !== note.authorid) {
      res.send("you are not user");
    } else {
      await notemodel.findByIdAndDelete({ _id: id });

      res.status(200).send({ msg: "deleted" });
    }
  } catch (error) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  notesrouter,
};
