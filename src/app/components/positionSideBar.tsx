'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@mantine/core'
import { Position } from '../types'
import { deleteSession } from '../lib/session'


const PositionItem = ({ position, level = 0 }: { position: Position; level?: number}) => {
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
                    <Link href={`/admin/positions/${position.id}`} prefetch={true}>{position.name}</Link>
                </div>
            </Button>
            {isOpen && position.children && (
                <div className={`ml-4" ${level > 0 && "border-l pl-4"}`}>
                    {position.children.map((child) => (
                        <PositionItem key={child.id} position={child} level={level + 1}/>
                    ))}
                </div>
            )}
        </div>
    )
}

type PositionSideBarProp = {
    data: Position
}

export default function PositionSideBar({ data }: PositionSideBarProp) {

    return (
        <div className="py-4">
            <div className="px-4 mb-4">
                <Link href='/admin/tasks' prefetch={true}>
                    <Button className="w-full mb-2">Show Tasks</Button>
                </Link>

            </div>
            {
                <>
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Job Positions</h2>
                    {[data].map((position: Position) => (
                        <PositionItem key={position.id} position={position} />
                    ))}
                </>
            }
            <div>
            <Button onClick={()=>deleteSession()} className='absolute bottom-5 mx-4'>Logout</Button>
            </div>
        </div>
    )
}

