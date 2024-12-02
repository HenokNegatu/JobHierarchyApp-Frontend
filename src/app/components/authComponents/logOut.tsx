'use client'

import { deleteSession } from "@/app/lib/session";
import { Button } from "@mantine/core";

export default function LogOut(){
    return(
        <Button onClick={()=>deleteSession()}>Logout</Button>
    )
}