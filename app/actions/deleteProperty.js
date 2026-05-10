"use server";
import connectDB from "../../config/database";
import Property from "../../models/Property";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";
import cloudinary from "../../config/cloudinary";

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("UserId not found!");
  }

  const {userId} = sessionUser;
  const property = await Property.findById(propertyId);

  if (!property) throw new error("No property found!");

  if (property.owner.toString() !== userId) throw new Error("Unauthorized");

  const publicIds = property.images.map((imgUrl) => {
    const parts = imgUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIds.length) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("property_next/" + publicId);
    }
  }
  await Property.deleteOne();

  revalidatePath('/','layout');
}

export default deleteProperty;
