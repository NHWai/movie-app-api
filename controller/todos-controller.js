const TodoService = require("../service/TodoService");

const getAllTodos = async (req, res, next) => {
  console.log("reqtime =>", req.requestTime);
  try {
    const todolist = await TodoService.getAllTodos();
    if (!todolist) throw Error("Cannot find all todos");
    res.json(todolist);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
};

function redirectGetAllTodos(req, res, next) {
  res.redirect(301, "/api/todos");
}

async function getTodoById(req, res, next) {
  const id = req.params["id"];
  try {
    const todo = await TodoService.getToDoById(id);
    if (!todo) throw Error("Cannot find relative todo");
    res.status(200).json(todo);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function createNewTodo(req, res, next) {
  try {
    const todo = await TodoService.saveTodo(req.body);
    if (!todo) throw Error("Cannot save new todo");
    res.status(201).json(todo);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function updateTodoById(req, res, next) {
  const todoId = req.params.id;
  const todoItem = req.body;

  try {
    const todo = await TodoService.updateTodo(todoId, todoItem);

    if (!todo) throw Error("Cannot update todo");
    res.status(200).json(todo);
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
  }
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  try {
    const todo = await TodoService.deleteTodo(todoId);
    if (!todo) throw Error("Cannot find and delete todo");
    res.status(204).json({});
  } catch (err) {
    res
      .status(400)
      .json({ Error: Object.keys(err).length === 0 ? err.message : err });
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
