import {IndexType, Permission} from "node-appwrite"
import {db , voteCollection} from "../name"
import {databases} from "./config"

export default async function createVoteCollection() {
    //vote collection 
    await databases.createCollection(db , voteCollection, voteCollection , [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
     console.log("vote collection is created!!")

    //attributes and indexes
    await Promise.all([
        databases.createEnumAttribute(db , voteCollection, "type" , ["question , answer"] , true),
        databases.createStringAttribute(db , voteCollection, "typeID" , 50 , true),
        databases.createEnumAttribute(db , voteCollection, "votestatus" , ["upvote , downvote"] , true),
        databases.createStringAttribute(db , voteCollection, "votedByID" , 50 , true),
    ]);
     console.log("Vote attributes is created!!")
}