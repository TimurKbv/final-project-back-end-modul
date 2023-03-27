import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { addTodoList } from '../model/todoList.model.js';

import * as UserModel from "../model/user.model.js";







// Controller Funktion zum Anlegen neuer User
export async function registerNewUser(req, res) {
    let body = req.body;

    // Ueberschreibe password-Property im body mit dem Hash des Passworts
    body.password = bcrypt.hashSync(body.password, 10);

    try {
        // Fuehre Model-Funktion zum Einfuegen eines neuen Users aus
        const user = await UserModel.insertNewUser(body);

        // Sende Erfolgsmeldung zurueck
        res.send({success: true, user: user});

    } catch (error) {
        console.log(error);
        // TODO verfeinern, weil es unterschiedliche Fehler geben kann: 400 & 409
        res.status(error.code).send({
            success: false,
            message: error.message,
            code: error.code
        });
    }
}

// Controller Funktion zum Einloggen bestehender User
export async function login(req, res) {
    // extrahiere Properties aus dem body
    let { username, password } = req.body;

    // Hole entsprechenden User per username aus der DB
    let user = await UserModel.findUserByUsername(username);

    // Wenn user nicht gefunden wurde
    if (user === null) {
        // Sende 401 (UNAUTHORIZED) mit Nachricht
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
        // early return
        return;
    }

    // Vergleiche uebermitteltes password mit dem gehashten password aus der DB
    if (bcrypt.compareSync(password, user.password)) {
        // Erstelle neuen JWT Token mit payload und Verfall nach einer Stunde (60 Minuten * 60 Sekunden)
        let token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        // Token als httpOnly cookie
        // res.cookie('access_token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true })

        // Sende Erfolgsnachricht sowie neuen Token zurueck
        res.send({
            success: true,
            message: `User ${user.username} logged in successfully!`,
            id: user._id,
            username: user.username,
            email: user.email,
            fullname: user.fullname,
            token: token
        });

    } else {
        // Passwort falsch -> Sende Fehlermeldung zurueck
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
    }
}


export async function getAllUsers(req, res) {
    res.send(await UserModel.getAll());
}


export async function findUserByUserId(req, res) {
    let userId = req.tokenPayload.userId;
    console.log(userId);
    try {
        let user = await UserModel.findUserById(userId);
        console.log(user);

        res.send({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(error.code).send({
            success: false,
            message: error.message
        })
    }
}