import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


//creates new record
export async function POST(req: Request) {
    try {
        const { userId: clerkUserId } = await auth();
        if (!clerkUserId) {
            return NextResponse.json({error: "User is unauthorized"}, {status:401})
        }

        const data = await req.json()
        const {description, amount, date, category} = data;

        const record = await db.record.create({
            data: {
                text: description,
                amount: parseFloat(amount),
                date: new Date(date),
                category: category || "Other",
                userId: clerkUserId,
                
            }
        })

        revalidatePath("/dashboard")
        return NextResponse.json({record}, {status: 201})
        
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Failed to create record"}, {status: 500})

    }
}

export async function GET(req: Request) {
    try {
        const {userId: clerkUserId} = await auth()
        if (!clerkUserId) {
            return NextResponse.json({error: "User not authorized"}, {status: 401})
        }

        const records = await db.record.findMany({
            where: {userId: clerkUserId},
            orderBy: {date: 'desc'},
            select: {id: true, text: true, amount: true, date: true, category: true}
        })

        return NextResponse.json({records}, {status: 200})

    } catch (error) {
        console.error(error)
        NextResponse.json({error: "Failed to fetch records"}, {status: 500})
    }
}