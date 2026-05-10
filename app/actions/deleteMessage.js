"use server";
import connectDB from "../../config/database";
import Message from "../../models/Message";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error("UserId not found!");
  }

  const {userId} = sessionUser;
  const message = await Message.findById(messageId);

  if (!message) throw new error("No message found!");

  if (message.recipient.toString() !== userId) throw new Error("Unauthorized");


 
  await message.deleteOne();

  revalidatePath('/messages','page');
}

export default deleteMessage;
