import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";

export async function GET() {
    try {
        const user = await checkUser()
        return NextResponse.json(user)
    } catch (error) {
        console.error("Error in /api/checkUser: ", error)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
}