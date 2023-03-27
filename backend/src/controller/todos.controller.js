import * as TodosModel from '../model/todoList.model.js'

// Controller zum abrufen todos von einer User


/* -----------------TODO LIST------------------- */
// ALLE todolisten von user
export async function getAllTodoLists(req, res) {
    let userId = req.tokenPayload.userId;
    try {
        let allLists = await TodosModel.findByUserId(userId);
        console.log(allLists);
        res.send({
            success: true,
            data: allLists
        })
    } catch (error) {
        
    }
}
// ADD TODO LIST
export async function addTodoListToUser(req, res) {
    let userId = req.tokenPayload.userId;
    let listName = req.body.name;
    try {
        let newList = await TodosModel.addTodoList(userId, listName);
        res.send({
            success: true,
            data: newList
        })
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}
// DELETE TODO LIST
export async function deleteTodoList(req, res) {
    let userId = req.tokenPayload.userId;
    let listId = req.params.listId;
    try {
        let deletedTodoList = await TodosModel.deleteTodoListById(listId, userId);
        res.send({
            success: true,
            data: deletedTodoList
        });
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}

// UPDATE TODO LIST
export async function editTodoList(req, res) {
    let userId = req.tokenPayload.userId;
    let listId = req.params.listId;
    let body = req.body;
    try {
        let editedTodoList = await TodosModel.updateTodoList(listId, userId, body);
        console.log(editedTodoList);
        res.send({
            success: true,
            data: editedTodoList
        });
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}
// get todolist mit allem
export async function getTodoList(req, res) {
    let userId = req.tokenPayload.userId;
    let listId = req.params.listId;
    try {
        let todoList = await TodosModel.findTodoList(listId, userId);
        res.send(todoList);
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}


/* -----------------------TODO--------------------------- */

// get todos nach listenId und userId
export async function getAllTodosOfUser(req, res) {

    let userId = req.tokenPayload.userId;
    let listId = req.params.listId;
    
    try {
        let todos = await TodosModel.getTodosOfUserById(userId, listId);
        console.log(todos);
        res.send(todos)
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}
// erstelle todo
export async function addTodoToList(req, res) {
    let userId = req.tokenPayload.userId;
    let text = req.body.text;
    let listId = req.params.listId;

    try {
        let todoList = await TodosModel.addTodo(userId, text, listId);
        res.send({
            success: true,
            data: todoList.todos
        });
    } catch (error) {
        res.status(error.code).send({
            error: error.message
        });
    }
}

// delete todo
export async function deleteTodoById(req, res) {
    let listId = req.params.listId;
    let todoId = req.params.todoId;
    let userId = req.tokenPayload.userId;

    try {
        let deletedTodo = await TodosModel.deleteTodo(listId, todoId, userId);
        console.log(deletedTodo);
        res.send(deletedTodo)
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}

// bearbeite todo
export async function editTodoById(req, res) {
    let listId = req.params.listId;
    let todoId = req.params.todoId;
    let userId = req.tokenPayload.userId;
    // let newText = req.body.text;
    let todoBody = req.body;
    console.log(todoBody);
    try {
        let editedTodo = await TodosModel.editTodo(listId, todoId, userId, todoBody);
        console.log(editedTodo);
        res.send({
            success: true,
            data: editedTodo
        })
    } catch (error) {
        console.log(error);
        res.status(error.code).send({
            error: error.message
        });
    }
}