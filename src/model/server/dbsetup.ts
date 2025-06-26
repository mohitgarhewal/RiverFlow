import {db} from "../name";
import createAnsCollection from "./ans.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import createQuesCollection from "./ques.collection";
import getOrCreateStorage from "./storage.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
    try { 
        await databases.get(db);
        console.log("database connected");
    } catch (error) {
        try {
            await databases.create(db , db);
            console.log("database created");

            await Promise.all([
                createQuesCollection(),
                createAnsCollection(),
                createCommentCollection(),
                createVoteCollection()
            ])

            console.log("collections are created");
             console.log("database connected");
        } catch (error) {
            console.error("error creating database / collections" , error);
        }
    }

    return databases
}