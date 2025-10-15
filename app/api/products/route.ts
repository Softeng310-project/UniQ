import {
  ensureDatabaseConnection,
  extractQueryParams,
  buildFilter,
  buildSort,
  getPaginationParams,
  fetchBooksData,
  fetchNotebooksData,
  fetchWritingSuppliesData,
  fetchOtherData,
  createPaginationInfo,
  createFilterData,
  createErrorResponse,
  createSuccessResponse
} from "@/lib/apiUtils";

export async function GET(request: Request) {
  await ensureDatabaseConnection();

  const { searchParams } = new URL(request.url);
  const productType = searchParams.get('type') || 'course-books';
  const params = extractQueryParams(searchParams);
  
  // Build filter based on product type
  let filter = buildFilter(params);
  
  // For non-course-books, map category to the correct field name
  if (productType !== 'course-books' && params.category) {
    if (productType === 'notebooks-and-pads') {
      filter.type = filter.category;
      delete filter.category;
    } else if (productType === 'writing-supplies' || productType === 'other') {
      filter.type = filter.category;
      delete filter.category;
    }
  }
  
  const sort = buildSort(params.sortBy || 'title');
  const { page, limit } = getPaginationParams(params);

  try {
    let products: any[] = [];
    let total: number = 0;
    let categories: string[] = [];
    let majors: string[] = [];
    let years: number[] = [];

    // Handle different product types
    switch (productType) {
      case 'course-books': {
        const booksData = await fetchBooksData(filter, sort, page, limit);
        products = booksData.books;
        total = booksData.total;
        categories = booksData.categories;
        majors = booksData.majors;
        years = booksData.years;
        break;
      }

      case 'notebooks-and-pads': {
        const notebooksData = await fetchNotebooksData(filter, sort, page, limit);
        products = notebooksData.books;
        total = notebooksData.total;
        categories = notebooksData.categories;
        majors = notebooksData.majors;
        years = notebooksData.years;
        break;
      }

      case 'writing-supplies': {
        const writingSuppliesData = await fetchWritingSuppliesData(filter, sort, page, limit);
        products = writingSuppliesData.books;
        total = writingSuppliesData.total;
        categories = writingSuppliesData.categories;
        majors = writingSuppliesData.majors;
        years = writingSuppliesData.years;
        break;
      }

      case 'other': {
        const otherData = await fetchOtherData(filter, sort, page, limit);
        products = otherData.books;
        total = otherData.total;
        categories = otherData.categories;
        majors = otherData.majors;
        years = otherData.years;
        break;
      }

      default:
        return createErrorResponse("Invalid product type", 400);
    }

    return createSuccessResponse({
      products,
      pagination: createPaginationInfo(total, page, limit),
      filters: createFilterData(categories, majors, years)
    }, { productType });
  } catch (error) {
    console.error('Error fetching products:', error);
    return createErrorResponse("Failed to fetch products");
  }
}
