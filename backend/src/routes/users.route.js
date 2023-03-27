import { Router } from "express";
import { findUserByUserId, getAllUsers } from "../controller/user.controller.js";
import { verifyToken } from "./todos.route.js";

// Erstelle neue Router Instanz
const userRouter = Router();

// Setze Tokenverifizierungs-Middleware fuer alle Endpoints des Routers
userRouter.use(verifyToken);


userRouter.route('/')
    .get(getAllUsers)


userRouter.route('/user')
    .get(findUserByUserId)






export default userRouter;
