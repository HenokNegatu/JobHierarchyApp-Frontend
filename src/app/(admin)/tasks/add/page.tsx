'use client'

import TaskForm from "@/app/components/tasksComponent/taskForm";
import { RequestType } from "@/app/types";

export default function AddPage(){
    return(
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            
            <TaskForm action={RequestType.POST} />
        </div>
    )
}