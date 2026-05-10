// import React from 'react'
import Link from "next/link";

const InfoBox = ({ title, description, link, buttonText, bgColor, buttonColor, hoverColor }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 mb-4">{description}</p>
      <Link
        href={link}
        className={`inline-block ${buttonColor} text-white rounded-lg px-4 py-2 ${hoverColor}`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default InfoBox;
