import mongoose from "mongoose";

// Book schema for course books in the marketplace
// Defines the structure for book data stored in MongoDB
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
  viewCount: { type: Number, default: 0 },
});

// Export Book model with specific collection name
export default mongoose.models.Book || mongoose.model("Book", BookSchema, "course_books");