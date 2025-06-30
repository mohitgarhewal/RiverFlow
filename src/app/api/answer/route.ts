import { ansCollection, db } from "@/model/name";
import { databases, users } from "@/model/server/config";
import { UserPref } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const { quesID, ans, authorID } = await request.json();

        const response = await databases.createDocument(db, ansCollection, ID.unique(), {
            content: ans,
            authorID: authorID,
            quesID: quesID
        })

        const prefs = await users.getPrefs<UserPref>(authorID)
        await users.updatePrefs(authorID, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json(response, {
            status: 201
        })
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error creating answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request: NextResponse) {
    try {
        const { ansID } = await request.json()

        const answer = await databases.getDocument(db, ansCollection, ansID);

        const response = await databases.deleteDocument(db, ansCollection, ansID);

        const prefs = await users.getPrefs<UserPref>(answer.authorID)
        await users.updatePrefs(answer.authorID, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json(
            { data: response },
            { status: 200}
        ) 

    } catch (error: any) {
        return NextResponse.json(
            {
                message: error?.message || "Error deleting answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}