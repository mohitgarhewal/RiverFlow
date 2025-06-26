import env from "@/app/env";
import {Avatars, Client , Databases , Storage , Users} from "node-appwrite"

let client = new Client();

client
    .setEndpoint(env.appwirte.endpoint)                      // API Endpoint
    .setProject(env.appwirte.projectid)                            // project ID
    .setKey(env.appwirte.apikey)                         //secret API key
                                                // Use only on dev mode with a self-signed SSL cert
;

const users = new Users(client);      
const databases = new Databases(client);      
const avatars = new Avatars(client);      
const storage = new Storage(client);      

export {client , databases , users, avatars , storage}