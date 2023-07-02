const express = require("express");
const fs = require("fs");
const pathId = "todosId.json";
const cors = require("cors");
const mongoose = require("mongoose");

let lastId = require(`./${pathId}`);

const taskSchema = new mongoose.Schema({
  id: Number,
  text: String,
  checked: Boolean,
});
const Task = mongoose.model("Task", taskSchema);

const PORT = 3005;
const db =
  "mongodb+srv://ihor:myy44SLS8asrRPhw@cluster0.ptxhzap.mongodb.net/ToDo?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("Connect DB"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("front"))

app
  .route("/api/v1/items")
  .get(async (req, res) => {
    console.log("GET");
    try {
      //if (!req.session.login) return res.status(403).json({ error: "forbidden" });
      const items = await Task.find();
      res.json({ items });
    } catch (error) {
      console.error(error);
    }
  })
  .post(async (req, res) => {
    console.log("POST");
    const id = ++lastId;
    reWriteFile(pathId, id);
    const text = req.body.text;
    const checked = false; //true;
    try {
      await new Task({ id, text, checked }).save();
      res.json({ id });
    } catch (error) {
      console.error(error);
    }
  })
  .put(async (req, res) => {
    console.log("PUT");
    const item = req.body;
    const update = { $set: { checked: !item.checked } };
    try {
      await Task.updateOne({ id: item.id }, update);
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  })
  .delete(async (req, res) => {
    console.log("DELETE");
    const id = req.body.id;
    try {
      await Task.deleteOne({ id });
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

function getUserFromData(user) {
  return users.find((el) => el.login === user);
}

function reWriteFile(path, obj) {
  fs.writeFileSync(path, JSON.stringify(obj));
}
