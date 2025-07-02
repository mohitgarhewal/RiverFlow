import { ansCollection, db, questionCollection, voteCollection } from "@/model/name";
import { databases, users } from "@/model/server/config";
import { UserPref } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const {votedByID , votestatus, type , typeID} = await request.json()

        const response = await databases.listDocuments(
            db , voteCollection ,[
                Query.equal("type" , type),
                Query.equal("typeID" , typeID),
                Query.equal("votedByID" , votedByID),
            ]
        )

        if(response.documents.length > 0){
            await databases.deleteDocument(db , voteCollection , response.documents[0].$id)

            const quesOrans = await databases.getDocument(
                db, 
                type === "question" ? questionCollection : ansCollection,
                typeID
            );

            const authorpref =  await users.getPrefs<UserPref>(quesOrans.authorID)

            await users.updatePrefs<UserPref>(quesOrans.authorID , {
                reputation : response.documents[0].votestatus === 
                "upvoted" ? Number(authorpref.reputation) -1 :  Number(authorpref.reputation) +1
            })
        }
        
        if(response.documents[0]?.votestatus !== votestatus ){
            const doc = await databases.createDocument(db , voteCollection , ID.unique() , {
                type,
                typeID,
                votestatus,
                votedByID
            })

             const quesOrans = await databases.getDocument(
                db, 
                type === "question" ? questionCollection : ansCollection,
                typeID
            );

            const authorpref =  await users.getPrefs<UserPref>(quesOrans.authorID)

             if (response.documents[0]) {
                await users.updatePrefs<UserPref>(quesOrans.authorId, {
                    reputation:
                        response.documents[0].voteStatus === "upvoted"
                            ? Number(authorpref.reputation) - 1
                            : Number(authorpref.reputation) + 1,
                });
            } else {
                await users.updatePrefs<UserPref>(quesOrans.authorId, {
                    reputation:
                        votestatus === "upvoted"
                            ? Number(authorpref.reputation) + 1
                            : Number(authorpref.reputation) - 1,
                });
            }
        }

        const [upvote, downvote ] = await Promise.all([
            databases.listDocuments(db , voteCollection, [
                Query.equal("type" , type),
                Query.equal("typeID" , typeID),
                Query.equal("votestatus" , "upvoted"),
                Query.equal("voteByID" , votedByID),
                Query.limit(1),
            ]),
             databases.listDocuments(db , voteCollection, [
                Query.equal("type" , type),
                Query.equal("typeID" , typeID),
                Query.equal("votestatus" , "downvoted"),
                Query.equal("voteByID" , votedByID),
                Query.limit(1),
            ]),
        ])

        return NextResponse.json(
            {
               data: {
                  document: null , voteResult : upvote.total = downvote.total
               },
               message: "vote is handled"
            },
            {
                status: 200
            }
        )
    } catch (error : any ) {
         return NextResponse.json(
            {
                error: error?.message || "Error in voting"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}