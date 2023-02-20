const TodoService = require("../service/TodoService");

async function getAllTodos(req, res, next) {
  console.log("reqtime =>", req.requestTime);
  const todolist = await TodoService.getAllTodos();
  res.json(todolist);
}

function redirectGetAllTodos(req, res, next) {
  res.redirect(301, "/todos");
}

async function getTodoById(req, res, next) {
  const id = req.params.id;
  try {
    const todo = await TodoService.getToDoById(id);
    if (!todo) throw Error("Cannot find relative todo");
    await res.status(200).json(todo);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

async function createNewTodo(req, res, next) {
  try {
    const todo = await TodoService.saveTodo(req.body);
    if (!todo) throw Error("Cannot save new todo");
    await res.status(201).json(todo);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

async function updateTodoById(req, res, next) {
  const todoId = req.params.id;
  const todoItem = req.body;

  try {
    const todo = await TodoService.updateTodo(todoId, todoItem);

    if (!todo) throw Error("Cannot update todo");
    await res.status(200).json(todo);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  try {
    const todo = await TodoService.deleteTodo(todoId);
    if (!todo) throw new Error("Cannot delete todo");
    await res.status(200).json(todo);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

module.exports = {
  getAllTodos,
  createNewTodo,
  deleteTodo,
  redirectGetAllTodos,
  getTodoById,
  updateTodoById,
};
