'use client'

import { Button, Card, Select, TextInput, Text, Collapse, Box } from "@mantine/core";
import { Edit, Filter, Trash2, User, Users } from "lucide-react";
import { useGetEmployeeQuery } from "../store/apiEmployee";
import { Employee, StatusType, Task } from "../types";
import { useDisclosure } from "@mantine/hooks";
import { useDrag } from "react-dnd";
import { useMemo, useRef, useState } from "react";
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

    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case StatusType.Active:
                return 'bg-green-500'
            case StatusType.Inactive:
                return 'bg-red-500'
            case StatusType.OnLeave:
                return 'bg-yellow-500'
            default:
                return 'bg-gray-500'
        }
    }
    return (
        <div ref={ref} className="mb-5">
            <Card shadow="sm" padding="lg" radius="md" withBorder >

                <Box mx="auto" className="w-full flex flex-col">

                    <div className="flex items-center justify-between w-full">
                        <div className="flex justify-self-start">
                            <User />
                            <Text>{`${capitalize(employee.firstName)} ${capitalize(employee.lastName)}`}</Text>
                        <div
                                    className={`h-2.5 w-2.5 rounded-full ${getStatusColor(
                                        employee.status
                                    )}`}
                                />
                        </div>
                        <Text> {employee.position.name}</Text>
                        <Button onClick={toggle}>Assigned Tasks</Button>
                        <div>
                            <Link href={`employee/edit/${employee.id}`} prefetch={true}>
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
                                <div className="bg-gray-100 rounded my-1 flex justify-between px-2" key={task.id}>
                                    <Text>{`${capitalize(task.title)}`}</Text>
                                    <Text className={`font-medium py-1 rounded-full text-xs ${task.status === 'Todo' ? ' text-yellow-800' :
                                        task.status === 'In Progress' ?
                                            ' text-blue-800' : task.status === 'Completed' ?
                                                ' text-green-800' : ' text-red-800'
                                        }`}>{task.status}</Text>
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
    
    if(error){
        return <p>faild to load data from server :(</p>
    }

    const [filterName, setFilterName] = useState('');
    const [filterPosition, setFilterPosition] = useState('');

    const positions = useMemo(() => {
        const allPositions = employees?.map((employee: Employee) => employee.position.name) || [];
        const uniquePositions = Array.from(new Set(allPositions));
        uniquePositions.map((position) => ({
            value: position,
            label: position,
        })); 
        return [{ value: '', label: 'All' }, ...uniquePositions];
    }, [employees]);
    

    const filteredEmployees = employees?.filter((employee: Employee) => {
        const matchesName = employee.firstName.toLowerCase().includes(filterName.toLowerCase());
        const matchesPosition = filterPosition ? employee.position.name === filterPosition : true;
        return matchesName && matchesPosition;
    });

    const icon = <Filter />;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className='m-5 h-[90vh]'>

            <div className='w-full flex gap-2 justify-evenly  items-center '>

            {isLoading ? (
                <div>
                    loading...
                </div>
            ) : (
                <div className="flex gap-1 items-center ">
                    <Users /><Text size="lg">{filteredEmployees.length}</Text>
                </div>
            )}

                <div className="flex gap-2">
                <TextInput
                    placeholder='Employee Name'
                    rightSection={icon}
                    value={filterName}
                    onChange={(e) => setFilterName(e.currentTarget.value)}
                />
                <Select
                    placeholder='Job Position'
                    value={filterPosition}
                    onChange={(_value, option) => setFilterPosition(option.value)}
                    data={positions}
                />
                </div>

            </div>
            <Text size='lg' fw="700" className='mt-5 mb-2'>Filter and view employees</Text>
            <div className='h-[80vh] overflow-y-scroll'>
                {
                    isLoading ? (
                        <p>loading</p>
                    ) : (
                        <div>
                            {filteredEmployees.map((employee: Employee) => {
                                return <EmployeeBar employee={employee} key={employee.id} />
                            })}
                        </div>
                    )
                }
            </div>
        </Card >
    )
}