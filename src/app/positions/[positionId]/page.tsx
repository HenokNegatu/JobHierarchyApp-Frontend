'use client'

import { PanelRight } from "lucide-react"
import { Button } from "@mantine/core"
import PositionInfo from "../../components/positionInfo"
import { useDrawer } from "@/app/lib/context/drawerContext"

type PositionsProp = {
    params: { positionId: string }
}

export default function Position({ params }: PositionsProp) {
    const { open } = useDrawer();

    return (
        <div className="flex flex-col">
            <Button variant="light" onClick={open} className="self-end my-2 bg-transparent">
                <PanelRight />
            </Button>
            <PositionInfo positionId={params.positionId} />
        </div>
    )
}