import { Router } from "express";
import jwt from 'jsonwebtoken';
import { addTodoToList, addTodoListToUser,  getAllTodosOfUser, deleteTodoById, deleteTodoList, editTodoList, editTodoById, getTodoList, getAllTodoLists } from "../controller/todos.controller.js";

// Middleware-Funktion zum Validieren von Tokens im Header
export function verifyToken(req, res, next) {
    // Wenn Authorization im Header nicht gesetzt, breche ab und sende Fehler
    if (!req.headers.authorization) return res.status(401).send({success: false, message: 'Token missing'});
    // if (!req.cookies.access_token) return res.status(401).send({success: false, message: 'Token missing'});

    // Extrahiere Token aus dem authorization Feld im HTTP Request Header
    let token = req.headers.authorization.split(' ')[1];
    // let token = req.cookies.access_token.split(' ')[1];

    // Verifiziere extrahierten Token mittels Signaturpruefung
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        // Wenn Verifizierung fehlgeschlagen, brich ab und sende Fehler
        if (err) return res.status(401).send({success: false, message: 'Invalid token'});

        // Alles gut, speichere payload im req-Objekt
        req.tokenPayload = payload;

        // Fahre mit Anfrage fort
        next();
    });
}

// Erstelle neue Router Instanz
const todosRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
todosRouter.use(verifyToken);



    // /todolists/
todosRouter.route('/')
    .post(addTodoListToUser)  // Ein Todo List dem user zufügen
    .get(getAllTodoLists) // alle LIsten von user
    
todosRouter.route('/:listId')
    .put(editTodoList) // List bearbeiten
    .delete(deleteTodoList) // lösche list
    .get(getTodoList) // Ganze list bekommen 

    // /todolists/:listId/todos
todosRouter.route('/:listId/todos')   
    .get(getAllTodosOfUser) // get alle todos von user
    .post(addTodoToList) // ein todo erstellen
    

    // /todolists/:listId/todos/:todoId
todosRouter.route('/:listId/todos/:todoId')
    .delete(deleteTodoById) // lösche ein todo
    .put(editTodoById)  // bearbeite ein todo


    



export default todosRouter;