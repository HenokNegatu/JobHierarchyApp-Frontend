'use client'

import TaskForm from "@/app/components/tasksComponent/taskForm";
import { RequestType } from "@/app/types";
import { Button } from "@mantine/core";
import Link from "next/link";

export default function AddPage() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">

            <Button variant='light' onClick={() => window.history.back()} className="absolute top-5 left-5">Back</Button>

            <TaskForm action={RequestType.POST} />
        </div>
    )
}