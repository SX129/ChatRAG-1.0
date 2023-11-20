import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

/* File structure of route.ts maps to endpoint /api/create-chat */

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log(file_key, file_name);
    await loadS3IntoPinecone(file_key);
    return NextResponse.json({message: 'Success'});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
