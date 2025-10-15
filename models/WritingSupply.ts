import mongoose from "mongoose";

// WritingSupply schema for writing supplies in the marketplace
// Defines the structure for writing supply data stored in MongoDB
const WritingSupplySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  category: String, // Pens, Pencils, etc.
  type: String, // Ballpoint, Gel, Fountain, Highlighters, Fineliners, Pencils, Erasers, Sharpeners
  colour: String, // Multi Coloured, Black, Blue, Red, etc.
  ink_type: String, // Black Ink, Blue Ink, etc.
  price: Number,
  description: String,
});

// Export WritingSupply model with specific collection name
export default mongoose.models.WritingSupply || mongoose.model("WritingSupply", WritingSupplySchema, "writing_supplies");
