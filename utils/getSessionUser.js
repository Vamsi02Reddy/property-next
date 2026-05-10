import { getServerSession } from "next-auth/next";
import authOptions from "./authOptions";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;

  if (session) {
    return {
      user: session.user,
      userId: session.user.id,
    };
  }
};
