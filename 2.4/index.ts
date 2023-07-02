import express = require("express");
import cors = require("cors");
import fs = require("fs");
import mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id: Number,
  text: String,
  checked: Boolean,
});
const Task = mongoose.model("Task", taskSchema);

const app = express();

const pathId: string = "data/todosId.json";
const pathItems: string = "data/todosItems.json";

type item = { id: number; text: string; checked: boolean };

let lastId: number = require(`./${pathId}`);

const PORT: number = 3005;
const password: string = "myy44SLS8asrRPhw";
const database: string = "ToDo";
const db: string = `mongodb+srv://ihor:${password}@cluster0.ptxhzap.mongodb.net/${database}?retryWrites=true&w=majority`;

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(db);
    console.log("Connect DB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.static("front"));

app
  .route("/api/v1/items")
  .get(async (req, res) => {
    console.log("GET");
    try {
      const items: item[] = await Task.find();
      res.json({ items });
    } catch (error) {
      console.error(error);
    }
  })
  .post(async (req, res) => {
    console.log("POST");
    const id: number = ++lastId;
    reWriteFile(pathId, id);
    const text: string = req.body.text;
    const checked: boolean = true;
    try {
      await new Task({ id, text, checked }).save();
      res.json({ id });
    } catch (error) {
      console.error(error);
    }
  })
  .put(async (req, res) => {
    console.log("PUT");
    const item: item = req.body;
    type taskUpdate = { [key: string]: { [key: string]: string | boolean } };
    const update: taskUpdate = {
      $set: { text: item.text, checked: item.checked },
    };
    try {
      await Task.updateOne({ id: item.id }, update);
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  })
  .delete(async (req, res) => {
    console.log("DELETE");
    const id: number = req.body.id;
    try {
      await Task.deleteOne({ id });
      res.json({ ok: true });
    } catch (error) {
      console.error(error);
    }
  });

startServer();

function reWriteFile(path: string, obj: number | item[]): void {
  fs.writeFile(path, JSON.stringify(obj), (error) => console.log(error));
}

