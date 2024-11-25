'use client'

import { Edit, Trash2, Plus, Filter, ClipboardX } from 'lucide-react'
import { TaskSummary } from './taskSummary'
import { Button, TextInput, Text, Avatar, Group, Select } from '@mantine/core'
import { Card } from '@mantine/core'
import { useAssignEmployeeToTaskMutation, useGetTaskQuery, useRemoveEmployeeFromTaskMutation } from '../../store/apiTask'
import { Employee, Task } from '../../types'
import EmployeeManagment from '../employeeManagement'
import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import Link from 'next/link'





type DraggableEmployeeProps = {
    employee: Employee,
    taskId: string
}

const DraggableEmployee = ({ employee, taskId }: DraggableEmployeeProps) => {

    const [removeEmployeeFromTask] = useRemoveEmployeeFromTaskMutation();

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    return (
        <div
            className="flex items-center p-2 mb-2 bg-gray-100 rounded"
        >
            <Avatar className="h-8 w-8 mr-2">
            </Avatar>
            <span className="text-sm">{`${capitalize(employee.firstName)} ${capitalize(employee.lastName)}`}</span>
            <Button variant="ghost" size="sm" className="ml-auto">
                <Trash2 className="h-4 w-4" onClick={() => removeEmployeeFromTask({ taskId, employeeId: employee.id })} />
            </Button>
        </div>
    )
}

type TaskItemProps = {
    task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
    const [assignEmployeeToTask] = useAssignEmployeeToTaskMutation();


    const [, dropRef] = useDrop(() => ({
        accept: 'EMPLOYEE',
        drop: async (item: Employee) => {
            await assignEmployeeToTask({ taskId: task.id, employeeId: item.id });
        },
    }));

    const ref = useRef<HTMLDivElement>(null);
    dropRef(ref);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className={`mb-4`} ref={ref}>
            <div>
                <div className="text-xl flex justify-between items-center">
                    {task.title}
                    <div>
                        <Link href={`tasks/edit/${task.id}`} prefetch={true}>
                            <Button variant="light" size="sm" className='bg-transparent'>
                                <Edit className="h-4 w-4" />
                            </Button></Link>
                        <Button variant="light" size="sm" className='bg-transparent' >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Text c="dimmed">{task.description}</Text>
            </div>
            <div>
                <div className="mb-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${task.status === 'Todo' ? 'bg-yellow-200 text-yellow-800' :
                        task.status === 'In Progress' ?
                            'bg-blue-200 text-blue-800' :
                            'bg-green-200 text-green-800'
                        }`}>
                        {task.status}
                    </span>
                </div>
                <h4 className="font-semibold mb-2">Assigned Employees:</h4>
                {task.employee.map((employee: Employee) => (
                    <DraggableEmployee
                        key={employee.id}
                        employee={employee}
                        taskId={task.id}
                    />
                ))}
            </div>
        </Card>
    )
}

export const TaskManagement = () => {

    const { data: tasks, error, isLoading } = useGetTaskQuery({})


    const icon = <Filter />;

    return (
        <div>
            {isLoading ? (
                <div className='w-screen h-screen flex items-center justify-center'>
                    <p>loading...</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <TaskSummary tasks={tasks} />
                    <div className='grid grid-cols-2'>
                        <EmployeeManagment />
                        <Card shadow="sm" padding="lg" radius="md" withBorder className='m-5 overflow-y-scroll'>
                            <div className="w-full flex gap-2 justify-center items-center">
                                <Link href='/tasks/add'>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Task
                                    </Button>
                                </Link>
                                <TextInput
                                    placeholder='Task Name'
                                    rightSection={icon}
                                />
                                <Select
                                    placeholder='Status'
                                />

                            </div>
                            <Text size='lg' fw="700" className='mt-5 mb-2'>Manage and assign tasks to employees</Text>
                            <div>

                                {tasks.map((task: Task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

