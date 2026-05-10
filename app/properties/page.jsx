import PropertyCard from "../components/PropertyCard";
import connectDB from "../../config/database";
import Property from "../../models/Property";
import Pagination from "../components/Pagination";
export const dynamic = "force-dynamic";

const PropertiesPage = async (props) => {
  const searchParams = await props.searchParams;

  const page = searchParams?.page || "1";
  const pageSize = searchParams?.pageSize || "6";

  await connectDB();

  const pageNumber = Number(page);
  const pageSizeNumber = Number(pageSize);

  const skip = (pageNumber - 1) * pageSizeNumber;

  const total = await Property.countDocuments({});

  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSizeNumber);

  const showPagination = total > pageSizeNumber;

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container px-4 py-6 m-auto">
          {properties.length === 0 ? (
            <p>No Properties Found!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
        {showPagination && (
          <Pagination
            page={pageNumber}
            pageSize={pageSizeNumber}
            totalItems={total}
          />
        )}
      </section>
    </>
  );
};

export default PropertiesPage;
