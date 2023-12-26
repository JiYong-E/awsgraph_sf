import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";


export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)


  if(!session){
    res.status(401).json({ message: "You must be logged in." });
    return res.json({
      collection: null,
    });
  }

  const client = await connectDB;
  const db = client.db('test');
  const collection = await db.collection('users').findOne({ email: session.user.email });
  

  return res.json({
    collection,
  })
}




