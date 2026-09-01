import express from "express"
const app=express();
import authrouter from "./Router/auth_router.js"
import cookieParser from "cookie-parser";
 import bookRouter from "./Router/books_routes.js";
import {requireAuth,checkUser} from "./middleWare/auth-middleWare.js";
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set('view engine','ejs')
 import dotenv from "dotenv"
import mongoose from "mongoose";
 dotenv.config()

const dsUrl=process.env.mongo_url;
const PORT=process.env.PORT||3009;
const secret=process.env.JWT_SECRET
 app.use("/", authrouter)
 app.use("/books", bookRouter);
mongoose.connect(dsUrl)
.then(()=>{
    app.listen(PORT,()=>{
  console.log("server running");
    })
  
    
})
.catch((err)=>{
console.log("error happend");

})


