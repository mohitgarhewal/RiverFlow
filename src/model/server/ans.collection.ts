import {IndexType, Permission} from "node-appwrite"
import {db , ansCollection} from "../name"
import {databases} from "./config"

export default async function createAnsCollection() {
    //ans collection 
    await databases.createCollection(db , ansCollection, ansCollection , [
         Permission.read("any"),
         Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
     console.log("Answer collection is created!!")

    //attributes and indexes
    await Promise.all([
        databases.createStringAttribute(db , ansCollection, "content" , 10000 , true),
        databases.createStringAttribute(db , ansCollection, "questionID" , 50 , true),
        databases.createStringAttribute(db , ansCollection, "authorID" , 50 , true ),
    ]);
     console.log("Answer attributes is created!!")
}