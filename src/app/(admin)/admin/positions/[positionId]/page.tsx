'use client'

import { PanelRight } from "lucide-react"
import { Button } from "@mantine/core"
import PositionInfo from "../../../../components/positionInfo"
import { useDrawer } from "@/app/lib/context/drawerContext"

type PositionsProp = {
    params: { positionId: string }
}

export default function Position({ params }: PositionsProp) {
    const { open } = useDrawer();

    return (
        <div className="flex flex-col h-full">
            <header className="bg-white shadow-sm mb-2">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-2 flex justify-end">
                    <Button variant="light" onClick={open} >
                        <PanelRight size={30} />
                    </Button>
                </div>

            </header>
            <PositionInfo positionId={params.positionId} />
        </div>
    )
}