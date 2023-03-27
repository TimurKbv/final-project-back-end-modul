import mongoose from "mongoose";


// ---------------------------------------------
// Definiere Todo Schema als sub-document
const todoSchema = mongoose.Schema({
    text: {type: String, required: true},
    isChecked: {type: Boolean, required: true},
});

// ------------------------------------------------------
// Definiere TodoList Schema
const todoListSchema = mongoose.Schema({
    name: {type: String, required: true},
    authors: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    todos: [todoSchema]
});
// Erstelle ein neues Model Objekt fuer TodoList
const TodoList = mongoose.model('TodoList',todoListSchema);


// get todos von user
export async function getTodosOfUserById(userId, listId) {
    // finde todolist
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    // wenn nicht dann Fehler
    if (!author) {
        throw {
            message: `False authorization`,
            code: 403
        }
    }
    // GEBE ZURÜCK TODOS
    return list.todos;
}

// ein todo zufügen
export async function addTodo(userId, text, listId) {
    // erstelle todo object
    let newTodo = {
        text: text,
        isChecked: false,
    };
    // finde todolist
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 403
        }
    }
    // speichere neues todo in todolist und gebe zurück
    list.todos.push(newTodo);
    return await list.save();
}

// lösche todo
export async function deleteTodo(listId, todoId, userId) {
    // finde list
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    console.log(author);
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde todo der gelöscht werden muss,, um diesen zurück geben
    let deletedTodo = list.todos.find(todo => todo._id.toString() === todoId);
    // wenn todo nicht gefunden dann fehler
    if (!deletedTodo) {
        throw {
            message: `Todo with id: ${todoId} not found`,
            code: 404
        }
    }
    // mit filter neue todo erstellen ohne todo der gelöscht werden muss
    let newList = list.todos.filter(todo => {
        return todo._id.toString() !== todoId;
    });
    // speichere neue list
    list.todos = newList;
    await list.save();
    // gebe zurück gelöschtes zurück
    return deletedTodo;
}

// bearbeite todo 
export async function editTodo(listId, todoId, userId, /* newText */ todoBody) {
    // finde todolist
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // finde und prufe author ob er die Rechte hat
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde todoIndex
    let todoIndex = list.todos.findIndex(todo => todo._id.toString() === todoId);
    // wenn Index kleiner  0 (nicht exist) dann fehler
    if (todoIndex < 0) {
        throw {
            message: `Todo with id: ${todoId} not found`,
            code: 404
        }
    }
    // nach index text von todo erneuern und speichern
    // list.todos[todoIndex].text = newText;
    let currTodo = list.todos[todoIndex];

    for (const key in currTodo) {
        if (todoBody.hasOwnProperty(key)) {
            currTodo[key] = todoBody[key];
        }
    }
    list.todos[todoIndex] = currTodo;
    await list.save();
    // gebe bearbeitete todo zurück
    return currTodo;
}


/* ------------------TODO LISTS------------------------ */
// ein todolist erstellen
export async function addTodoList(userId, name) {
    // erstelle neue todolist
    let newTodoList = new TodoList({
        name: name,
        authors: [userId],
        todos: []
    });
    // speichere und gebe zurück neue todolist
    return await newTodoList.save();
}
// lösche totolist
export async function deleteTodoListById(listId, userId) {
    // finde todolist nach index
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde, lösche und gebe zurück 
    return await TodoList.findByIdAndDelete(listId);
}

// bearbeite todolist
export async function updateTodoList(listId, userId, body) { 
    // finde todolist
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // schliesse aus der body todos aus
    delete body.todos;
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // finde , bearbeite und gebe zurück
    return await TodoList.findOneAndUpdate( {_id: listId}, body, {new: true} );
}

// finde todolist nach id
export async function findTodoList(listId, userId) {
    // finde todolist nach id
    let list = await findById(listId);
    // wenn list nicht gefunden dann fehler   
    if (!list) {
        throw {
            message: `Todo list with id: ${listId} not found`,
            code: 404
        }
    }
    // prüfe ob user die rechte hat todolist zu löschen
    let author = list.authors.find(author => {
        return author.toString() === userId;
    });
    if (!author) {
        throw {
            message: `False authorization`,
            code: 401
        }
    }
    // gebe zurück gefundene todolist
    return list;
}
// alle listen die dem user gehören (ohne todos)
export async function findByUserId(userId) {
    let lists = await TodoList.find({authors: userId});

    let searchedLists = lists.map(list => {
        return {
            _id: list._id,
            name: list.name,
            authors: list.authors
        }
    });

    return searchedLists;
}



// -------------helpers--------
export async function findById(id) {

    return await TodoList.findById(id);
}

export async function findByName(name) {
    return await TodoList.findOne({name: name});
}

export async function getAllLists() {

    return await TodoList.find({});
}