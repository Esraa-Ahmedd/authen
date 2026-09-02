import { Router } from "express";
import { login_get, login_post, logout_get, signUp_get, signUp_post } from "../controller/auth_controller.js";

const authrouter=Router();


authrouter.get("/signup",signUp_get)
authrouter.get("/login",login_get)
authrouter.get("/logout",logout_get)
authrouter.post("/signup",signUp_post)
authrouter.post("/login",login_post)
export default authrouter