import {
  ensureDatabaseConnection,
  buildFilter,
  buildSort,
  getPaginationParams,
  fetchBooksData,
  createPaginationInfo,
  createFilterData,
  type QueryParams
} from "@/lib/apiUtils";

export async function GET(request: Request) {
  await ensureDatabaseConnection();

  const { searchParams } = new URL(request.url);
  const productType = searchParams.get('type') || 'course-books';
  
  const params: QueryParams = {
    category: searchParams.get('category'),
    condition: searchParams.get('condition'),
    major: searchParams.get('major'),
    degree: searchParams.get('degree'),
    year: searchParams.get('year'),
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    sortBy: searchParams.get('sortBy')
  };

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
        return Response.json({ error: "Invalid product type" }, { status: 400 });
    }

    return Response.json({
      products,
      pagination: createPaginationInfo(total, page, limit),
      filters: createFilterData(categories, majors, years),
      productType
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
