'use client'

import { Button, Card, Select, TextInput, Text, Collapse, Box, Group } from "@mantine/core";
import { Edit, Filter, Plus, Trash2, User } from "lucide-react";
import { useGetEmployeeQuery } from "../store/apiEmployee";
import { Employee, Task } from "../types";
import { useDisclosure } from "@mantine/hooks";
import { useDrag } from "react-dnd";
import { useRef } from "react";
import Link from "next/link";

interface EmployeeProps {
    employee: Employee;
}

const EmployeeBar = ({ employee }: EmployeeProps) => {
    const [opened, { toggle }] = useDisclosure(false);
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const [, drag] = useDrag(() => ({
        type: 'EMPLOYEE',
        item: { id: employee.id },
    }));

    const ref = useRef<HTMLDivElement>(null);
    drag(ref);
    return (
        <div ref={ref} className="mb-5">
            <Card shadow="sm" padding="lg" radius="md" withBorder >

                <Box mx="auto" className="w-full flex flex-col">

                    <div className="flex items-center justify-between w-full">
                        <div className="flex justify-self-start">
                            <User />
                            <Text>{`${capitalize(employee.firstName)} ${capitalize(employee.lastName)}`}</Text>
                        </div>
                        <Text> {employee.position.name}</Text>
                        <Button onClick={toggle}>Assigned Tasks</Button>
                        <div>
                            <Link href={`employee/edit/${employee.id}`}>
                                <Button variant="light" size="sm" className='bg-transparent'>
                                    <Edit className="h-4 w-4" />
                                </Button></Link>
                            <Button variant="light" size="sm" className='bg-transparent' >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>


                    <Collapse in={opened}>
                        <Text c='dimmed'>Assigned Tasks:</Text>
                        {employee.task.map((task: Task) => {
                            return (
                                <div className="bg-gray-100 rounded my-1" key={task.id}>
                                    <Text>{`${capitalize(task.title)}`}</Text>
                                </div>
                            )
                        })}
                    </Collapse>
                </Box>
            </Card>
        </div>
    )
}


export default function EmployeeManagment() {

    const { data: employees, error, isLoading } = useGetEmployeeQuery({})

    const icon = <Filter />;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className='m-5'>

            <div className='w-full flex gap-2 justify-center items-center'>

                <TextInput
                    placeholder='Employee Name'
                    rightSection={icon}
                />
                <Select
                    placeholder='Job Position'
                />

            </div>
            <Text size='lg' fw="700" className='mt-5 mb-2'>Filter and view employees</Text>
            <div>
                {
                    isLoading ? (
                        <p>loading</p>
                    ) : (
                        <div>
                            {employees.map((employee: Employee) => {
                                return <EmployeeBar employee={employee} key={employee.id} />
                            })}
                        </div>
                    )
                }
            </div>
        </Card >
    )
}