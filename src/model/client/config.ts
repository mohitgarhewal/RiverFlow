import env from "@/app/env";

import { Client, Account, Avatars , Databases , Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwirte.endpoint)            //  API Endpoint
    .setProject(env.appwirte.projectid);            //  project ID

const account = new Account(client);      
const databases = new Databases(client);      
const avatars = new Avatars(client);      
const storage = new Storage(client);      

export {client , databases , account, avatars , storage}