import { connectDB } from "@/util/database";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";


export default async function RegiPlant(req, res){

    const session = await getServerSession(req, res, authOptions)

    console.log(req.body)

    console.log(session.user.email)

    const client = await connectDB;
    const db = client.db('test');
    const filter = { email: session.user.email };
    const regi = await db.collection('users').updateOne(filter, { $set: { plant: { plantBase: req.body.plantBase, plantDate: req.body.plantDate, plantName: req.body.plantName } } });

    return res.json({
        message: "success",
    })
}