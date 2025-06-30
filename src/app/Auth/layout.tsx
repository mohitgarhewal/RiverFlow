"use client";

import { useAuthStore } from "@/store/Auth"
import { useRouter } from "next/router";
import { ReactNode } from "react"
import React from "react";

const Layout =({children} : {children : ReactNode}) => {
   const {session} = useAuthStore();
   const router = useRouter()
    
   React.useEffect(() =>{
     if(session){
        router.push("/")
     }
   }, [session , router])

   if(session){
     return null
   }

   return(
    <div>
        <div>
            {children}
        </div>
    </div>
   )
   
} 

export default Layout