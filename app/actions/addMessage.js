"use server";

import connectDB from "../../config/database";
import Message from "../../models/Message";
import { getSessionUser } from "../../utils/getSessionUser";

async function addMessage(prevState, formData) {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return {
        error: "Please login first",
      };
    }

    const { userId } = sessionUser;

    const recipient = formData.get("recipient");

    if (userId === recipient) {
      return {
        error: "You can not send message to yourself",
      };
    }

    const newMessage = new Message({
      sender: userId,
      recipient,
      property: formData.get("property"),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      body: formData.get("body"),
    });

    await newMessage.save();

    return {
      submitted: true,
    };
  } catch (error) {
    return {
      error: "Failed to send message",
    };
  }
}

export default addMessage;