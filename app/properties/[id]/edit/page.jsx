import PropertyEditForm from "../../../components/PropertyEditForm";
import connectDB from "../../../../config/database";
import Property from "../../../../models/Property";

const EditPage = async ({ params }) => {
  await connectDB();
  const { id } = await params;
  const property = JSON.parse(
    JSON.stringify(await Property.findById(id).lean()),
  );

  if (!property) {
    return (
      <h1 className="text-center font-bold text-2xl mt-10">
        Property Not Found!
      </h1>
    );
  }

  return (
    <section className="bg-blue-50 ">
      <div className="container m-auto py-10 max-w-2xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border border-gray-200 m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
