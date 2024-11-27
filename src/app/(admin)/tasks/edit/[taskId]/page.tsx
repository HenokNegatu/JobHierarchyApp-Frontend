'use client'

import TaskForm from "@/app/components/tasksComponent/taskForm";
import { useGetTaskByIdQuery } from "@/app/store/apiTask";
import { RequestType } from "@/app/types";

type EditPageProp = {
    params: {
        taskId: string
    }
}

export default function EditPage({params}: EditPageProp){
    const {data: Task, error, isLoading} = useGetTaskByIdQuery(params.taskId)
    return(
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            {
                isLoading ? (
                    <p>loading...</p>
                ):(
                    <TaskForm action={RequestType.PUT} task={Task}/>
                )
            }
        </div>
    )
}