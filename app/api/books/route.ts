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
  const params = extractQueryParams(searchParams);
  const filter = buildFilter(params);
  const sort = buildSort(params.sortBy || 'title');
  const { page, limit } = getPaginationParams(params);

  try {
    const { books, total, categories, majors, years } = await fetchBooksData(filter, sort, page, limit);

    return createSuccessResponse({
      books,
      pagination: createPaginationInfo(total, page, limit),
      filters: createFilterData(categories, majors, years)
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return createErrorResponse("Failed to fetch books");
  }
}
