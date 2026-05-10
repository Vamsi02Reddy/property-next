import connectDB from "../../config/database";
import Message from "../../models/Message";
import Property from "../../models/Property";
import { getSessionUser } from "../../utils/getSessionUser";
import MessageCard from "../components/MessageCard";

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({ recipient: userId, read: false })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messDoc) => {
    const message = JSON.parse(JSON.stringify(messDoc));
    message.sender = JSON.parse(JSON.stringify(messDoc.sender));
    message.property = JSON.parse(JSON.stringify(messDoc.property));
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-20 max-w-6xl">
        <div className="bg-white px-6 py-7 mb-4 shadow-md rounded-md border border-gray-200 m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
