import mongoose from "mongoose";

// Notebook schema for notebooks & pads in the marketplace
// Defines the structure for notebook data stored in MongoDB
const NotebookSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  type: String, // A4 Pads, A5 Pads, Dot Grid, Hardcover Notebooks, Softcover Notebooks, Sticky Notes, Index Tabs
  cover_type: String, // Hard Cover, Soft Cover
  page_style: String, // Lined, Blank, Dot Grid, etc.
  price: Number,
  description: String,
});

// Export Notebook model with specific collection name
export default mongoose.models.Notebook || mongoose.model("Notebook", NotebookSchema, "notebooks");
