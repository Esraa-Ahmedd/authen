import Book from "../model/book-model.js";

// CREATE BOOK
export const createBook = async (req, res) => {

    try {

        const book = await Book.create(req.body);

        res.status(201).json(book);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};

// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


// GET BOOK BY ID
export const getBookById = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (err) {

        res.status(400).json({
            message: "Invalid book ID"
        });

    }

};


// UPDATE BOOK
export const updateBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book
        });

    } catch (err) {

        res.status(400).json({
            message: err.message
        });

    }

};


// DELETE BOOK
export const deleteBook = async (req, res) => {

    try {

        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (err) {

        res.status(400).json({
            message: "Invalid book ID"
        });

    }

};




