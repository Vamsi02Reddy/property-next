import PropertyCard from "../components/PropertyCard";
import Link from "next/link";
import connectDB from "../../config/database";
import Property from "../../models/Property";

const HomeProperties = async () => {
  await connectDB();
  const recentProperties = await Property.find({}).sort({createdAt : -1}).limit(3).lean();
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container px-4 py-6 m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {recentProperties.length == 0 ? (
            <p>No Recent Properties Found!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentProperties.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="m-auto max-w-lg my-6 px-6">
        <Link
          href="/properties"
          className=" text-center bg-black text-white block py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          Show all properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
