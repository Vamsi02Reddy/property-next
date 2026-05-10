const Pagination = ({ page, pageSize, totalItems }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {page > 1 && (
        <a
          href={`/properties?page=${page - 1}&pageSize=${pageSize}`}
          className="mr-2 px-2 py-1 border rounded"
        >
          Previous
        </a>
      )}

      <span className="mx-2">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <a
          href={`/properties?page=${page + 1}&pageSize=${pageSize}`}
          className="ml-2 px-2 py-1 border rounded"
        >
          Next
        </a>
      )}
    </section>
  );
};

export default Pagination;
