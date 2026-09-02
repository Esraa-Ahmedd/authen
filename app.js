import express from "express"
const app=express();
import authrouter from "./Router/auth_router.js"
import cookieParser from "cookie-parser";
 import bookRouter from "./Router/books_routes.js";
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set('view engine','ejs')
 import dotenv from "dotenv"
import mongoose from "mongoose";
 dotenv.config()

const dsUrl=process.env.mongo_url;
const PORT=process.env.PORT||3009;

 app.use("/", authrouter)
 app.use("/books", bookRouter);
mongoose.connect(dsUrl)
.then(()=>{
    app.listen(PORT,()=>{
  console.log("server running");
    })
  
    
})
.catch((err)=>{
console.log("error happend",err);

})
export default app;
