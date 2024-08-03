import { deleteTodo } from "../lib/action";
import User from "../models/User";
import React from "react";

export default async function GetTodosUI() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return <h1>No todos</h1>;
    } else {
      return (
        <div>
          {users.map((user) => (
            <div key={user._id}>
              <h3>{user.name as string}</h3>
              <p>{user.email}</p>
              <p>{user.regno}</p>
              <form action={deleteTodo}>
                <input
                  hidden
                  type="text"
                  name="id"
                  defaultValue={user._id.toString()}
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
