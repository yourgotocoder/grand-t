import { deleteTodo } from "../lib/action";
import Todo from "../models/todoModel";
import React from "react";

export default async function GetTodosUI() {
  try {
    const todos = await Todo.find();
    if (todos.length === 0) {
      return <h1>No todos</h1>;
    } else {
      return (
        <div>
          {todos.map((todo) => (
            <div key={todo._id as string}>
              <h3>{todo.todo as string}</h3>
              <p>{todo.todoDeadline.toLocaleDateString()}</p>
              <p>{todo._id.toString()}</p>
              <form action={deleteTodo}>
                <input
                  hidden
                  type="text"
                  name="id"
                  defaultValue={todo._id.toString()}
                />
                <button className="border rounded p-2 bg-red-400">
                  delete
                </button>
              </form>
            </div>
          ))}
        </div>
      );
    }
  } catch (error) {
    console.log(error);
  }
}
