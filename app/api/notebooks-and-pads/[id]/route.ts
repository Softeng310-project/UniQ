import Notebook from "@/models/Notebook";
import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    await clientPromise;
    if (!mongoose.connection.readyState) await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Requested notebook id:", params.id);
    const notebook = await Notebook.findOne({ id: Number(params.id) }).lean();
    console.log("Notebook found:", notebook);

    if (!notebook) {
        return Response.json({ error: "Notebook not found" }, { status: 404 });
    }

    return Response.json(notebook);
}