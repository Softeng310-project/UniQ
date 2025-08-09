export default function BookDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Book Details Page</h1>
      <p>This is the book details page content.</p>
      <p>Book ID: {params.id}</p>
    </div>
  )
}
