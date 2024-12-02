'use client'

import { useMantineColorScheme } from "@mantine/core"
import { Sun, Moon } from "lucide-react";

import { Button } from "@mantine/core";

export default function Theme(){
    const {colorScheme, toggleColorScheme} = useMantineColorScheme()

    return(
        <div className="m-2 w-2/4 justify-self-end">
            <Button variant="default" onClick={()=> toggleColorScheme()}>
               {colorScheme === "light" ? <Moon />: <Sun />}
            </Button>
        </div>
    )
}