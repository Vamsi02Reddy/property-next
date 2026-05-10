// import React from 'react'
import Link from "next/link";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <>
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              title="For Renters"
              description="Find your dream rental property. Bookmark properties and contact owners."
              link="/properties"
              buttonText="Browse Properties"
              bgColor="bg-gray-100"
              buttonColor="bg-black"
              hoverColor="hover:bg-gray-700"
            />

            <InfoBox
              title="For Property Owners"
              description="List your properties and reach potential tenants. Rent as an airbnb or long term."
              link="/properties/add"
              buttonText="Add Property"
              bgColor="bg-blue-100"
              buttonColor="bg-blue-500"
              hoverColor="hover:bg-blue-600"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBoxes;
