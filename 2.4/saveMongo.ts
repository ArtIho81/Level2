import express = require("express");
import { Request, Response } from "express";
import cors = require("cors");
import mongoose = require("mongoose");
import session = require("express-session");
const FileStore = require("session-file-store")(session);
import { actions } from "./func";

const PORT: number = 3005;
const dbPassword: string = "myy44SLS8asrRPhw";
const dbName: string = "ToDo";

declare module "express-session" {
  interface SessionData {
    login: string;
  }
}

const app = express();

async function startServer(): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb+srv://ihor:${dbPassword}@cluster0.ptxhzap.mongodb.net/${dbName}?retryWrites=true&w=majority`
    );
    console.log("Connect DB");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.static("front"));
app.use(
  session({
    store: new FileStore({
      path: "./sessions",
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app
  .route("/api/v1/items")
  .get(async (req: Request, res: Response) => await actions.getItems(req, res))
  .post(async (req: Request, res: Response) => await actions.createItem(req, res))
  .put(async (req: Request, res: Response) => await actions.editItem(req, res))
  .delete(
    async (req: Request, res: Response) => await actions.deleteItem(req, res)
  );
const authRoutes: { [key: string]: string } = {
  login: "/api/v1/login",
  logout: "/api/v1/logout",
  register: "/api/v1/register",
};

app.post(
  authRoutes.login,
  async (req: Request, res: Response) => await actions.login(req, res)
);
app.post(
  authRoutes.logout,
  async (req: Request, res: Response) => await actions.logout(req, res)
);
app.post(
  authRoutes.register,
  async (req: Request, res: Response) => await actions.register(req, res)
);

startServer();

app.post("/api/v2/router", async (req: Request, res: Response) => {
  const action = req.query.action as string | undefined;
  if (action && actions.hasOwnProperty(action)) {
    await actions[action](req, res);
  } else {
    res.status(400).json({ error: "Invalid action" });
  }
});