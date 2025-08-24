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
    const { books, total, categories, majors, years } = await fetchBooksData(filter, sort, page, limit);

    return Response.json({
      books,
      pagination: createPaginationInfo(total, page, limit),
      filters: createFilterData(categories, majors, years)
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return Response.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
