import mongoose from "mongoose";
import * as TodoModel from "./todoList.model.js";

// User schema
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
    city: { type: String },
    lastLogin: {type: Date, default: Date.now()}
}, { timestamps: true });
// Erstelle ein neues Model Objekt fuer User

const User = mongoose.model('User', userSchema);

// Erstellt automatisch users Collection in der MongoDB, wenn noch nicht vorhanden



// DB-Funktion zum Abrufen eines bestimmten User-Eintrags per username
export async function findUserByUsername(username) {
    let user = await User.findOne({username: username});
    user.lastLogin = Date.now();
    return user.save();
}

// DB-Funktion zum Erstellen eines neuen User-Eintrags
export async function insertNewUser(userBody) {
    try {
        let isUserRegistered = await User.findOne({username: userBody.username});

        if (isUserRegistered !== null) {
            throw {
                code: 409,
                message: `User wiht username: ${userBody.username} is alredy registered!`
            }
        }
        // Erstelle neue Instanz des User Models
        const newUser = new User(userBody);

        // Speichere neue Instanz
        let user = await newUser.save();

        TodoModel.addTodoList(user._id, 'Personal');

        return user;

    } catch (error) {
        // Pruefe, ob Conflict durch Dupletten-Verletzung
        if ( (error.hasOwnProperty('code')) && (error.code === 11000) ) {
            // Schmeisse entsprechendes Fehlerobjekt
            throw {
                code: 409,
                message: error.message
            };

        } else {
            // Muss ein Validierungsproblem sein
            // Schmeisse entsprechendes Fehlerobjekt
            throw {
                code: 400,
                message: error.message
            };
        }
    }
}

// DB-Funktion zum Abrufen aller User-Eintraege
export async function getAll() {
    return await User.find();
}

export async function findUserById(userId) {
    let user = await User.findById(userId);
    if (!user) {
        throw {
            code: 404,
            message: `User with id: ${userId} not found`
        }
    }
    let userData = {
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        city: user.city,
        _id: user._id,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
    }
    return userData;
}