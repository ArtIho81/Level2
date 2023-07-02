
import { Request, Response } from "express";
import fs = require("fs");
import { Task, User } from "./models/types";
import { UserModel } from "./models/user";
import bcrypt = require("bcrypt");

const pathId: string = "data/todosId.json";
let lastId: number = require(`./${pathId}`);

async function handleLogin(req: Request, res: Response) {
  console.log("LOGIN");
  try {
    const { login, pass }: { login: string; pass: string } = req.body;
    const user: User | null = await UserModel.findOne({ login });
    if (!user) {
      return res
        .status(400)
        .json({ error: `user ${login} not found or invalid password` });
    }
    const validPassword: boolean = await bcrypt.compare(pass, user.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ error: `user ${login} not found or invalid password` });
    }
    req.session.login = login;
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
async function handleLogout(req: Request, res: Response) {
  console.log("LOGOUT");
  req.session.destroy((err: Error) => {
    if (err) {
      console.log(err);
    }
  });
  res.json({ ok: true });
}

async function handleRegister(req: Request, res: Response) {
  try {
    const { login, pass }: { login: string; pass: string } = req.body;
    const user: User | null = await UserModel.findOne({ login });
    if (user)
      return res.status(400).json({ error: `user ${login} already exist` });
    const password: string = await bcrypt.hash(pass, 10);
    const tasks: Task[] = [];
    await new UserModel({ login, password, tasks }).save();
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

async function handleGetItems(req: Request, res: Response) {
  console.log("GET");
  try {
    const login: string | undefined = req.session.login;
    if (!login) return res.status(403).json({ error: "forbidden" });
    const user: User | null = await UserModel.findOne({ login });
    if (user) res.json({ items: user.tasks });
  } catch (error) {
    console.error(error);
  }
}

async function handleDeleteItem(req: Request, res: Response) {
  console.log("DELETE");
  try {
    const id: number = req.body.id;
    const login: string | undefined = req.session.login;
    if (login) {
      const user: User | null = await UserModel.findOne({ login });
      if (user) {
        const tasks = user.tasks.filter((task) => task.id !== id);
        await UserModel.updateOne({ login }, { $set: { tasks } });
        res.json({ ok: true });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

async function handleAddItem(req: Request, res: Response) {
  console.log("ADD");
  try {
    const id: number = ++lastId;
    fs.writeFileSync(pathId, JSON.stringify(id));
    const text: string = req.body.text;
    const checked: boolean = false; //true;
    const login: string | undefined = req.session.login;
    if (login) {
      const user: User | null = await UserModel.findOne({ login });
      if (user) {
        let tasks = user.tasks;
        tasks.push({ id, text, checked });
        await UserModel.updateOne({ login }, { $set: { tasks } });
        res.json({ id });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

async function handleEditItem(req: Request, res: Response) {
  console.log("EDIT");
  try {
    const { id, text, checked }: Task = req.body;
    const login: string | undefined = req.session.login;
    if (login) {
      const user: User | null = await UserModel.findOne({ login });
      if (user) {
        const tasks: Task[] = user.tasks.map((task) =>
          task.id === id ? { id, text, checked } : task
        );
        await UserModel.updateOne({ login }, { $set: { tasks } });
        res.json({ ok: true });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
export const actions: { [key: string]: Function } = {
  login: handleLogin,
  logout: handleLogout,
  register: handleRegister,
  getItems: handleGetItems,
  deleteItem: handleDeleteItem,
  createItem: handleAddItem,
  editItem: handleEditItem,
};


// async function findUserInDatabase(login: string): Promise<User | null> {
//   return await UserModel.findOne({ login });
// }

