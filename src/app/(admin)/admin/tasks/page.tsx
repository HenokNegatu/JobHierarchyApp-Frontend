'use client'

import Link from 'next/link'
import { TaskManagement } from '../../../components/tasksComponent/taskManagment'
import { Button } from '@mantine/core'
import { deleteSession } from '@/app/lib/session'
import LogOut from '@/app/components/authComponents/logOut'

export default function TasksPage() {
  return (
    <div className=" bg-gray-100">
      <header className=' w-screen  bg-white shadow-sm mb-4'>
        <div className="max-w-7xl mx-auto py-4 px-2 sm:px-4 lg:px-4 flex items-center justify-end gap-3">
          <Link href='/admin/positions' className="text-lg font-bold "><Button>Show Job Positions</Button></Link>
          <LogOut />
        </div>
      </header>
      <TaskManagement />
    </div>
  )
}
