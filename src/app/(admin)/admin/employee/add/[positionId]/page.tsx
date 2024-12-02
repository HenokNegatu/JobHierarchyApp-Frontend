'use client'

import EmployeeForm from "@/app/components/employeeComponent/employeeForm";
import { RequestType } from "@/app/types";
import { Button } from "@mantine/core";

export default function AddEmployeePage({params}:{params: {positionId: string}}){
    return(
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <Button variant='light' onClick={() => window.history.back()} className="absolute top-5 left-5">Back</Button>
            <EmployeeForm positionId={params.positionId} action={RequestType.POST}/>
        </div>
    )
}