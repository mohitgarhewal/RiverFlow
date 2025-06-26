import {IndexType, Permission} from "node-appwrite"
import {db , commnetCollection} from "../name"
import {databases} from "./config"

export default async function createCommentCollection() {
    //comment collection 
    await databases.createCollection(db , commnetCollection, commnetCollection , [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
     console.log("Comment collection is created!!")

    //attributes and indexes
    await Promise.all([
        databases.createStringAttribute(db , commnetCollection, "content" , 10000 , true),
        databases.createEnumAttribute(db , commnetCollection, "type" , ["answer , question"] , true),
        databases.createStringAttribute(db , commnetCollection, "typeID" , 50 , true),
        databases.createStringAttribute(db , commnetCollection, "authorID" , 50 , true ),
    ]);
     console.log("Comment attributes is created!!")
}