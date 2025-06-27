import {IndexType, Permission} from "node-appwrite"
import {db , questionCollection} from "../name"
import {databases} from "./config"

//functions
export default async function createQuesCollection() {
    //que collection
    await databases.createCollection(db ,questionCollection,questionCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ] )
    console.log("Question collection is created!!")

    //attributes and indexes
    await Promise.all([
        databases.createStringAttribute(db , questionCollection, "title" , 150 , true),
        databases.createStringAttribute(db , questionCollection, "content" , 10000 , true),
        databases.createStringAttribute(db , questionCollection, "authorID" , 50 , true),
        databases.createStringAttribute(db , questionCollection, "tags" , 50 , true , undefined , true),
        databases.createStringAttribute(db , questionCollection, "attachmentId" , 50 , false),

    ]);

    console.log("Question Attributes created !!");

    //Indexes
    // await Promise.all([
    //     databases.createIndex(
    //         db , questionCollection, "title", IndexType.Fulltext,
    //         ["title"] , ['asc']
    //     ),
    //       databases.createIndex(
    //         db , questionCollection, "title", IndexType.Fulltext,
    //         ["content"] , ['asc']
    //     ),
    //       databases.createIndex(
    //         db , questionCollection, "title", IndexType.Key,
    //         ["authorID"] , ['asc']
    //     ),
    //       databases.createIndex(
    //         db , questionCollection, "title", IndexType.Fulltext,
    //         ["tags"] , ['asc']
    //     ),
    //       databases.createIndex(
    //         db , questionCollection, "title", IndexType.Key,
    //         ["attachmentId"] , ['asc']
    //     )
    // ])
}