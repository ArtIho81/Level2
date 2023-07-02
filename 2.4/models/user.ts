import { Schema, Model, model } from "mongoose";
import { Task, User } from "./types";

const taskSchema: Schema<Task> = new Schema<Task>({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

const userSchema: Schema<User> = new Schema<User>({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [taskSchema],
  },
});

export const UserModel: Model<User> = model<User>("User", userSchema);

