let Todos = require("../models/Todos.js");

async function getToDoById(id) {
  return Todos.findById(id);
}

async function getAllTodos() {
  return Todos.find();
}

async function saveTodo(todo) {
  const newTodo = new Todos(todo);
  return newTodo.save();
}

async function updateTodo(id, todo) {
  const updatedOne = await Todos.findByIdAndUpdate(id, todo, { new: true });
  return updatedOne;
}

async function deleteTodo(id) {
  const deletedTodo = await Todos.findByIdAndDelete(id);
  return deletedTodo;
}

module.exports = {
  getAllTodos,
  getToDoById,
  saveTodo,
  updateTodo,
  deleteTodo,
};
