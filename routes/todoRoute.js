
import express from "express"
import { addTodo } from "../controller/TodoControllers/addTodo.js";
import { deleteTodo } from "../controller/TodoControllers/deleteTodo.js";
import { editTodo } from "../controller/TodoControllers/editTodo.js";
const route = express.Router();

route.post("/addTodo", addTodo);
route.put("/editTodo/:id", editTodo);
route.delete("/deleteTodo/:id", deleteTodo);

export default route;