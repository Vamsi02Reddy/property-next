import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import Link from "next/link";
import PropertySearchForm from "../../components/PropertySearchForm";
import PropertyCard from "../../components/PropertyCard";
import { FaArrowAltCircleLeft } from "react-icons/fa";
export const dynamic = "force-dynamic";

const SearchResultsPage = async ({ searchParams }) => {
  await connectDB();
  const { location, propertyType } = await searchParams;
  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
    ],
  };

  if (propertyType && propertyType != "All") {
    const typePattern = new RegExp(propertyType, "i");
    query.type = typePattern;
  }

  const propertiesQueryResults = JSON.parse(
    JSON.stringify(await Property.find(query).lean()),
  );
  if (propertiesQueryResults.length === 0)
    throw new Error("No result found! Pls check other properties");
  return (
    <>
      <section className="bg-blue-700 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-5">
        <div className="container-xl lg-container m-auto px-4 py-5">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">
            Search Results
            {propertiesQueryResults.length == 0 ? (
              <p>No Search Results Found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {propertiesQueryResults.map((property)=>(
                    <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </h1>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
