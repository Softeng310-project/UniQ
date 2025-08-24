import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  await clientPromise;
  if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

  // Get 8 books with highest id
  const books = await Book.find({ id: { $exists: true } })
    .sort({ id: -1 })
    .limit(8)
    .lean();

  return Response.json(books);
}