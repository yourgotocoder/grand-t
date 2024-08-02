import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITodo {
  todo: string;
  todoDeadline: Date;
}

export interface ITodoDocument extends ITodo, Document {
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodoDocument>(
  {
    todo: {
      type: String,
      required: true,
    },
    todoDeadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Todo: Model<ITodoDocument> =
  mongoose.models?.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
