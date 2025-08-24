import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  category: String,
  degree: String,
  major: String,
  year: Number,
  condition: String,
  price: Number,
  description: String,
});

// Specify collection name
export default mongoose.models.Book || mongoose.model("Book", BookSchema, "course_books");
