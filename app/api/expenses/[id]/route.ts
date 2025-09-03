import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, context: any) {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    
    const id = context.params.id;
    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const deleted = await db.record.delete({
      where: { id, userId: clerkUserId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}