import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import Link from "next/link";
import PropertySearchForm from "../../components/PropertySearchForm";
import PropertyCard from "../../components/PropertyCard";
import { FaArrowAltCircleLeft,FaExclamationCircle } from "react-icons/fa";

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
  if (propertiesQueryResults.length === 0) {
    return (
      <section className="bg-blue-50 min-h-screen grow">
        <div className="container m-auto max-w-2xl py-10">
          <div className="bg-white px-6 py-24 mb-4 shadow-md rounded-md m-4 md:m-0">
            <div className="flex justify-center">
              <FaExclamationCircle className="text-8xl text-yellow-400" />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold mt-4 mb-2">
                Something went Wrong 😥
              </h1>

              <p className="text-gray-500 text-xl mb-10">
                No Properties Found!
              </p>

              <Link
                href="/"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
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
                {propertiesQueryResults.map((property) => (
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
