
import express from"express";
import { login, register, logout } from "../controllers/authcontroller.js";
import auth from"../middlewares/auth.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", auth, logout);


export default route;