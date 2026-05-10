"use client";

import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperties from "../actions/bookmarkProperties";
import checkBookmarkStatus from "../actions/checkBookmarkStatus";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookmarkButton = ({ property }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [isBookmark, setIsBookmark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    const fetchStatus = async () => {
      setLoading(true);

      if (!userId) {
        setIsBookmark(false);
        setLoading(false);
        return;
      }

      try {
        const res = await checkBookmarkStatus(property._id);

        if (res?.error) {
          toast.error(res.error);
        } else {
          setIsBookmark(res.isBookmark);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [property._id, userId, status]);

  const handleBookMarkClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to Bookmark Property");
      return;
    }

    try {
      const res = await bookmarkProperties(property._id);

      if (res?.error) return toast.error(res.error);

      setIsBookmark(res.isBookmark);
      toast.success(res.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <button className="bg-gray-400 text-white w-full py-2 px-4 rounded-full">
        Loading...
      </button>
    );
  }

  return isBookmark ? (
    <button
      onClick={handleBookMarkClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookMarkClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;