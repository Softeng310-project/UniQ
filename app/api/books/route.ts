import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  await clientPromise;
  if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const condition = searchParams.get('condition');
  const major = searchParams.get('major');
  const degree = searchParams.get('degree');
  const year = searchParams.get('year');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sortBy = searchParams.get('sortBy') || 'title';

  // Build filter object
  const filter: any = {};
  
  // Handle multiple categories (comma-separated)
  if (category) {
    const categories = category.split(',');
    if (categories.length > 1) {
      filter.category = { $in: categories };
    } else {
      filter.category = category;
    }
  }
  
  // Handle multiple conditions (comma-separated)
  if (condition) {
    const conditions = condition.split(',');
    if (conditions.length > 1) {
      filter.condition = { $in: conditions };
    } else {
      filter.condition = condition;
    }
  }
  
  if (major) filter.major = major;
  if (degree) filter.degree = degree;
  if (year) filter.year = parseInt(year);

  // Build sort object
  let sort: any = {};
  switch (sortBy) {
    case 'title':
      sort.title = 1;
      break;
    case 'title-desc':
      sort.title = -1;
      break;
    case 'price':
      sort.price = 1;
      break;
    case 'price-desc':
      sort.price = -1;
      break;
    default:
      sort.title = 1;
  }

  try {
    // Get total count for pagination
    const total = await Book.countDocuments(filter);
    
    // Get books with pagination
    const books = await Book.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get unique categories and majors for filters
    const categories = await Book.distinct('category');
    const majors = await Book.distinct('major');
    const years = await Book.distinct('year');

    return Response.json({
      books,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      },
      filters: {
        categories,
        majors,
        years
      }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
