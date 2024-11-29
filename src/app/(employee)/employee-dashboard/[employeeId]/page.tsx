'use client'

import MainShell from "@/app/components/employeeDashboardComponent/mainShell";
import { useGetEmployeeWithTaskQuery } from "@/app/store/apiEmployee";
import { Loader } from "@mantine/core";

export default function EmployeeDashboard({ params }: { params: { employeeId: string } }) {
    const {data: EmployeeWithTask, isLoading, error } = useGetEmployeeWithTaskQuery(params.employeeId)
    return (
        <div>
            {isLoading ? (
                <div className='w-screen h-screen flex items-center justify-center'>
                    <Loader size={22} color="rgba(0, 0, 0, 1)"></Loader> We're testing your patience
                </div>
            ) : (
                <MainShell data = {EmployeeWithTask}/>
            )}
        </div>
    )
}