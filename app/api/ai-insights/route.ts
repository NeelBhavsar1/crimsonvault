import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";


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
        


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528",
            messages: [
                {
                    role: "system",
                    content: `
                    You are a financial assistant.
                    Analyze the expense records and provide actionable financial advice.
                    All amounts must be expressed in £. 

                    Output STRICT JSON ONLY, using this exact format:

                    {
                    "highSpending": "string describing categories with high spending and the amounts in £. If spending is normal, indicate 'No high spending detected'.",
                    "savingsTips": ["string with suggestions to save money, including £ amounts if applicable. If none, provide general tips."],
                    "lifestyleTips": ["string with lifestyle adjustments or recommendations. If none, provide general lifestyle advice."],
                    "upcomingExpenses": "string listing any upcoming big expenses with amounts in £. If none, say 'No upcoming big expenses'."
                    }
                    `
                },
                {
                    role: "user",
                    content: JSON.stringify(records)
                }
            ],
            response_format: {type: "json_object"},
            max_tokens: 1000
        })
    });

    const data = await response.json()
    let insightData = {};
    try {
    insightData = typeof data.choices?.[0]?.message?.content === "string"
        ? JSON.parse(data.choices[0].message.content)
        : data.choices?.[0]?.message?.content ?? {};
    } catch (err) {
    console.error("Failed to parse AI JSON:", err);
    insightData = {
        highSpending: "",
        savingsTips: [],
        lifestyleTips: [],
        upcomingExpenses: ""
    };
    }

    return NextResponse.json(insightData)

        

    } catch (error) {
        console.error(error)
        return NextResponse.json({error: "Failed to fetch data.", details: error}, {status: 500})
        
    }

}