import {IndexType, Permission} from "node-appwrite"
import {queAttachmentbucket} from "../name"
import {storage} from "./config"

export default async function getOrCreateStorage() {
   try {
     await storage.getBucket(queAttachmentbucket);
     console.log("Storage connected");
   } catch (error) {
      try {
        await storage.createBucket(queAttachmentbucket, queAttachmentbucket,[
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users"),
        ], false , undefined , undefined,  
         [
            "jpeg" , "png" , "gif", "jpg" , "webp" 
         ]);

         console.log("Storage Created");
         console.log("Storage connected");
      } catch(error){
        console.error("Error creating storage :" , error);
      }
   }
}