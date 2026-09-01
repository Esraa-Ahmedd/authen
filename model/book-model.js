import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter book title"]
    },

    author: {
        type: String,
        required: [true, "Please enter author"]
    },

    price: {
        type: Number,
        required: [true, "Please enter book price"],
        min: [0, "Price cannot be negative"]
    }
});

const Book = mongoose.model("Book", bookSchema);

export default Book;