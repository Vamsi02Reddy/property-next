"use server";

import connectDB from "../../config/database";
import User from "../../models/User";
import { getSessionUser } from "../../utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser?.userId) {
    throw new Error("User ID is required");
  }

  const user = await User.findById(sessionUser.userId);

  const isBookmarked = user?.bookmarks?.includes(propertyId) || false;

  return {
    isBookmark: isBookmarked,
  };
}

export default checkBookmarkStatus;