import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

// API route for fetching newest books for the home page carousel
// Returns books sorted by ID (newest first) with optional limit parameter
export async function GET(request: Request) {
  await clientPromise;
  if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

  // Get limit from query string, default to 8
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 8;

  const books = await Book.find({ id: { $exists: true } })
    .sort({ id: -1 })
    .limit(limit)
    .lean();

  return Response.json(books);
}