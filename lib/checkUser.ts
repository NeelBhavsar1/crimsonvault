import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const checkUser = async () => {
  const user = await currentUser()
  //console.log("currentUser:", user)

  if (!user) return null;

  let loggedinUser
  try {
    loggedinUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });
    //console.log("loggedinUser:", loggedinUser)
  } catch (err) {
    console.error("Error in findUnique:", err)
    throw err
  }

  if (loggedinUser) return loggedinUser;

  let newUser
  try {
    newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress || "noemail@example.com",
      },
    });
    console.log("newUser created:", newUser)
  } catch (err) {
    console.error("Error in create:", err)
    throw err
  }

  return newUser
};
