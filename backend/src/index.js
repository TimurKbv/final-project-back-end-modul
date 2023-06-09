import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDb } from './service/db.service.js';
import authRouter from './routes/auth.route.js';
import todosRouter from './routes/todos.route.js';
import userRouter from './routes/users.route.js';


// Lade Umgebungsvariablen (engl. enviroment variables) aus der .env Datei
dotenv.config();

// Initialisiere express
const app = express();

// Middleware fuer das body-Parsing
app.use(express.json());

// Middleware fuer CROSS-ORIGIN-REQUEST
app.use(cors({
    origin: 'http://localhost:5173',
    // credentials: true
}));

// --------------------- ROUTES -------------------------
app.use('/auth', authRouter);

app.use('/todolists', todosRouter);

app.use('/users', userRouter);

// Einmalig Verbindung ueber default Connection aufbauen
// es kann noch ein Callback mitgeliefert werden
await connectToDb();

// ----------------------------------------------------------
// Starte Server auf in der Config hinterlegtem Port
app.listen(process.env.API_PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.API_PORT}`);
});