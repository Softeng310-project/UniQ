import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

// API route for fetching individual book by ID
// Used for book detail pages and product information
export async function GET(request: Request, { params }: { params: { id: string } }) {
  await clientPromise;
  if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

  console.log("Requested id:", params.id);
  const book = await Book.findOne({ id: Number(params.id) }).lean();
  console.log("Book found:", book);

  if (!book) {
    return Response.json({ error: "Book not found" }, { status: 404 });
  }
  return Response.json(book);
}
