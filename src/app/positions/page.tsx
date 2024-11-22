'use client'

import { useDisclosure } from "@mantine/hooks";
import PositionSideBar from "../components/positionSideBar";
import { Collapse, Group, Box, Drawer } from "@mantine/core";
import { PanelLeft } from 'lucide-react';
import { Edit, Trash2, UserPlus, PlusCircle } from 'lucide-react'
import { Button, Input, Textarea, Avatar, TextInput, Text } from '@mantine/core'
import { Card } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'



type Employee = {
    id: string
    name: string
    title: string
    email: string
    avatar: string
}

type Position = {
    id: string
    name: string
    description: string
    employees: Employee[]
    salary: string
    createdAt: string
    modifiedAt: string
    children: Position[]
}

type PositionInfoProps = {
    position?: Position
    onEdit?: (position: Position) => void
    onDelete?: (id: string) => void
    onAddEmployee?: (employee: Employee) => void
    onAddChildPosition?: (childPosition: Omit<Position, 'id' | 'children'>) => void
}

export default function Positions() {
    const [drawerOpened, { open, close }] = useDisclosure(false);
    const [opened, { toggle }] = useDisclosure(false);
    const position = {
        id: '1',
        name: 'Chief Technology Officer',
        description: 'Responsible for overseeing all technical aspects of the company',
        employees: [
            { id: '1', name: 'John Doe', title: 'CTO', email: 'john@example.com', avatar: '/placeholder.svg?height=40&width=40' },
            { id: '2', name: 'Jane Smith', title: 'Senior Developer', email: 'jane@example.com', avatar: '/placeholder.svg?height=40&width=40' },
        ],

        createdAt: '2023-01-15T00:00:00Z',
        modifiedAt: '2023-06-01T00:00:00Z',
        children: [
            { id: '2', name: 'Senior Developer', description: 'Lead developer role', employees: [], salary: '$120,000 - $180,000', createdAt: '2023-01-20T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '3', name: 'Junior Developer', description: 'Entry-level developer role', employees: [], salary: '$80,000 - $120,000', createdAt: '2023-01-25T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '2', name: 'Senior Developer', description: 'Lead developer role', employees: [], salary: '$120,000 - $180,000', createdAt: '2023-01-20T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '3', name: 'Junior Developer', description: 'Entry-level developer role', employees: [], salary: '$80,000 - $120,000', createdAt: '2023-01-25T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '2', name: 'Senior Developer', description: 'Lead developer role', employees: [], salary: '$120,000 - $180,000', createdAt: '2023-01-20T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '3', name: 'Junior Developer', description: 'Entry-level developer role', employees: [], salary: '$80,000 - $120,000', createdAt: '2023-01-25T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '2', name: 'Senior Developer', description: 'Lead developer role', employees: [], salary: '$120,000 - $180,000', createdAt: '2023-01-20T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },
            { id: '3', name: 'Junior Developer', description: 'Entry-level developer role', employees: [], salary: '$80,000 - $120,000', createdAt: '2023-01-25T00:00:00Z', modifiedAt: '2023-06-01T00:00:00Z', children: [] },

        ]
    }
    const [isEditing, setIsEditing] = useState(false)
    const [editedPosition, setEditedPosition] = useState(position)
    const [newEmployee, setNewEmployee] = useState<Employee>({ id: '', name: '', title: '', email: '', avatar: '' })
    const [newChildPosition, setNewChildPosition] = useState<Omit<Position, 'id' | 'children'>>({
        name: '',
        description: '',
        employees: [],
        salary: '',
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString()
    })

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        // onEdit && onEdit(editedPosition)
        setIsEditing(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedPosition({ ...editedPosition, [e.target.name]: e.target.value })
    }

    const handleAddEmployee = () => {
        // if (newEmployee.name && newEmployee.title && newEmployee.email) {
        //   onAddEmployee && onAddEmployee({ ...newEmployee, id: Date.now().toString() })
        //   setNewEmployee({ id: '', name: '', title: '', email: '', avatar: '' })
        // }
    }

    const handleAddChildPosition = () => {
        if (newChildPosition.name && newChildPosition.description) {
            //   onAddChildPosition && onAddChildPosition(newChildPosition)
            setNewChildPosition({
                name: '',
                description: '',
                employees: [],
                salary: '',
                createdAt: new Date().toISOString(),
                modifiedAt: new Date().toISOString()
            })
        }
    }

    return (
        <div className="w-screen h-full bg-gray-100">
            <Drawer opened={drawerOpened} onClose={close} >
                <PositionSideBar />
            </Drawer>


            <div className='ml-14 mr-10 justify-self-center overflow-scroll'>
                <div>
                    <Button variant="light" onClick={open} className="self-start justify-self-start my-2 bg-transparent">
                        <PanelLeft />
                    </Button>
                    <div className="text-2xl font-bold flex justify-between items-center">
                        {position.name}
                        <div>
                            <Button variant="light" className="bg-transparent" size="icon" onClick={handleEdit}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="light" className="bg-transparent" size="icon" >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div><Text c="dimmed">{position.description}</Text></div>
                    <div className="mt-4 text-sm text-muted-foreground flex justify-start gap-8">
                        <p>Created: {new Date(position.createdAt).toLocaleDateString()}</p>
                        <p>Last modified: {new Date(position.modifiedAt).toLocaleDateString()}</p>
                    </div>
                    
                </div>
                <div>
                    {isEditing ? (
                        <div className="space-y-4">
                            <Input
                                name="name"
                                value={editedPosition.name}
                                onChange={handleChange}
                                placeholder="Position name"
                            />
                            <Textarea
                                label="description"
                                value={editedPosition.description}
                                onChange={handleChange}
                                placeholder="Position description"
                            />

                            <Button onClick={handleSave}>Save</Button>
                        </div>
                    ) : (
                        <>

                            <Group className="mt-8 mb-4">
                                <h3 className="text-lg font-semibold my-2">Employees</h3>
                                <Button onClick={toggle}>view Tasks</Button>
                            </Group>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {position.employees.map((employee) => (
                                    <Card key={employee.id}>
                                        <div className="flex items-center p-4">
                                            <Avatar className="h-12 w-12 mr-4">
                                            </Avatar>
                                            <div>
                                                <h4 className="font-semibold">{employee.name}</h4>
                                                <p className="text-sm text-muted-foreground">{employee.title}</p>
                                                <p className="text-sm text-muted-foreground">{employee.email}</p>
                                                <Collapse in={opened}>
                                                    <Text>{/* ... content */} tasks</Text>
                                                </Collapse>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-start gap-5">

                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>

                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Child Position
                    </Button>

                </div>
                            <h3 className="text-lg font-semibold my-4 mt-8">Child Positions</h3>
                            <div className="max-h-[50%] overflow-y-auto">
                                <DataTable
                                    columns={[{ accessor: 'name' }, { accessor: 'description' }, { accessor: 'city' }, { accessor: 'state' }]}
                                    records={position.children}
                                />
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    )
}