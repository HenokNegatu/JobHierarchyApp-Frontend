'use client'

import { Button } from "@mantine/core";
import EmployeeForm from "@/app/components/employeeComponent/employeeForm";
import { RequestType } from "@/app/types";
import { useGetEmployeeWithTaskQuery } from "@/app/store/apiEmployee";

export default function EditEmployeePage({ params }: { params: { employeeId: string } }) {

    const { data: Employee, error, isLoading } = useGetEmployeeWithTaskQuery(params.employeeId)
    
    if (error) {
        return <p>faild to load data from server :(</p>
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <Button variant='light' onClick={() => window.history.back()} className="absolute top-5 left-5">Back</Button>
            {
                isLoading ? (
                    <p>loading...</p>
                ) : (
                    <EmployeeForm action={RequestType.PUT} employee={Employee}/>
                )
            }
        </div>
    )
}