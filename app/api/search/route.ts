import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  await clientPromise;
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return Response.json({
      results: [],
      query: "",
      count: 0,
      message: "Please enter a search term"
    });
  }

  try {
    // Clear search query
    const searchTerm = query.trim();
    
    // For case-insensitive and partial matching
    const searchRegex = new RegExp(
      searchTerm.split(/\s+/).join(".*"),
      "i"
    );

    // Search across multiple fields
    const results = await Book.find({
      $or: [
        { title: searchRegex },
        { category: searchRegex },
        { degree: searchRegex },
        { major: searchRegex },
        { description: searchRegex }
      ]
    })
      .limit(50)
      .lean();

    // Sort results by relevance
    const sortedResults = results.sort((a, b) => {
      const aTitle = (a.title || "").toLowerCase();
      const bTitle = (b.title || "").toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      // Exact match with search input
      if (aTitle === searchLower) return -1;
      if (bTitle === searchLower) return 1;

      // Starts with search input
      if (aTitle.startsWith(searchLower)) return -1;
      if (bTitle.startsWith(searchLower)) return 1;

      // Contains search input
      const aContains = aTitle.includes(searchLower);
      const bContains = bTitle.includes(searchLower);
      if (aContains && !bContains) return -1;
      if (!aContains && bContains) return 1;

      return 0;
    });

    return Response.json({
      results: sortedResults,
      query: searchTerm,
      count: sortedResults.length,
      message: sortedResults.length === 0 
        ? `No results found for "${searchTerm}"` 
        : `Found ${sortedResults.length} result${sortedResults.length === 1 ? '' : 's'}`
    });

  } catch (error) {
    console.error("Search error:", error);
    return Response.json(
      { 
        error: "Search failed",
        results: [],
        query: query,
        count: 0
      },
      { status: 500 }
    );
  }
}