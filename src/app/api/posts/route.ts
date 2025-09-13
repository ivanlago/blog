import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";
import db from "@/db";
import { posts } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(config);

    if (!session?.user || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const post = await db
      .insert(posts)
      .values({
        ...body,
        authorId: session.user.id,
      })
      .returning();

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Error in POST /api/posts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(config);

    if (!session?.user || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    const post = await db
      .update(posts)
      .set(updateData)
      .where(eq(posts.id, id))
      .returning();

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error("Error in PUT /api/posts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(config);

    if (!session?.user || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing post ID", { status: 400 });
    }

    await db.delete(posts).where(eq(posts.id, parseInt(id)));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/posts:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
