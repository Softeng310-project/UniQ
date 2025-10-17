import Other from "@/models/Other";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await clientPromise;
    if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Requested other item id:", params.id);
    const otherItem = await Other.findOne({ id: Number(params.id) }).lean();
    console.log("Other item found:", otherItem);

    if (!otherItem) {
        return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json(otherItem);
}