import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { uploadImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(config);

    if (!session?.user || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file uploaded", { status: 400 });
    }

    const result = await uploadImage(file);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in upload route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
