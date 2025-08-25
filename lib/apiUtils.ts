import Book from "@/models/Book";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

// Type definitions for API query parameters and responses
export interface QueryParams {
  category?: string | null;
  condition?: string | null;
  major?: string | null;
  degree?: string | null;
  year?: string | null;
  page?: string | null;
  limit?: string | null;
  sortBy?: string | null;
}

export interface FilterOptions {
  category?: string | string[];
  condition?: string | string[];
  major?: string;
  degree?: string;
  year?: number;
}

export interface SortOptions {
  [key: string]: 1 | -1;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface FilterData {
  categories: string[];
  majors: string[];
  years: number[];
}

export interface ApiResponse {
  pagination: PaginationInfo;
  filters: FilterData;
}

// Ensures MongoDB connection is established before API operations
export async function ensureDatabaseConnection() {
  await clientPromise;
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

// Extracts query parameters from URL search params
export function extractQueryParams(searchParams: URLSearchParams): QueryParams {
  return {
    category: searchParams.get('category'),
    condition: searchParams.get('condition'),
    major: searchParams.get('major'),
    degree: searchParams.get('degree'),
    year: searchParams.get('year'),
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    sortBy: searchParams.get('sortBy')
  };
}

// Builds MongoDB filter object from query parameters
// Handles multiple values for categories, conditions, and years
export function buildFilter(params: QueryParams): any {
  const filter: any = {};
  
  // Handle multiple categories (comma-separated)
  if (params.category) {
    const categories = params.category.split(',');
    if (categories.length > 1) {
      filter.category = { $in: categories };
    } else {
      filter.category = params.category;
    }
  }
  
  // Handle multiple conditions (comma-separated)
  if (params.condition) {
    const conditions = params.condition.split(',');
    if (conditions.length > 1) {
      filter.condition = { $in: conditions };
    } else {
      filter.condition = params.condition;
    }
  }
  
  if (params.major) filter.major = params.major;
  if (params.degree) filter.degree = params.degree;
  
  // Handle multiple years (comma-separated)
  if (params.year) {
    const years = params.year.split(',').map(y => parseInt(y));
    if (years.length > 1) {
      filter.year = { $in: years };
    } else {
      filter.year = years[0];
    }
  }

  return filter;
}

// Builds MongoDB sort object from sort parameter
export function buildSort(sortBy: string = 'title'): SortOptions {
  const sort: SortOptions = {};
  
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

  return sort;
}

// Extracts pagination parameters from query params
export function getPaginationParams(params: QueryParams) {
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '12');
  return { page, limit };
}

// Fetches books data with filtering, sorting, and pagination
// Returns books, total count, and available filter options
export async function fetchBooksData(
  filter: any,
  sort: SortOptions,
  page: number,
  limit: number
): Promise<{
  books: any[];
  total: number;
  categories: string[];
  majors: string[];
  years: number[];
}> {
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

  return { books, total, categories, majors, years };
}

// Creates pagination information object
export function createPaginationInfo(total: number, page: number, limit: number): PaginationInfo {
  return {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    itemsPerPage: limit
  };
}

// Creates filter data object with available options
export function createFilterData(categories: string[], majors: string[], years: number[]): FilterData {
  return { categories, majors, years };
}

// Creates standardized error response
export function createErrorResponse(message: string, status: number = 500) {
  return Response.json({ error: message }, { status });
}

// Creates standardized success response
export function createSuccessResponse(data: any, additionalFields?: Record<string, any>) {
  return Response.json({
    ...data,
    ...additionalFields
  });
}
