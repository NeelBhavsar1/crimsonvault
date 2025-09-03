import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function GET(req: Request) {
    try {
        const {userId: clerkUserId} = await auth();
        if (!clerkUserId) {
            return NextResponse.json({error: "User not authenticated"}, {status: 401})
        }

        const records = await db.record.findMany({
            where: {userId: clerkUserId},
            orderBy: {date: 'desc'}
        })

        const prompt = `
            You are a financial assistant.
            Analyze these expense records and give actionable suggestions to improve the user's spending.

            Provide your output **strictly as a single JSON object**. Do not include any additional text, markdown formatting, or explanations.
            The JSON object must have exactly these four keys:
            {
            "highSpending": "Warn about categories where spending is high",
            "savingsTips": ["Suggestions to save money"],
            "lifestyleTips": ["Tips about lifestyle adjustments"],
            "upcomingExpenses": "Warnings about upcoming big expenses"
            }

            The records are in £:
            ${JSON.stringify(records)}
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        })

        let insightData = {};
            try {
            insightData = JSON.parse(response.text ?? "{}");
            } catch (err) {
            console.error("AI JSON parse failed:", response.text);
            insightData = {
                highSpending: "AI output not valid JSON",
                savingsTips: [],
                lifestyleTips: [],
                upcomingExpenses: ""
            };
            }

            return NextResponse.json(insightData); 

        

        

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Failed to fetch data.", details: error}, {status: 500})
        
    }

}