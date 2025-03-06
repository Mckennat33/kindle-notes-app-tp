const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const Book = require("../models/book.js");

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

// Function to test saving a book
const testBookSchema = async () => {
    await connectDB();

    try {
        // Check connection state
        console.log("Mongoose Connection State:", mongoose.connection.readyState);

        // Create a sample book
        const newBook = new Book({
            author: "Test Author",
            title: "Test Book Title",
            notes: ["This is a test note.", "Another test note."],
        });

        console.log("Attempting to save book:", newBook);

        // Save the book
        await newBook.save();
        console.log("✅ Book saved successfully!");

        // Fetch all books to confirm it was saved
        const allBooks = await Book.find();
        console.log("📚 All Books in DB:", allBooks);

    } catch (error) {
        console.error("❌ Error saving book:", error);
    } finally {
        mongoose.connection.close();
        console.log("🔌 Disconnected from MongoDB");
    }
};

// Run the test
testBookSchema();