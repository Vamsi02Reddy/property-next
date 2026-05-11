"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const InfoBox = ({
  title,
  description,
  link,
  buttonText,
  bgColor,
  buttonColor,
  hoverColor,
}) => {
  const { data: session } = useSession();

  const handleClick = (e) => {
    if (buttonText === "Add Property" && !session) {
      e.preventDefault();
      toast.error("Login first to add property");
    }
  };

  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold">{title}</h2>

      <p className="mt-2 mb-4">{description}</p>

      <Link
        href={link}
        onClick={handleClick}
        className={`inline-block ${buttonColor} text-white rounded-lg px-4 py-2 ${hoverColor}`}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default InfoBox;