const express = require("express");
const router = express.Router();
const TodosController = require("../controller/todos-controller");

/*Get Todos Page*/

router.get("/", TodosController.getAllTodos);
router.get("/todolist", TodosController.redirectGetAllTodos);
router.get("/:id", TodosController.getTodoById);

//create new todo
router.post("/", TodosController.createNewTodo);

//update todo
router.put("/:id", TodosController.updateTodoById);

//delete todo
router.delete("/:id", TodosController.deleteTodo);

module.exports = router;
