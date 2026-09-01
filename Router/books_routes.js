
import { Router } from "express";
const bookRouter = Router();
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from "../controller/books.js";

import {
    requireAuth,
    requireAdmin
} from "../middleWare/auth-middleWare.js";



bookRouter.get("/", getAllBooks);

bookRouter.get("/:id", getBookById);

bookRouter.post("/", requireAuth,requireAdmin, createBook);

bookRouter.put("/:id", requireAuth, updateBook);

bookRouter.delete("/:id",requireAuth,requireAdmin,deleteBook
);

export default bookRouter;