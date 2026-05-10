import PropertyAddForm from "../../../app/components/PropertyAddForm";
const PropertiesAdd = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 max-w-2xl">
        <div className="bg-white px-6 py-6 mb-4 shadow-md rounded-md border border-gray-200 m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};
export default PropertiesAdd;
