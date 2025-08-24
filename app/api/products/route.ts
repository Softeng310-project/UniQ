import {
  ensureDatabaseConnection,
  extractQueryParams,
  buildFilter,
  buildSort,
  getPaginationParams,
  fetchBooksData,
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
  const filter = buildFilter(params);
  const sort = buildSort(params.sortBy || 'title');
  const { page, limit } = getPaginationParams(params);

  try {
    let products;
    let total;
    let categories;
    let majors;
    let years;

    // Handle different product types
    switch (productType) {
      case 'course-books':
        const booksData = await fetchBooksData(filter, sort, page, limit);
        products = booksData.books;
        total = booksData.total;
        categories = booksData.categories;
        majors = booksData.majors;
        years = booksData.years;
        break;

      // Add more product types here in the future
      // case 'notebooks':
      //   // Handle notebooks
      //   break;
      // case 'writing-supplies':
      //   // Handle writing supplies
      //   break;

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
