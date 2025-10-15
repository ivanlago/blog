import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";
import db from "@/db";
import { advertisements } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(config);

    if (!session?.user || session?.user?.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const advertisement = await db
      .insert(advertisements)
      .values({
        ...body,
      })
      .returning();

    return NextResponse.json(advertisement[0]);
  } catch (error) {
    console.error("Error in POST /api/advertisements:", error);
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

    const advertisement = await db
      .update(advertisements)
      .set(updateData)
      .where(eq(advertisements.id, id))
      .returning();

    return NextResponse.json(advertisement[0]);
  } catch (error) {
    console.error("Error in PUT /api/advertisements:", error);
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
      return new NextResponse("Missing advertisement ID", { status: 400 });
    }

    await db.delete(advertisements).where(eq(advertisements.id, parseInt(id)));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in DELETE /api/advertisements:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");

    let query = db.select().from(advertisements);

    if (category) {
      query = query.where(eq(advertisements.category, category));
    }

    if (featured === "true") {
      query = query.where(eq(advertisements.isFeatured, true));
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const result = await query.orderBy(advertisements.createdAt);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET /api/advertisements:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}