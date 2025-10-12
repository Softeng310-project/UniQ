import mongoose from "mongoose";

// Other schema for miscellaneous items in the marketplace
// Defines the structure for other item data stored in MongoDB
const OtherSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  category: String, // Calculators, Rulers, etc.
  type: String, // Calculators, Rulers, Folders & Files, Binders, Staplers, Scissors, Glue
  price: Number,
  description: String,
});

// Export Other model with specific collection name
export default mongoose.models.Other || mongoose.model("Other", OtherSchema, "other_items");
