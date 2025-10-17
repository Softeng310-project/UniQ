import WritingSupply from "@/models/WritingSupply";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await clientPromise;
    if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Requested writing supply id:", params.id);
    const writingSupply = await WritingSupply.findOne({ id: Number(params.id) }).lean();
    console.log("Writing supply found:", writingSupply);

    if (!writingSupply) {
        return Response.json({ error: "Writing supply not found" }, { status: 404 });
    }

    return Response.json(writingSupply);
}