'use client'

import EmployeeForm from "@/app/components/employeeComponent/employeeForm";

export default function AddEmployeePage({params}:{params: {positionId: string}}){
    return(
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <EmployeeForm positionId={params.positionId}/>
        </div>
    )
}