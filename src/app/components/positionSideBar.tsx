'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Users, Briefcase, Search, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { Button, Input } from '@mantine/core'

type Position = {
    id: string
    name: string
    employeeCount: number
    children?: Position[]
}

const initialPositions: Position[] = [
    {
        id: '1',
        name: 'CEO',
        employeeCount: 1,
        children: [
            {
                id: '2',
                name: 'CTO',
                employeeCount: 5,
                children: [
                    { id: '4', name: 'Senior Developer', employeeCount: 3 },
                    { id: '5', name: 'Junior Developer', employeeCount: 7 },
                ],
            },
            {
                id: '3',
                name: 'CFO',
                employeeCount: 3,
                children: [
                    { id: '6', name: 'Accountant', employeeCount: 2 },
                    { id: '7', name: 'Financial Analyst', employeeCount: 4 },
                ],
            },
        ],
    },
]

const PositionItem = ({ position, level = 0 }: { position: Position; level?: number }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <Button
                className={`text-black border-0 justify-start text-left font-normal bg-transparent ${level === 0 && "font-medium"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center">
                    {position.children && position.children.length > 0 ? (
                        isOpen ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />
                    ) : (
                        <span className="w-4 mr-2"></span>
                    )}
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>{position.name}</span>
                    <span className="ml-auto flex items-center text-muted-foreground">
                        <Users className="mr-1 h-4 w-4" color='gray' />
                        {position.employeeCount}
                    </span>
                </div>
            </Button>
            {isOpen && position.children && (
                <div className={`ml-4" ${level > 0 && "border-l pl-4"}`}>
                    {position.children.map((child) => (
                        <PositionItem key={child.id} position={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function PositionSideBar() {
    const [showTasks, setShowTasks] = useState(false)

    return (
        <div className="py-4">
            <div className="px-4 mb-4">
                <Button onClick={() => setShowTasks(!showTasks)} className="w-full mb-2">
                    {showTasks ? "Show Job Positions" : "Show Tasks"}
                </Button>
                {showTasks && (
                    <div className="space-y-2">
                        <Link href="/tasks/create">
                            <Button variant="outline" className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Task
                            </Button>
                        </Link>
                        <div className="relative">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input className="pl-8" placeholder="Search tasks..." />
                        </div>
                    </div>
                )}
            </div>
            {!showTasks && (
                <>
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Job Positions</h2>
                    {initialPositions.map((position) => (
                        <PositionItem key={position.id} position={position} />
                    ))}
                </>
            )}
        </div>
    )
}

